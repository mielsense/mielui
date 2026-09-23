import type { ParsedShortcut } from './shortcut';

export function registerShortcut(
    element: HTMLElement,
    options: {
        readonly shortcut: ParsedShortcut | undefined;
        readonly ontrigger: ((event: KeyboardEvent) => void) | undefined;
    }
) {
    function isEditableTarget(target: EventTarget | null) {
        if (!(target instanceof HTMLElement)) {
            return false;
        }
        return (
            target.matches('input, textarea, select') ||
            target.isContentEditable ||
            Boolean(target.closest('[contenteditable]:not([contenteditable="false"])'))
        );
    }

    function getOwner() {
        const owner = element.closest<HTMLElement>('button, a[href], [role="button"]');
        if (!owner) {
            return undefined;
        }
        if (
            (owner instanceof HTMLButtonElement && owner.disabled) ||
            owner.hasAttribute('disabled') ||
            owner.getAttribute('aria-disabled') === 'true'
        ) {
            return undefined;
        }
        return owner;
    }

    function handleKey(event: KeyboardEvent) {
        const parsed = options.shortcut;
        const ontrigger = options.ontrigger;
        if (!parsed || event.repeat || event.defaultPrevented || event.isComposing) {
            return;
        }

        const fromInput =
            event.target instanceof HTMLInputElement && event.target.type !== 'hidden';
        const allowFromInput = parsed.key === 'enter' || parsed.key === 'escape';

        if (isEditableTarget(event.target) && !(allowFromInput && fromInput)) {
            return;
        }

        if (
            event.key.toLowerCase() !== parsed.key ||
            event.metaKey !== parsed.meta ||
            event.ctrlKey !== parsed.ctrl ||
            event.shiftKey !== parsed.shift ||
            event.altKey !== parsed.alt
        ) {
            return;
        }

        const anchor =
            element.closest<HTMLElement>('button, a[href], [role="button"]') ??
            element.parentElement;
        if (
            !anchor ||
            anchor.matches(':disabled') ||
            anchor.getAttribute('aria-disabled') === 'true' ||
            anchor.closest('[inert], [hidden], [aria-hidden="true"]')
        ) {
            return;
        }
        const style = getComputedStyle(anchor);
        if (
            style.visibility === 'hidden' ||
            style.display === 'none' ||
            anchor.getClientRects().length === 0
        ) {
            return;
        }
        const focused = document.activeElement;
        const activeLayer =
            focused instanceof Element
                ? focused.closest(
                      '[data-overlay-root], [data-floating-content], [data-dialog-content], [data-alert-dialog-content], [data-popover-content], [data-dropdown-menu-content], [data-context-menu-content], [data-select-content], [data-menu-content], [data-menu-sub-content], [data-link-preview-content]'
                  )
                : null;
        if (activeLayer && !activeLayer.contains(anchor)) {
            return;
        }
        const owner = ontrigger ? undefined : getOwner();
        if (!ontrigger && !owner) {
            return;
        }

        event.preventDefault();
        if (ontrigger) {
            ontrigger(event);
        } else {
            owner?.click();
        }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
}
