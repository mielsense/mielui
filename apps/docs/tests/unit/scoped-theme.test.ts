import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
import { expect, it } from 'vitest';
import { scopedThemeCss } from '$lib/components/home/scoped-theme';

it('keeps every rule of a theme inside its scope', () => {
    for (const theme of builtInThemePresets) {
        const css = scopedThemeCss(theme, '[data-wall]');
        const selectors = [...css.matchAll(/^([^{}\s][^{}]*)\{/gm)].flatMap((match) => {
            return match[1].split(',').map((selector) => selector.trim());
        });

        expect(selectors.length).toBeGreaterThan(2);
        for (const selector of selectors) {
            expect(selector).toMatch(/(^| )\[data-wall\]$/);
        }
        expect(css).toContain(`--color-primary: ${theme.brand};`);
    }
});
