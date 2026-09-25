import {
    DEFAULT_THEME,
    migrateThemeV3ToV4,
    parseTheme,
    THEME_VERSION,
    themeToCss
} from '@mielui/svelte/themes/theme';
import { describe, expect, it } from 'vitest';

describe('DEFAULT_THEME', () => {
    it('matches the public visual axes baked into ui.css', () => {
        expect(DEFAULT_THEME).toMatchObject({
            version: THEME_VERSION,
            brand: '#ba7ca5',
            neutral: 'warm',
            radius: 'default',
            density: 'default',
            motion: 'default',
            fontSans: "'Inter', sans-serif",
            fontMono: "'JetBrains Mono', monospace"
        });
    });
});

describe('themeToCss', () => {
    const css = themeToCss(DEFAULT_THEME);

    it('emits fonts, radii, density, brand, motion, and mode-specific neutrals', () => {
        expect(css).toContain("--font-sans: 'Inter', sans-serif");
        expect(css).toContain('--radius-lg: 14px');
        expect(css).toContain('--color-primary: #ba7ca5');
        expect(css).toContain('--mielui-space-unit: 3.6px');
        expect(css).toContain('--motion-duration-menu: 40ms');
        expect(css).toContain(':root {');
        expect(css).toContain('.dark {');
    });

    it('never emits a custom property that references itself', () => {
        for (const line of css.split('\n')) {
            const declaration = line.match(/^\s*(--[\w-]+):\s*(.+);$/);
            if (!declaration) {
                continue;
            }
            expect(declaration[2]).not.toContain(`var(${declaration[1]})`);
        }
    });

    it('derives custom brand tokens without changing the schema', () => {
        const custom = themeToCss({ ...DEFAULT_THEME, brand: '#22cc88' });
        expect(custom).toContain('--color-primary: #22cc88');
        expect(custom).toContain('--color-ring: color-mix(in srgb, #22cc88 30%, transparent)');
        expect(custom).toContain('--mielui-blue-500: #22cc88');
    });

    it('maps the foundation muted-text color to the muted foreground token', () => {
        const css = themeToCss({
            ...DEFAULT_THEME,
            foundation: {
                light: {
                    foregroundMuted: '#737373'
                }
            }
        });

        expect(css).toContain('--color-foreground-muted: #737373');
        expect(css).not.toContain('--color-muted:');
    });
});

describe('parseTheme', () => {
    it('normalizes untrusted v2 JSON', () => {
        expect(parseTheme({ ...DEFAULT_THEME, brand: '#AABBCC' }).brand).toBe('#aabbcc');
    });

    it('drops the removed muted surface when upgrading a v3 theme', () => {
        const v3Theme = parseTheme({
            ...DEFAULT_THEME,
            version: 3,
            foundation: {
                light: {
                    muted: '#f7f7f5'
                }
            }
        });

        expect(migrateThemeV3ToV4(v3Theme)).toMatchObject({
            version: 4
        });
        expect(v3Theme.foundation).toBeUndefined();
    });

    it('rejects legacy, unversioned, and malformed payloads', () => {
        expect(() => parseTheme({ ...DEFAULT_THEME, version: 1 })).toThrow(/version/);
        expect(() => parseTheme({ ...DEFAULT_THEME, version: undefined })).toThrow(/version/);
        expect(() => parseTheme({ ...DEFAULT_THEME, brand: 'blue' })).toThrow(/brand/);
        expect(() => parseTheme({ ...DEFAULT_THEME, neutral: 'purple' })).toThrow(/neutral/);
    });
});

describe('edge highlight strength', () => {
    it('uses half strength when older themes omit the setting', () => {
        expect(themeToCss(DEFAULT_THEME)).toContain('--mielui-edge-highlight: 0.5;');
    });

    it.each([0, 0.5, 1])(
        'preserves strength %s through JSON parsing and CSS export',
        (strength) => {
            const theme = parseTheme(
                JSON.parse(
                    JSON.stringify({
                        ...DEFAULT_THEME,
                        chrome: { edgeHighlight: strength }
                    })
                )
            );
            expect(theme.chrome?.edgeHighlight).toBe(strength);
            expect(themeToCss(theme)).toContain(`--mielui-edge-highlight: ${strength};`);
        }
    );

    it.each([-1, 1.01, Number.NaN, Number.POSITIVE_INFINITY, '0.5', null])(
        'rejects invalid strength %s',
        (edgeHighlight) => {
            expect(() => parseTheme({ ...DEFAULT_THEME, chrome: { edgeHighlight } })).toThrow(
                'chrome.edgeHighlight'
            );
        }
    );

    it('preserves raw elevation overrides and gives disabled shadows final precedence', () => {
        const custom = '--elevation-control: inset 0 0 0 2px red;';
        const css = themeToCss({
            ...DEFAULT_THEME,
            chrome: { edgeHighlight: 1, controlShadows: false },
            tokens: { shared: { '--elevation-control': 'inset 0 0 0 2px red' } }
        });
        expect(css).toContain(custom);
        expect(
            css.lastIndexOf(
                '--elevation-control: inset 0 0 0 var(--border-size) var(--color-border);'
            )
        ).toBeGreaterThan(css.indexOf(custom));
    });
});
