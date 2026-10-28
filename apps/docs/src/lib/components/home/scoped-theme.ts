import { type Theme, themeToCss } from '@mielui/svelte/themes/theme';

/**
 * Tokens ui.css derives from the neutral ramp, the brand, and the space unit. They resolve once
 * at the root, so a scope that swaps the ramp has to declare them again to pick it up.
 * shortcut: mirrors ui.css by hand, update it when ui.css derives a new token the homepage shows.
 */
const derived = [
    '--color-background: var(--mielui-neutral-10);',
    '--color-card: var(--mielui-neutral-0);',
    '--color-panel: var(--mielui-neutral-0);',
    '--color-secondary: var(--mielui-neutral-100);',
    '--color-foreground: var(--mielui-neutral-900);',
    '--color-foreground-muted: var(--mielui-neutral-500);',
    '--color-border: color-mix(in srgb, var(--color-foreground) 12%, transparent);',
    '--color-border-strong: color-mix(in srgb, var(--color-foreground) 22%, transparent);',
    '--color-input: color-mix(in srgb, var(--color-foreground) 14%, transparent);',
    '--color-wash: color-mix(in srgb, var(--color-foreground) 5%, transparent);',
    '--color-accent-tint: var(--mielui-blue-50);',
    '--color-info: var(--mielui-blue-500);',
    '--color-info-soft: color-mix(in srgb, var(--color-info) 12%, transparent);',
    '--mielui-success-text: color-mix(in oklab, var(--color-success) 65%, var(--color-foreground));',
    '--mielui-warning-text: color-mix(in oklab, var(--color-warning) 65%, var(--color-foreground));',
    '--mielui-error-text: color-mix(in oklab, var(--color-error) 65%, var(--color-foreground));',
    '--mielui-info-text: color-mix(in oklab, var(--color-info) 65%, var(--color-foreground));',
    '--color-tooltip: var(--mielui-neutral-900);',
    '--color-tooltip-foreground: var(--mielui-neutral-0);',
    '--color-field: var(--color-card);',
    '--mielui-control-border: color-mix(in oklab, var(--color-foreground) 30%, var(--color-card));',
    '--color-field-hover: var(--color-secondary);',
    '--color-field-foreground: var(--color-foreground);',
    '--color-button-foreground: var(--color-foreground);',
    '--spacing: var(--mielui-space-unit);',
    '--size-control-sm: calc(var(--mielui-space-unit) * 8);',
    '--size-control-md: calc(var(--mielui-space-unit) * 10);',
    '--size-control-lg: calc(var(--mielui-space-unit) * 12);',
    '--size-icon-md: calc(var(--size-control-md) - var(--size-hairline));'
];

const derivedDark = [
    '--color-panel: var(--mielui-neutral-50);',
    '--color-border: color-mix(in srgb, var(--color-foreground) 14%, transparent);',
    '--color-border-strong: color-mix(in srgb, var(--color-foreground) 24%, transparent);',
    '--color-input: color-mix(in srgb, var(--color-foreground) 16%, transparent);',
    '--color-wash: color-mix(in srgb, var(--color-foreground) 6%, transparent);',
    '--color-field: color-mix(in srgb, var(--color-foreground) 6%, var(--color-background));'
];

function scopeSelector(selector: string, scope: string) {
    if (selector === ':root') {
        return scope;
    }

    return `${selector} ${scope}`;
}

/** A theme's CSS, applied only inside the elements that match `scope`. */
export function scopedThemeCss(theme: Theme, scope: string): string {
    const css = themeToCss(theme).replaceAll(/^([^{}\s][^{}]*)\{/gm, (_, selectors: string) => {
        const scoped = selectors
            .split(',')
            .map((selector) => scopeSelector(selector.trim(), scope))
            .join(', ');

        return `${scoped} {`;
    });

    return `${scope} {\n${derived.join('\n')}\n}\n.dark ${scope} {\n${derivedDark.join('\n')}\n}\n${css}`;
}
