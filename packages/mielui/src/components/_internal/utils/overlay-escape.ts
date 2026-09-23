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
            if (escapeStack.length === 0) {
                document.removeEventListener('keydown', onDocumentEscape, true);
                escapeListenerAttached = false;
            }
        }
    };
}

/** Test isolation for the escape stack. */
export function resetEscapeStackForTests() {
    escapeStack.length = 0;
    if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', onDocumentEscape, true);
    }
    escapeListenerAttached = false;
}
