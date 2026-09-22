/**
 * Closes a menu layer and every ancestor above it (full submenu-cone collapse).
 *
 * Shared by context-menu and dropdown-menu, whose state objects differ but
 * both expose `open`.
 */
export function closeMenuLayers(current: { open: boolean }, ancestors: { open: boolean }[]) {
    current.open = false;

    for (const ancestor of ancestors) {
        ancestor.open = false;
    }
}

type OverflowLockRecord = {
    count: number;
    overflow: string;
    paddingRight: string;
};

type InertRecord = {
    count: number;
    wasInert: boolean;
};

const overflowLocks = new Map<HTMLElement, OverflowLockRecord>();
const inertRecords = new Map<HTMLElement, InertRecord>();

function isOverlayRoot(element: Element) {
    return (
        element.hasAttribute('data-floating-content') || element.hasAttribute('data-overlay-root')
    );
}

function isInExternalLayer(target: EventTarget | Node | null, container: HTMLElement) {
    const el =
        target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
    if (!el) {
        return false;
    }

    const layer = el.closest('[data-floating-content], [data-overlay-root]');
    if (!layer) {
        return false;
    }

    return !container.contains(layer) && !layer.contains(container);
}

function isScrollOverflow(value: string) {
    return value === 'auto' || value === 'scroll' || value === 'overlay';
}

function hasScrollableOverflow(element: HTMLElement) {
    const style = getComputedStyle(element);
    return (
        isScrollOverflow(style.overflowY) ||
        isScrollOverflow(style.overflowX) ||
        isScrollOverflow(element.style.overflowY) ||
        isScrollOverflow(element.style.overflowX) ||
        isScrollOverflow(element.style.overflow)
    );
}

function retainOverflowLock(
    element: HTMLElement,
    extra?: {
        paddingRight?: string;
    }
) {
    const record = overflowLocks.get(element);
    if (record) {
        record.count += 1;
        return;
    }

    overflowLocks.set(element, {
        count: 1,
        overflow: element.style.overflow,
        paddingRight: element.style.paddingRight
    });
    if (extra?.paddingRight) {
        element.style.paddingRight = extra.paddingRight;
    }
    element.style.overflow = 'hidden';
}

function releaseOverflowLock(element: HTMLElement) {
    const record = overflowLocks.get(element);
    if (!record) {
        return;
    }
    record.count -= 1;
    if (record.count > 0) {
        return;
    }

    element.style.overflow = record.overflow;
    element.style.paddingRight = record.paddingRight;
    overflowLocks.delete(element);
}

function retainInert(element: HTMLElement) {
    const record = inertRecords.get(element);
    if (record) {
        record.count += 1;
        return;
    }

    inertRecords.set(element, {
        count: 1,
        wasInert: element.inert === true
    });
    element.inert = true;
}

function releaseInert(element: HTMLElement) {
    const record = inertRecords.get(element);
    if (!record) {
        return;
    }
    record.count -= 1;
    if (record.count > 0) {
        return;
    }

    element.inert = record.wasInert;
    inertRecords.delete(element);
}

/**
 * Inerts document branches outside the given roots.
 *
 * Ancestors of each root stay active so a popover trigger can still dismiss,
 * while sibling branches, other overlay roots, and nodes added later are
 * excluded from pointer and keyboard interaction.
 */
