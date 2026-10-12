import type { Theme } from '@mielui/svelte/themes/theme';
import {
    type BrandColors,
    brandTokens,
    cleanTokens,
    DEFAULT_FOUNDATION_COLORS,
    type FoundationPalette
} from './config';
import type { ThemeEditorState } from './state.svelte';

type ColorMode = 'light' | 'dark';

/**
 * The colors a theme has to state. A color the preset does not set and the user has not
 * moved off the default is left out, so the stylesheet's own value applies.
 */
function statedColors(state: ThemeEditorState, colorMode: ColorMode) {
    const preset = state.baseTheme.foundation?.[colorMode];
    const entries = Object.entries(state.foundationColors[colorMode]).filter(([key, value]) => {
        const name = key as keyof FoundationPalette;

        return preset?.[name] !== undefined || value !== DEFAULT_FOUNDATION_COLORS[colorMode][name];
    });

    return Object.fromEntries(entries);
}

/** The tokens that follow the brand color, stated only once it leaves the preset's. */
function brandOverrides(color: string, baseColor: string) {
    if (color === baseColor) {
        return {};
    }

    return brandTokens(color);
}

/** Builds the theme the Studio applies, saves, and exports from the draft. */
export function exportTheme(state: ThemeEditorState, baseBrand: BrandColors): Theme {
    return {
        ...state.theme,
        version: 4,
        foundation: {
            light: statedColors(state, 'light'),
            dark: statedColors(state, 'dark')
        },
        typography: {
            headerSize: state.headerSize,
            headerWeight: state.headerWeight,
            roleWeights: state.roleWeights
        },
        chrome: {
            borders: state.borders,
            edgeHighlight: state.edgeHighlight,
            surfaceShadows: state.surfaceShadows,
            controlShadows: state.controlShadows,
            dialogShadows: state.dialogShadows,
            travelingHighlight: state.travelingHighlight ? undefined : false,
            primaryStroke: state.primaryStroke,
            interactiveCursor: state.interactiveCursor
        },
        tokens: {
            shared: {
                ...state.baseTheme.tokens?.shared,
                ...cleanTokens(state.advancedTokens.spacing),
                ...cleanTokens(state.advancedTokens.animation),
                '--mielui-inset-position': state.insetPosition,
                '--mielui-surface': state.glassSurfaces ? 'glass' : 'solid'
            },
            light: {
                ...state.baseTheme.tokens?.light,
                '--color-primary': state.brandColors.light,
                ...brandOverrides(state.brandColors.light, baseBrand.light),
                ...cleanTokens(state.advancedTokens.colors.light)
            },
            dark: {
                ...state.baseTheme.tokens?.dark,
                '--color-primary': state.brandColors.dark,
                ...brandOverrides(state.brandColors.dark, baseBrand.dark),
                ...cleanTokens(state.advancedTokens.colors.dark)
            }
        }
    };
}
