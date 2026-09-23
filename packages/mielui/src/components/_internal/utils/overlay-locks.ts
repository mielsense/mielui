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
