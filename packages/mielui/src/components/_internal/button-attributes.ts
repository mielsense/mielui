import type { HTMLButtonAttributes } from 'svelte/elements';
import type { ButtonProps } from '../button';

/**
 * Button props for parts that always render a `<button>`, such as menu rows and options.
 * These parts drop `href` at runtime, so the type does not offer it.
 */
export type ButtonOnlyProps = Omit<Extract<ButtonProps, { href?: undefined }>, 'href'>;

export function buttonAttributes(attributes: HTMLButtonAttributes) {
    const { disabled, onclick, onkeydown, ...rest } = attributes;
    return {
        ...rest,
        href: undefined,
        disabled: disabled ?? undefined,
        onclick: onclick
            ? (event: MouseEvent) => {
                  if (event.currentTarget instanceof HTMLButtonElement) {
                      onclick(event as MouseEvent & { currentTarget: HTMLButtonElement });
                  }
              }
            : undefined,
        onkeydown: onkeydown
            ? (event: KeyboardEvent) => {
                  if (event.currentTarget instanceof HTMLButtonElement) {
                      onkeydown(event as KeyboardEvent & { currentTarget: HTMLButtonElement });
                  }
              }
            : undefined
    };
}
