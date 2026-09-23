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
