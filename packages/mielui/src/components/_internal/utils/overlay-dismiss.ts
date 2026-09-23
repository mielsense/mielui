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