export function inertOutside(activeRoots: HTMLElement[]) {
    if (typeof document === 'undefined') {
        return () => {};
    }

    const retained = new Set<HTMLElement>();

    const retainIfOutside = (element: HTMLElement) => {
        if (
            retained.has(element) ||
            element.closest('[data-floating-content], [data-overlay-root]') ||
            activeRoots.some((root) => {
                return element === root || element.contains(root) || root.contains(element);
            })
        ) {
            return;
        }

        retained.add(element);
        retainInert(element);
    };

    for (const root of activeRoots) {
        let branch = root;
        while (branch.parentElement) {
            const parent = branch.parentElement;
            for (const sibling of parent.children) {
                if (sibling instanceof HTMLElement && sibling !== branch) {
                    retainIfOutside(sibling);
                }
            }
            if (parent === document.body) {
                break;
            }
            branch = parent;
        }
    }

    const observer = new MutationObserver((records) => {
        for (const record of records) {
            for (const node of record.addedNodes) {
                if (node instanceof HTMLElement) {
                    retainIfOutside(node);
                }
            }
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    let released = false;
    return () => {
        if (released) {
            return;
        }
        released = true;
        observer.disconnect();
        for (const element of retained) {
            releaseInert(element);
        }
    };
}

/**
 * Locks document scrolling and returns a disposer.
 *
 * The lock is refcounted and shared by dialog, sheet, and popover so nested
 * overlays cannot clear each other's lock on teardown -- only the last active
 * lock restores the original overflow and scrollbar padding. Overlay roots keep
 * their own overflow so dialog surfaces can still scroll.
 */
export function lockBodyScroll() {
    if (typeof document === 'undefined') {
        return () => {};
    }

    const locked: HTMLElement[] = [];
    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    retainOverflowLock(html);
    locked.push(html);
    retainOverflowLock(
        body,
        scrollbarWidth > 0
            ? {
                  paddingRight: `${(Number.parseFloat(getComputedStyle(body).paddingRight) || 0) + scrollbarWidth}px`
              }
            : undefined
    );
    locked.push(body);

    const walk = (parent: Element) => {
        for (const child of parent.children) {
            if (!(child instanceof HTMLElement)) {
                continue;
            }
            if (isOverlayRoot(child)) {
                continue;
            }
            if (overflowLocks.has(child) || hasScrollableOverflow(child)) {
                retainOverflowLock(child);
                locked.push(child);
            }
            walk(child);
        }
    };
    walk(body);

    let released = false;
    return () => {
        if (released) {
            return;
        }
        released = true;
        for (const element of locked) {
            releaseOverflowLock(element);
        }
    };
}

/**
 * Marks non-overlay body children as non-interactive while a floating layer is
 * open. Overlay roots already portaled onto `document.body` stay active.
 */
export function lockBodyBackground() {
    if (typeof document === 'undefined') {
        return () => {};
    }

    const roots: HTMLElement[] = [];
    for (const child of document.body.children) {
        if (child instanceof HTMLElement && isOverlayRoot(child)) {
            roots.push(child);
        }
    }
    return inertOutside(roots);
}

/** Test isolation for the process-local body locks. */
export function resetBodyLocksForTests() {
    if (typeof document === 'undefined') {
        overflowLocks.clear();
        inertRecords.clear();
        return;
    }

    for (const element of Array.from(overflowLocks.keys())) {
        const record = overflowLocks.get(element);
        if (!record) {
            continue;
        }
        element.style.overflow = record.overflow;
        element.style.paddingRight = record.paddingRight;
    }
    overflowLocks.clear();

    for (const element of Array.from(inertRecords.keys())) {
        const record = inertRecords.get(element);
        if (!record) {
            continue;
        }
        element.inert = record.wasInert;
    }
    inertRecords.clear();

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    for (const el of Array.from(document.body.children) as HTMLElement[]) {
        el.classList.remove('pointer-events-none');
    }
}

type EscapeLayer = {
    close: () => void;
    element?: Element;
    rank: number;
};

const escapeStack: EscapeLayer[] = [];
let escapeListenerAttached = false;

/** DOM depth of an element, or -1 when it is detached. */
function domDepth(element: Element | undefined) {
    if (!element || !document.contains(element)) {
        return -1;
    }

    let depth = 0;
    let current: Node | null = element;
    while (current) {
        depth += 1;
        current = current.parentNode;
    }
    return depth;
}

/**
 * Closes the topmost registered layer only, so a submenu cone peels one level
 * per keypress. `stopImmediatePropagation` keeps other document-level Escape
 * handlers from firing in the same tick and closing a second layer.
 */
function onDocumentEscape(event: KeyboardEvent) {
    if (event.key !== 'Escape' || escapeStack.length === 0) {
        return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();

    let topIndex = escapeStack.length - 1;
    let topRank = escapeStack[topIndex]?.rank ?? 0;
    let topDepth = domDepth(escapeStack[topIndex]?.element);
    for (let index = escapeStack.length - 2; index >= 0; index -= 1) {
        const rank = escapeStack[index]?.rank ?? 0;
        const depth = domDepth(escapeStack[index]?.element);
        if (rank > topRank || (rank === topRank && depth > topDepth)) {
            topIndex = index;
            topRank = rank;
            topDepth = depth;
        }
    }

    escapeStack[topIndex]?.close();
}

function ensureEscapeListener() {
    if (typeof document === 'undefined' || escapeListenerAttached) {
        return;
    }
    document.addEventListener('keydown', onDocumentEscape, true);
    escapeListenerAttached = true;
}

/**
 * Registers a close handler while a layer is open and returns a disposer.
 * Dialog, sheet, and popover push on open and pop on teardown.
 */
export function pushEscapeLayer(close: () => void, element?: Element, rank = 0) {
    if (typeof document === 'undefined') {
        return () => {};
    }
    ensureEscapeListener();
    const layer = {
        close,
        element,
        rank
    };
    escapeStack.push(layer);
    return () => {
        const index = escapeStack.lastIndexOf(layer);
        if (index >= 0) {
            escapeStack.splice(index, 1);
        }
    };
}

/** Test isolation for the escape stack. */
export function resetEscapeStackForTests() {
    escapeStack.length = 0;
}

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable="true"]',
    '[tabindex]:not([tabindex="-1"])'
].join(', ');

/** Returns visible tabbable descendants in native tab order. */
export function getFocusableElements(container: HTMLElement) {
    const candidates = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((element) => {
        if (
            (element.tabIndex < 0 &&
                !(
                    element.matches('[contenteditable="true"]') && !element.hasAttribute('tabindex')
                )) ||
            element.matches(':disabled') ||
            element.closest('[inert], [hidden], [aria-hidden="true"]')
        ) {
            return false;
        }
        for (
            let ancestor: HTMLElement | null = element;
            ancestor;
            ancestor = ancestor.parentElement
        ) {
            const style = getComputedStyle(ancestor);
            if (
                style.display === 'none' ||
                style.visibility === 'hidden' ||
                style.visibility === 'collapse'
            ) {
                return false;
            }
        }
        return (
            element.offsetParent !== null ||
            ['fixed', 'sticky'].includes(getComputedStyle(element).position)
        );
    });
    return candidates
        .filter((element) => {
            if (
                !(element instanceof HTMLInputElement) ||
                element.type !== 'radio' ||
                !element.name
            ) {
                return true;
            }
            const group = candidates.filter((candidate): candidate is HTMLInputElement => {
                return (
                    candidate instanceof HTMLInputElement &&
                    candidate.type === 'radio' &&
                    candidate.name === element.name &&
                    candidate.form === element.form
                );
            });
            return element === (group.find((candidate) => candidate.checked) ?? group[0]);
        })
        .sort((first, second) => {
            const firstOrder = first.tabIndex > 0 ? first.tabIndex : Number.MAX_SAFE_INTEGER;
            const secondOrder = second.tabIndex > 0 ? second.tabIndex : Number.MAX_SAFE_INTEGER;
            return firstOrder - secondOrder;
        });
}

/** Focuses the first focusable descendant when one exists. */
function focusFirstDescendant(container: HTMLElement) {
    const first = getFocusableElements(container)[0];
    first?.focus();
    return first;
}

/** Keeps keyboard focus inside a container and restores the previous focus on cleanup. */
export function trapFocus(
    dialogEl: HTMLElement,
    options?: { initialFocus?: HTMLElement | null; returnFocus?: HTMLElement | null }
) {
    if (!dialogEl) {
        return;
    }

    let active = true;
    const previouslyFocused =
        options?.returnFocus ??
        (document.activeElement instanceof HTMLElement ? document.activeElement : null);

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') {
            return;
        }

        const active = document.activeElement as HTMLElement | null;
        if (isInExternalLayer(active, dialogEl)) {
            return;
        }

        const focusable = getFocusableElements(dialogEl);

        if (focusable.length === 0) {
            e.preventDefault();
            dialogEl.focus();
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const focusIsOutside = !active || !dialogEl.contains(active);
        const focusIsOnContainer = active === dialogEl;

        if (e.shiftKey) {
            if (focusIsOutside || focusIsOnContainer || active === first) {
                e.preventDefault();
                last.focus();
            }
        } else if (focusIsOutside || focusIsOnContainer || active === last) {
            e.preventDefault();
            first.focus();
        }
    };

    const handleFocusIn = (e: FocusEvent) => {
        const target = e.target as Node | null;
        if (!target || dialogEl.contains(target) || isInExternalLayer(target, dialogEl)) {
            return;
        }
        if (options?.initialFocus) {
            options.initialFocus.focus();
        } else if (!focusFirstDescendant(dialogEl)) {
            dialogEl.focus();
        }
    };

    document.addEventListener('keydown', handleKeydown, true);
    document.addEventListener('focusin', handleFocusIn, true);

    queueMicrotask(() => {
        if (!active || !dialogEl.isConnected) {
            return;
        }
        if (options?.initialFocus) {
            options.initialFocus.focus();
        } else if (!focusFirstDescendant(dialogEl)) {
            dialogEl.focus();
        }
    });

    return () => {
        if (!active) {
            return;
        }
        active = false;
        document.removeEventListener('keydown', handleKeydown, true);
        document.removeEventListener('focusin', handleFocusIn, true);
        const restore = previouslyFocused;
        queueMicrotask(() => {
            if (!restore?.isConnected) {
                return;
            }
            restore.focus();
        });
    };
}

function overlayRootOf(node: Node | null) {
    if (node instanceof Element) {
        return node.closest('[data-overlay-root]');
    }
    return node?.parentElement?.closest('[data-overlay-root]') ?? null;
}

let overlayPointerGesture = false;
let overlayPointerGestureTimeout: ReturnType<typeof setTimeout> | undefined;

function markOverlayPointerGesture() {
    overlayPointerGesture = true;
    if (overlayPointerGestureTimeout !== undefined) {
        clearTimeout(overlayPointerGestureTimeout);
    }
    overlayPointerGestureTimeout = setTimeout(() => {
        overlayPointerGesture = false;
        overlayPointerGestureTimeout = undefined;
    }, 0);
}

/** Test isolation for the overlay click-outside gesture lock. */
export function resetClickOutsideForTests() {
    overlayPointerGesture = false;
    if (overlayPointerGestureTimeout !== undefined) {
        clearTimeout(overlayPointerGestureTimeout);
        overlayPointerGestureTimeout = undefined;
    }
}

function overlayRootFromEvent(event: Event, path: EventTarget[]) {
    for (const entry of path) {
        if (entry instanceof Element && entry.hasAttribute('data-overlay-root')) {
            return entry;
        }
    }
    const target = event.target;
    if (target instanceof Element) {
        return target.closest('[data-overlay-root]');
    }
    return null;
}

/**
 * Runs a callback when a pointer event lands outside the node and any excluded
 * nodes.
 *
 * Floating layers (select, dropdown-menu, and friends) portal to `<body>` and
 * carry `data-floating-content`. Clicking one of their items closes that layer,
 * and Svelte flushes the removal synchronously *before* this document-level
 * listener runs, so the now-detached node drops out of `composedPath()`. The
 * target's own ancestor chain stays intact after the wrapper is detached, so it
 * serves as the fallback and keeps a parent overlay from being dismissed too.
 *
 * Nested overlays portal as sibling `[data-overlay-root]` hosts. A click inside
 * a different overlay root belongs to that layer, so this listener must not
 * treat it as an outside dismiss — otherwise Cancel on a nested dialog closes
 * the parent too.
 *
 * Select, Combobox, and Dropdown Menu dismiss on pointerdown. That unmounts
 * their dismiss scrim before the following `click`, which would otherwise hit
 * the parent Dialog overlay and close it. One pointer gesture peels one layer.
 */
export function clickOutside(node: Node, callback: () => void, exclude: Node[] = []) {
    let destroyed = false;
    let dismissedByPointer = false;

    function isOutside(event: Event) {
        const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
        const target = event.target as Node | null;
        const isInsideNode = path.includes(node) || (target ? node.contains(target) : false);
        const isInsideExcluded = exclude.some(
            (excludeNode) =>
                path.includes(excludeNode) || (target ? excludeNode.contains(target) : false)
        );
        const targetEl = target instanceof Element ? target : null;
        const isInsideFloating =
            path.some((el) => el instanceof Element && el.hasAttribute('data-floating-content')) ||
            targetEl?.closest('[data-floating-content]') != null;
        const clickRoot = overlayRootFromEvent(event, path);
        const nodeRoot = overlayRootOf(node);
        const isInsideOtherOverlay =
            clickRoot != null && nodeRoot != null && clickRoot !== nodeRoot;
        return !isInsideNode && !isInsideExcluded && !isInsideFloating && !isInsideOtherOverlay;
    }

    function dismiss(event: Event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        callback();
    }

    const handlePointerDown = (event: PointerEvent) => {
        if (isOutside(event)) {
            dismissedByPointer = true;
            markOverlayPointerGesture();
            dismiss(event);
        }
    };

    const handleClick = (event: MouseEvent) => {
        if (dismissedByPointer) {
            dismissedByPointer = false;
            dismiss(event);
            return;
        }
        if (overlayPointerGesture) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        if (isOutside(event)) {
            dismiss(event);
        }
    };

    const installTimeout = setTimeout(() => {
        if (!destroyed) {
            document.addEventListener('pointerdown', handlePointerDown, true);
            document.addEventListener('click', handleClick, true);
        }
    }, 0);

    return {
        destroy() {
            destroyed = true;
            clearTimeout(installTimeout);
            document.removeEventListener('pointerdown', handlePointerDown, true);
            document.removeEventListener('click', handleClick, true);
        }
    };
}
