import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
import { DEFAULT_THEME, parseTheme } from '@mielui/svelte/themes/theme';
import { describe, expect, it } from 'vitest';

describe('builtInThemePresets', () => {
    it('ships a valid, unique version-2 catalog led by the default theme', () => {
        expect(builtInThemePresets[0].slug).toBe('default');
        expect(builtInThemePresets.length).toBeGreaterThan(1);
        expect(new Set(builtInThemePresets.map((theme) => theme.slug)).size).toBe(
            builtInThemePresets.length
        );
        for (const theme of builtInThemePresets) {
            expect(parseTheme(theme)).toEqual(theme);
        }
    });

    it('resolves each preset to its edge light and control shadows', () => {
        const resolved = Object.fromEntries(
            builtInThemePresets.map((theme) => {
                const chrome = {
                    ...DEFAULT_THEME.chrome,
                    ...theme.chrome
                };

                return [
                    theme.slug,
                    {
                        edgeHighlight: chrome.edgeHighlight,
                        controlShadows: chrome.shadows !== false && chrome.controlShadows !== false
                    }
                ];
            })
        );
        const flat = {
            edgeHighlight: 0,
            controlShadows: false
        };

        expect(resolved).toEqual({
            default: flat,
            magic: flat,
            bitsy: {
                edgeHighlight: 0.7,
                controlShadows: true
            },
            open: flat,
            functional: flat,
            daydream: flat,
            honey: flat,
            forest: flat,
            ink: flat,
            ocean: flat,
            console: flat,
            ember: {
                edgeHighlight: 0.6,
                controlShadows: true
            },
            lilac: flat,
            profitable: flat,
            raven: flat,
            clawd: flat,
            inspiration: {
                edgeHighlight: 0,
                controlShadows: true
            },
            government: flat
        });
    });
});
