import type { ParsedShortcut } from './shortcut';

const owners = 'button, a[href], [role="button"]';
const nativelyActivated =
    'button, a[href], summary, [role="button"], [role="link"], [role="menuitem"], [role="option"], [role="tab"], [role="checkbox"], [role="switch"], [role="radio"]';

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

    /** Alt rewrites `event.key` on macOS, so Alt shortcuts also match the physical key. */
    function physicalKey(code: string) {
        const letter = /^Key([A-Z])$/.exec(code);
        if (letter) {
            return letter[1].toLowerCase();
        }
        return /^Digit(\d)$/.exec(code)?.[1];
    }

    function matchesKey(event: KeyboardEvent, parsed: ParsedShortcut) {
        if (event.key.toLowerCase() === parsed.key) {
            return true;
        }
        return parsed.alt && physicalKey(event.code) === parsed.key;
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
            !matchesKey(event, parsed) ||
            event.metaKey !== parsed.meta ||
            event.ctrlKey !== parsed.ctrl ||
            event.shiftKey !== parsed.shift ||
            event.altKey !== parsed.alt
        ) {
            return;
        }

        const activatesNatively =
            !parsed.meta &&
            !parsed.ctrl &&
            !parsed.alt &&
            !parsed.shift &&
            (parsed.key === 'enter' || parsed.key === ' ');
        if (
            activatesNatively &&
            event.target instanceof Element &&
            event.target.closest(nativelyActivated)
        ) {
            return;
        }

        const owner = element.closest<HTMLElement>(owners);
        const anchor = owner ?? element.parentElement;
        if (
            !anchor ||
            anchor.matches(':disabled') ||
            anchor.hasAttribute('disabled') ||
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
        if (ontrigger) {
            event.preventDefault();
            ontrigger(event);
        } else if (owner) {
            event.preventDefault();
            owner.click();
        }
    }

    window.addEventListener('keydown', handleKey);

    return () => {
        window.removeEventListener('keydown', handleKey);
    };
}
