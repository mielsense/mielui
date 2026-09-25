import type { SliderProps } from '@mielui/svelte/components/slider';
import { toast } from '@mielui/svelte/components/toast';
import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
import { applyLiveThemeCss, loadStudioTheme, saveStudioTheme } from '@mielui/svelte/themes/live';
import { type Theme, themeToCss } from '@mielui/svelte/themes/theme';
import { mode, setMode } from 'mode-watcher';
import { onDestroy, onMount } from 'svelte';
import {
    brandTokens,
    cleanTokens,
    countTokenOverrides,
    DEFAULT_FOUNDATION_COLORS,
    DEFAULT_ROLE_WEIGHTS,
    emptyAdvancedTokens,
    type FontWeight,
    type FoundationPalette,
    findHeaderKey,
    findMonoKey,
    findSansKey,
    headerFonts,
    monoFonts,
    motionDurationTokenNames,
    type RoleWeights,
    radiusTokenNames,
    sansFonts,
    themeAxes
} from './config';
import { createThemeEditorStorage } from './persistence';
import { createThemeEditorState } from './state.svelte';
import { createThemeTokenEditor } from './tokens';

export function createThemeEditor() {
    const state = createThemeEditorState();
    const storage = createThemeEditorStorage(state);
    function setEdgeHighlightEnabled(enabled: boolean) {
        if (enabled) {
            state.edgeHighlight = state.rememberedEdgeHighlight;
        } else {
            if (state.edgeHighlight > 0) {
                state.rememberedEdgeHighlight = state.edgeHighlight;
            }
            state.edgeHighlight = 0;
        }
    }

    const appMode = $derived(mode.current === 'dark' ? 'dark' : 'light');

    const appModeBinding = {
        get value() {
            return appMode;
        },
        set value(value: string) {
            if (value === 'light' || value === 'dark') {
                setMode(value);
            }
        }
    };

    const foundationColorChanges = $derived(
        (['light', 'dark'] as const).reduce((count, colorMode) => {
            const changedColors = Object.entries(state.foundationColors[colorMode]).filter(
                ([key, value]) =>
                    value !== DEFAULT_FOUNDATION_COLORS[colorMode][key as keyof FoundationPalette]
            ).length;

            return count + changedColors;
        }, 0)
    );

    const advancedColorChanges = $derived(
        countTokenOverrides(state.advancedTokens.colors.light) +
            countTokenOverrides(state.advancedTokens.colors.dark)
    );

    const spacingTokenChanges = $derived(countTokenOverrides(state.advancedTokens.spacing));

    const animationTokenChanges = $derived(countTokenOverrides(state.advancedTokens.animation));

    const advancedTokenChanges = $derived(
        advancedColorChanges + spacingTokenChanges + animationTokenChanges
    );

    const roleWeightChanges = $derived(
        Object.entries(state.roleWeights).filter(
            ([key, value]) => value !== DEFAULT_ROLE_WEIGHTS[key as keyof RoleWeights]
        ).length
    );

    const changedAxisCount = $derived(
        themeAxes.filter((axis) => state.theme[axis] !== state.baseTheme[axis]).length +
            (state.brandColors.light !== state.baseTheme.brand ||
            state.brandColors.dark !== state.baseTheme.brand
                ? 1
                : 0) +
            foundationColorChanges +
            advancedTokenChanges +
            (state.headerSize === 16 ? 0 : 1) +
            (state.headerWeight === '600' ? 0 : 1) +
            roleWeightChanges +
            (state.borders === (state.baseTheme.chrome?.borders ?? 'double') ? 0 : 1) +
            (state.insetPosition ===
            (state.baseTheme.tokens?.shared?.['--mielui-inset-position'] ?? 'bottom')
                ? 0
                : 1) +
            (state.edgeHighlight === (state.baseTheme.chrome?.edgeHighlight ?? 0.5) ? 0 : 1) +
            (state.surfaceShadows ? 0 : 1) +
            (state.controlShadows ? 0 : 1) +
            (state.dialogShadows ? 0 : 1) +
            (state.travelingHighlight ? 0 : 1) +
            (state.primaryStroke ? 1 : 0) +
            (state.glassSurfaces ? 1 : 0) +
            (state.interactiveCursor === 'default' ? 0 : 1)
    );

    const dirty = $derived(changedAxisCount > 0);

    const exportedTheme: Theme = $derived({
        ...state.theme,
        version: 4,
        foundation: state.foundationColors,
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
                ...cleanTokens(state.advancedTokens.spacing),
                ...cleanTokens(state.advancedTokens.animation),
                '--mielui-inset-position': state.insetPosition,
                '--mielui-surface': state.glassSurfaces ? 'glass' : 'solid'
            },
            light: {
                ...brandTokens(state.brandColors.light),
                ...cleanTokens(state.advancedTokens.colors.light)
            },
            dark: {
                ...brandTokens(state.brandColors.dark),
                ...cleanTokens(state.advancedTokens.colors.dark)
            }
        }
    });

    const generatedCss = $derived(themeToCss(exportedTheme));

    const generatedJson = $derived(JSON.stringify(exportedTheme, null, 2));

    function syncFontSelections(nextTheme: Theme) {
        state.selectedSans = findSansKey(nextTheme.fontSans);
        state.previousSans = state.selectedSans;
        state.selectedHeader = findHeaderKey(nextTheme.fontHeader);
        state.previousHeader = state.selectedHeader;
        state.selectedMono = findMonoKey(nextTheme.fontMono);
        state.previousMono = state.selectedMono;
    }

    function applyPreset(slug: string) {
        const preset = builtInThemePresets.find((candidate) => candidate.slug === slug);
        if (!preset) {
            return;
        }

        const draftIdentity = {
            slug: state.theme.slug,
            name: state.theme.name,
            description: state.theme.description
        };
        state.baseTheme = { ...preset };
        state.theme = { ...preset, ...draftIdentity };
        state.headerSize = 16;
        state.headerWeight = '600';
        state.roleWeights = { ...DEFAULT_ROLE_WEIGHTS };
        state.foundationColors = {
            light: { ...DEFAULT_FOUNDATION_COLORS.light },
            dark: { ...DEFAULT_FOUNDATION_COLORS.dark }
        };
        state.advancedTokens = emptyAdvancedTokens();
        state.brandColors = { light: preset.brand, dark: preset.brand };
        state.borders = preset.chrome?.borders ?? 'double';
        state.insetPosition =
            preset.tokens?.shared?.['--mielui-inset-position'] === 'top' ? 'top' : 'bottom';
        state.edgeHighlight = preset.chrome?.edgeHighlight ?? 0.5;
        state.surfaceShadows =
            preset.chrome?.shadows !== false && preset.chrome?.surfaceShadows !== false;
        state.controlShadows =
            preset.chrome?.shadows !== false && preset.chrome?.controlShadows !== false;
        state.dialogShadows =
            preset.chrome?.shadows !== false && preset.chrome?.dialogShadows !== false;
        state.glassSurfaces = preset.tokens?.shared?.['--mielui-surface'] === 'glass';
        state.travelingHighlight = preset.chrome?.travelingHighlight !== false;
        state.primaryStroke = false;
        state.interactiveCursor = 'default';
        syncFontSelections(state.theme);
    }

    function resetTheme() {
        applyPreset(state.baseTheme.slug);
    }

    function updateBrand(value: string) {
        const next = value.toLowerCase();
        state.brandColors = { ...state.brandColors, [appMode]: next };
        state.theme = { ...state.theme, brand: state.brandColors.light };
    }

    function updateFoundationColor(key: keyof FoundationPalette, value: string) {
        state.foundationColors = {
            ...state.foundationColors,
            [appMode]: {
                ...state.foundationColors[appMode],
                [key]: value.toLowerCase()
            }
        };
    }

    function updateRoleWeight(key: keyof RoleWeights, value: FontWeight) {
        state.roleWeights = { ...state.roleWeights, [key]: value };
    }

    function headerSliderProps(): SliderProps {
        return {
            value: state.headerSize,
            min: 10,
            max: 32,
            step: 1,
            label: 'Header size',
            class: 'h-4',
            onValueChange: (value) => {
                state.headerSize = value;
            }
        };
    }

    function confirmPresetChange() {
        if (!state.pendingPreset) {
            return;
        }
        state.previousPreset = state.pendingPreset;
        state.selectedPreset = state.pendingPreset;
        applyPreset(state.pendingPreset);
        state.pendingPreset = null;
    }

    onMount(() => {
        const storedTheme = loadStudioTheme();
        if (storedTheme) {
            state.theme = { ...storedTheme };
            state.borders = storedTheme.chrome?.borders ?? 'double';
            state.insetPosition =
                storedTheme.tokens?.shared?.['--mielui-inset-position'] === 'top'
                    ? 'top'
                    : 'bottom';
            state.edgeHighlight = storedTheme.chrome?.edgeHighlight ?? 0.5;
            syncFontSelections(state.theme);
        }
        storage.load();
        state.previousRadius = state.theme.radius;
        state.previousDensity = state.theme.density;
        state.previousMotion = state.theme.motion;
        state.hydrated = true;
        const root = document.documentElement;
        state.appliedDark = root.classList.contains('dark');
        const observer = new MutationObserver(() => {
            state.appliedDark = root.classList.contains('dark');
        });
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    });

    $effect(() => {
        if (state.selectedPreset === state.previousPreset) {
            return;
        }
        const nextPreset = state.selectedPreset;
        if (dirty) {
            state.pendingPreset = nextPreset;
            state.selectedPreset = state.previousPreset;
            state.presetDialogOpen = true;
            return;
        }
        state.previousPreset = nextPreset;
        applyPreset(nextPreset);
    });

    $effect(() => {
        if (!state.hydrated) {
            state.previousRadius = state.theme.radius;
            state.previousDensity = state.theme.density;
            state.previousMotion = state.theme.motion;
            return;
        }
        const radiusChanged = state.theme.radius !== state.previousRadius;
        const densityChanged = state.theme.density !== state.previousDensity;
        const motionChanged = state.theme.motion !== state.previousMotion;
        if (!radiusChanged && !densityChanged && !motionChanged) {
            return;
        }
        state.previousRadius = state.theme.radius;
        state.previousDensity = state.theme.density;
        state.previousMotion = state.theme.motion;
        const nextSpacing = { ...state.advancedTokens.spacing };
        const nextAnimation = { ...state.advancedTokens.animation };
        let changed = false;
        if (radiusChanged) {
            for (const name of radiusTokenNames) {
                if (nextSpacing[name]?.trim()) {
                    delete nextSpacing[name];
                    changed = true;
                }
            }
        }
        if (densityChanged && nextSpacing['--mielui-space-unit']?.trim()) {
            delete nextSpacing['--mielui-space-unit'];
            changed = true;
        }
        if (motionChanged) {
            for (const name of motionDurationTokenNames) {
                if (nextAnimation[name]?.trim()) {
                    delete nextAnimation[name];
                    changed = true;
                }
            }
        }
        if (changed) {
            state.advancedTokens = {
                ...state.advancedTokens,
                spacing: nextSpacing,
                animation: nextAnimation
            };
        }
    });

    $effect(() => {
        if (state.selectedSans === state.previousSans) {
            return;
        }
        state.previousSans = state.selectedSans;
        const selected = sansFonts.find((font) => font.key === state.selectedSans);
        if (selected) {
            state.theme = { ...state.theme, fontSans: selected.value };
        }
    });

    $effect(() => {
        if (state.selectedHeader === state.previousHeader) {
            return;
        }
        state.previousHeader = state.selectedHeader;
        const selected = headerFonts.find((font) => font.key === state.selectedHeader);
        if (selected) {
            state.theme = { ...state.theme, fontHeader: selected.value };
        }
    });

    $effect(() => {
        if (state.selectedMono === state.previousMono) {
            return;
        }
        state.previousMono = state.selectedMono;
        const selected = monoFonts.find((font) => font.key === state.selectedMono);
        if (selected) {
            state.theme = { ...state.theme, fontMono: selected.value };
        }
    });

    $effect(() => {
        if (!state.hydrated) {
            return;
        }
        const css = generatedCss;
        document.documentElement.style.removeProperty('--font-sans');
        applyLiveThemeCss(css);
        saveStudioTheme(exportedTheme);
        storage.save();
    });
    const tokens = createThemeTokenEditor(state, () => appMode);
    let copyTimer: ReturnType<typeof setTimeout> | undefined;
    function acknowledgeCopy(key: 'css' | 'json') {
        clearTimeout(copyTimer);
        state.copiedKey = key;
        toast({
            title: key === 'css' ? 'CSS copied' : 'JSON copied',
            description: 'The draft is ready to paste into your project.',
            type: 'success',
            duration: 1600
        });
        copyTimer = setTimeout(() => {
            state.copiedKey = null;
        }, 1200);
    }
    onDestroy(() => {
        clearTimeout(copyTimer);
    });
    return {
        state,
        tokens,
        acknowledgeCopy,
        setEdgeHighlightEnabled,
        resetTheme,
        updateBrand,
        updateFoundationColor,
        updateRoleWeight,
        headerSliderProps,
        confirmPresetChange,
        get appMode() {
            return appMode;
        },
        get appModeBinding() {
            return appModeBinding;
        },
        get generatedCss() {
            return generatedCss;
        },
        get generatedJson() {
            return generatedJson;
        }
    };
}
export type ThemeEditor = ReturnType<typeof createThemeEditor>;
