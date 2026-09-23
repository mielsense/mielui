import {
    type AnimationTokenDefinition,
    type AnimationTokenName,
    animationTokenDefinitions,
    type ColorTokenDefinition,
    type ColorTokenName,
    colorTokenDefinitions,
    formatMs,
    formatPx,
    formatScale,
    matchingEase,
    parseCssColor,
    parseDurationMs,
    parsePxLength,
    parseScale,
    type SpacingTokenDefinition,
    type SpacingTokenName,
    spacingTokenDefinitions
} from '$lib/studio-advanced-tokens';
import type { ThemeEditorState } from './state.svelte';

export function createThemeTokenEditor(state: ThemeEditorState, getMode: () => 'light' | 'dark') {
    function updateAdvancedColorToken(name: ColorTokenName, value: string) {
        state.advancedTokens = {
            ...state.advancedTokens,
            colors: {
                ...state.advancedTokens.colors,
                [getMode()]: {
                    ...state.advancedTokens.colors[getMode()],
                    [name]: value
                }
            }
        };
    }

    function updateAdvancedSpacingToken(name: SpacingTokenName, value: string) {
        state.advancedTokens = {
            ...state.advancedTokens,
            spacing: { ...state.advancedTokens.spacing, [name]: value }
        };
    }

    function updateAdvancedAnimationToken(name: AnimationTokenName, value: string) {
        state.advancedTokens = {
            ...state.advancedTokens,
            animation: { ...state.advancedTokens.animation, [name]: value }
        };
    }

    function colorTokenFallback(definition: ColorTokenDefinition) {
        if (getMode() === 'dark' && 'darkFallback' in definition && definition.darkFallback) {
            return definition.darkFallback;
        }

        return definition.fallback;
    }

    function readCssVar(name: string) {
        if (typeof document === 'undefined') {
            return '';
        }

        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    function resolveTokenRaw(name: string) {
        const colorOverride = state.advancedTokens.colors[getMode()][name as ColorTokenName];
        if (colorOverride?.trim()) {
            return colorOverride.trim();
        }

        const spacingOverride = state.advancedTokens.spacing[name as SpacingTokenName];
        if (spacingOverride?.trim()) {
            return spacingOverride.trim();
        }

        const animationOverride = state.advancedTokens.animation[name as AnimationTokenName];
        if (animationOverride?.trim()) {
            return animationOverride.trim();
        }

        const computed = readCssVar(name);
        if (computed) {
            return computed;
        }

        const colorDefinition = colorTokenDefinitions.find((item) => item.name === name);
        if (colorDefinition) {
            return colorTokenFallback(colorDefinition);
        }

        const spacingDefinition = spacingTokenDefinitions.find((item) => item.name === name);
        if (spacingDefinition) {
            return spacingDefinition.fallback;
        }

        const animationDefinition = animationTokenDefinitions.find((item) => item.name === name);
        if (animationDefinition) {
            return animationDefinition.fallback;
        }

        return '';
    }

    function resolveColorToken(definition: ColorTokenDefinition) {
        const domReady = (state.appliedDark ? 'dark' : 'light') === getMode();
        const override = state.advancedTokens.colors[getMode()][definition.name]?.trim() ?? '';
        const computed = domReady ? readCssVar(definition.name) : '';
        const raw = override || computed || colorTokenFallback(definition);
        const parsed = parseCssColor(raw, resolveTokenRaw);
        if (parsed) {
            return parsed;
        }

        return {
            hex: '#000000',
            alpha: 1
        };
    }

    function resolveSpacingToken(definition: SpacingTokenDefinition) {
        const override = state.advancedTokens.spacing[definition.name]?.trim() ?? '';
        const raw = override || readCssVar(definition.name) || definition.fallback;
        return parsePxLength(raw, resolveTokenRaw);
    }

    function resolveAnimationRaw(definition: AnimationTokenDefinition) {
        const override = state.advancedTokens.animation[definition.name]?.trim() ?? '';
        return override || readCssVar(definition.name) || definition.fallback;
    }

    function animationSliderValue(definition: AnimationTokenDefinition) {
        const raw = resolveAnimationRaw(definition);
        if (definition.kind === 'duration') {
            return parseDurationMs(raw);
        }

        if (definition.kind === 'scale' || definition.kind === 'opacity') {
            return parseScale(raw);
        }

        return parsePxLength(raw, resolveTokenRaw);
    }

    function animationSliderDisplay(definition: AnimationTokenDefinition, value: number) {
        if (definition.kind === 'duration') {
            return formatMs(value);
        }

        if (definition.kind === 'scale' || definition.kind === 'opacity') {
            return formatScale(value);
        }

        return formatPx(value);
    }

    function commitAnimationSlider(definition: AnimationTokenDefinition, value: number) {
        if (definition.kind === 'duration') {
            updateAdvancedAnimationToken(definition.name, formatMs(value));
            return;
        }

        if (definition.kind === 'scale' || definition.kind === 'opacity') {
            updateAdvancedAnimationToken(definition.name, formatScale(value));
            return;
        }

        updateAdvancedAnimationToken(definition.name, formatPx(value));
    }

    function animationEaseValue(definition: AnimationTokenDefinition) {
        return matchingEase(resolveAnimationRaw(definition));
    }
    return {
        updateAdvancedColorToken,
        updateAdvancedSpacingToken,
        updateAdvancedAnimationToken,
        resolveColorToken,
        resolveSpacingToken,
        animationSliderValue,
        animationSliderDisplay,
        commitAnimationSlider,
        animationEaseValue
    };
}
