import { DEFAULT_THEME } from '@mielui/svelte/themes/theme';
import { describe, expect, it } from 'vitest';
import { readThemeAppearance } from '../../src/routes/studio/editor/appearance';

const defaults = {
    borders: 'single',
    insetPosition: 'bottom',
    edgeHighlight: 0.33,
    surfaceShadows: false,
    controlShadows: true,
    dialogShadows: true,
    glassSurfaces: false,
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
                        '--mielui-surface': 'glass',
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
            glassSurfaces: true,
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

describe('Studio draft fonts', () => {
    it('starts on the Default preset fonts, so no font shows a reset', async () => {
        const { createThemeEditorState } = await import(
            '../../src/routes/studio/editor/state.svelte'
        );
        const { findHeaderKey, findMonoKey, findSansKey } = await import(
            '../../src/routes/studio/editor/config'
        );
        const state = createThemeEditorState();

        expect(state.selectedSans).toBe(findSansKey(DEFAULT_THEME.fontSans));
        expect(state.selectedSans).toBe('inter-tight');
        expect(state.selectedHeader).toBe(findHeaderKey(DEFAULT_THEME.fontHeader));
        expect(state.selectedMono).toBe(findMonoKey(DEFAULT_THEME.fontMono));
    });
});
