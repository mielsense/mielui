import type { HTMLButtonAttributes } from 'svelte/elements';

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
