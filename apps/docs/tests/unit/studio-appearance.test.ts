import { DEFAULT_THEME } from '@mielui/svelte/themes/theme';
import { describe, expect, it } from 'vitest';
import { readThemeAppearance } from '../../src/routes/studio/editor/appearance';

const defaults = {
    borders: 'single',
    insetPosition: 'bottom',
    edgeHighlight: 0.5,
    surfaceShadows: false,
    controlShadows: true,
    dialogShadows: true,
    glassSurfaces: true,
    travelingHighlight: true,
    primaryStroke: true,
    interactiveCursor: 'default'
};

describe('Studio appearance hydration', () => {
    it('uses the same defaults for initial state, reset, and partial saved themes', () => {
        expect(readThemeAppearance(DEFAULT_THEME)).toEqual(defaults);
        expect(
            readThemeAppearance({ ...DEFAULT_THEME, chrome: undefined, tokens: undefined })
        ).toEqual(defaults);
        expect(readThemeAppearance({ ...DEFAULT_THEME, chrome: { edgeHighlight: 0.25 } })).toEqual({
            ...defaults,
            edgeHighlight: 0.25
        });
    });

    it('keeps explicit saved appearance choices', () => {
        expect(
            readThemeAppearance({
                ...DEFAULT_THEME,
                chrome: {
                    borders: 'double',
                    edgeHighlight: 0,
                    surfaceShadows: true,
                    controlShadows: false,
                    dialogShadows: false,
                    primaryStroke: false
                },
                tokens: {
                    shared: {
                        '--mielui-surface': 'solid',
                        '--mielui-inset-position': 'top'
                    }
                }
            })
        ).toEqual({
            ...defaults,
            borders: 'double',
            insetPosition: 'top',
            edgeHighlight: 0,
            surfaceShadows: true,
            controlShadows: false,
            dialogShadows: false,
            glassSurfaces: false,
            primaryStroke: false
        });
    });

    it('honors the legacy master shadow switch', () => {
        expect(
            readThemeAppearance({
                ...DEFAULT_THEME,
                chrome: { shadows: false, surfaceShadows: true }
            })
        ).toMatchObject({
            surfaceShadows: false,
            controlShadows: false,
            dialogShadows: false
        });
    });
});
