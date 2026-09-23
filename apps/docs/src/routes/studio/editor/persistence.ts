import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
import { readStudioStorage, removeStudioStorage, writeStudioStorage } from '../storage';
import {
    DEFAULT_FOUNDATION_COLORS,
    DEFAULT_ROLE_WEIGHTS,
    type FoundationPalette,
    STUDIO_EXTENSIONS_KEY,
    type StudioExtensions
} from './config';
import type { ThemeEditorState } from './state.svelte';

export function createThemeEditorStorage(state: ThemeEditorState) {
    function loadStudioExtensions() {
        const raw = readStudioStorage(STUDIO_EXTENSIONS_KEY);
        if (!raw) {
            return;
        }
        try {
            const value = JSON.parse(raw) as Partial<StudioExtensions>;
            if (typeof value.presetSlug === 'string') {
                const preset = builtInThemePresets.find(
                    (candidate) => candidate.slug === value.presetSlug
                );
                if (preset) {
                    state.selectedPreset = preset.slug;
                    state.previousPreset = preset.slug;
                    state.baseTheme = { ...preset };
                }
            }
            if (typeof value.headerSize === 'number' && Number.isFinite(value.headerSize)) {
                state.headerSize = Math.max(10, Math.min(32, value.headerSize));
            }
            if (value.headerWeight) {
                state.headerWeight = value.headerWeight;
            }
            if (value.roleWeights) {
                state.roleWeights = { ...DEFAULT_ROLE_WEIGHTS, ...value.roleWeights };
            }
            if (value.foundationColors) {
                const lightFoundationColors = value.foundationColors.light as FoundationPalette & {
                    muted?: string;
                };
                const darkFoundationColors = value.foundationColors.dark as FoundationPalette & {
                    muted?: string;
                };
                const { muted: _lightMuted, ...light } = lightFoundationColors;
                const { muted: _darkMuted, ...dark } = darkFoundationColors;

                state.foundationColors = {
                    light: {
                        ...DEFAULT_FOUNDATION_COLORS.light,
                        ...light
                    },
                    dark: {
                        ...DEFAULT_FOUNDATION_COLORS.dark,
                        ...dark
                    }
                };
            }
            if (value.advancedTokens) {
                const lightTokens = {
                    ...value.advancedTokens.colors?.light
                } as Record<string, string | undefined>;
                const darkTokens = {
                    ...value.advancedTokens.colors?.dark
                } as Record<string, string | undefined>;
                const { '--color-muted': _lightMuted, ...light } = lightTokens;
                const { '--color-muted': _darkMuted, ...dark } = darkTokens;

                state.advancedTokens = {
                    colors: {
                        light,
                        dark
                    },
                    spacing: { ...value.advancedTokens.spacing },
                    animation: { ...value.advancedTokens.animation }
                };
            }
            if (value.brandColors) {
                state.brandColors = {
                    light: value.brandColors.light ?? state.baseTheme.brand,
                    dark: value.brandColors.dark ?? state.baseTheme.brand
                };
            }
            if (
                typeof value.edgeHighlight === 'number' &&
                Number.isFinite(value.edgeHighlight) &&
                value.edgeHighlight >= 0 &&
                value.edgeHighlight <= 1
            ) {
                state.edgeHighlight = value.edgeHighlight;
            }
            const shadowsOff = (value as { shadows?: unknown }).shadows === false;
            if (typeof value.surfaceShadows === 'boolean') {
                state.surfaceShadows = value.surfaceShadows;
            } else if (shadowsOff) {
                state.surfaceShadows = false;
            }
            if (typeof value.controlShadows === 'boolean') {
                state.controlShadows = value.controlShadows;
            } else if (shadowsOff) {
                state.controlShadows = false;
            }
            if (typeof value.dialogShadows === 'boolean') {
                state.dialogShadows = value.dialogShadows;
            } else if (shadowsOff) {
                state.dialogShadows = false;
            }
            if (typeof value.glassSurfaces === 'boolean') {
                state.glassSurfaces = value.glassSurfaces;
            }
            if (typeof value.travelingHighlight === 'boolean') {
                state.travelingHighlight = value.travelingHighlight;
            }
            if (typeof value.primaryStroke === 'boolean') {
                state.primaryStroke = value.primaryStroke;
            }
            if (value.interactiveCursor === 'default' || value.interactiveCursor === 'pointer') {
                state.interactiveCursor = value.interactiveCursor;
            }
        } catch {
            removeStudioStorage(STUDIO_EXTENSIONS_KEY);
        }
    }

    function saveStudioExtensions() {
        const extensions: StudioExtensions = {
            presetSlug: state.selectedPreset,
            headerSize: state.headerSize,
            headerWeight: state.headerWeight,
            roleWeights: { ...state.roleWeights },
            brandColors: { ...state.brandColors },
            foundationColors: {
                light: { ...state.foundationColors.light },
                dark: { ...state.foundationColors.dark }
            },
            advancedTokens: {
                colors: {
                    light: { ...state.advancedTokens.colors.light },
                    dark: { ...state.advancedTokens.colors.dark }
                },
                spacing: { ...state.advancedTokens.spacing },
                animation: { ...state.advancedTokens.animation }
            },
            edgeHighlight: state.edgeHighlight,
            surfaceShadows: state.surfaceShadows,
            controlShadows: state.controlShadows,
            dialogShadows: state.dialogShadows,
            travelingHighlight: state.travelingHighlight,
            glassSurfaces: state.glassSurfaces,
            primaryStroke: state.primaryStroke,
            interactiveCursor: state.interactiveCursor
        };
        writeStudioStorage(STUDIO_EXTENSIONS_KEY, JSON.stringify(extensions));
    }
    return { load: loadStudioExtensions, save: saveStudioExtensions };
}
