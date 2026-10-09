import type { Intent } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import Button from './button.svelte';

export type ButtonVariant = Intent | 'glow' | 'panel' | 'quiet';
export type ButtonStatus = 'idle' | 'loading' | 'success' | 'error';

type ButtonSharedProps = {
    /** Prevents activation. A disabled link loses its destination and is skipped by Tab. */
    disabled?: boolean;
    /** Visual style. Choose it for what the action means, not for decoration. */
    variant?: ButtonVariant;
    /** Control height. `icon` is a square button for a single icon. */
    size?: 'sm' | 'md' | 'lg' | 'icon';
    /** Content rendered inside. */
    children?: Snippet;
    /**
     * Bindable reference to the rendered DOM element. Type is the union of
     * the two possible element types -- narrow at the use site:
     *
     * ```ts
     * let buttonEl: HTMLButtonElement | HTMLAnchorElement | undefined =
     *   $state();
     * // ...
     * <Button bind:element={buttonEl} href={undefined} />
     * if (buttonEl instanceof HTMLButtonElement) {
     *   buttonEl.focus();
     * }
     * ```
     *
     * Pass `href={undefined}` to guarantee a `<button>` element and narrow
     * to `HTMLButtonElement`; pass `href` to render an `<a>` element. The
     * union exists because both element types share the public API surface;
     * the type system can't distinguish without flow-sensitive analysis at
     * the call site.
     */
    element?: HTMLButtonElement | HTMLAnchorElement | undefined;
    /**
     * Skip the variant/size base classes and render with `class` alone.
     *
     * Menu rows use this to opt out of the button's sizing utilities so the
     * `mielui-menu-item` stylesheet contract governs the surface instead --
     * utilities outrank the `components` layer, so the two cannot coexist.
     */
    unstyled?: boolean;
    /** Controlled visual state. Loading remains focusable and refuses activation. */
    status?: ButtonStatus;
    /** Convenience alias for `status="loading"`. */
    loading?: boolean;
    /** Text shown while `status` is `loading`. The button keeps its width. */
    loadingLabel?: string;
    /** Text shown while `status` is `success`. */
    successLabel?: string;
    /** Text shown while `status` is `error`. */
    errorLabel?: string;
    /** Called when the button is activated. Loading and disabled buttons do not call it. */
    onclick?: (event: MouseEvent) => void;
    /** Called on key down, before the button handles the key itself. */
    onkeydown?: (event: KeyboardEvent) => void;
};

export type ButtonProps = ButtonSharedProps &
    (
        | ({
              /** Renders a link to this address instead of a button. */
              href: string;
          } & Omit<HTMLAnchorAttributes, keyof ButtonSharedProps | 'href'>)
        | ({
              /** Renders a link to this address instead of a button. */
              href?: undefined;
          } & Omit<HTMLButtonAttributes, keyof ButtonSharedProps>)
    );

export { Button };
export default Button;
