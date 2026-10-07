import { toast } from '@mielui/svelte/components/toast';
import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
import { applyLiveThemeCss, loadStudioTheme, saveStudioTheme } from '@mielui/svelte/themes/live';
import { parseTheme, type Theme, themeToCss } from '@mielui/svelte/themes/theme';
import { mode, setMode } from 'mode-watcher';
import { onDestroy, onMount, untrack } from 'svelte';
import { readThemeAppearance } from './appearance';
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
import { createThemeHistory } from './history.svelte';
import { createThemeEditorStorage } from './persistence';
import { readSharedTheme, themeShareLink } from './share';
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

    /** Values of the selected preset, which each setting resets to. */
    const baseline = $derived.by(() => {
        const base = state.baseTheme;

        return {
            appearance: readThemeAppearance(base),
            brand: {
                light: base.tokens?.light?.['--color-primary'] ?? base.brand,
                dark: base.tokens?.dark?.['--color-primary'] ?? base.brand
            },
            foundation: {
                light: { ...DEFAULT_FOUNDATION_COLORS.light, ...base.foundation?.light },
                dark: { ...DEFAULT_FOUNDATION_COLORS.dark, ...base.foundation?.dark }
            },
            radius: base.radius,
            density: base.density,
            motion: base.motion,
            headerSize: base.typography?.headerSize ?? 16,
            headerWeight: base.typography?.headerWeight ?? '600',
            roleWeights: { ...DEFAULT_ROLE_WEIGHTS, ...base.typography?.roleWeights },
            sans: findSansKey(base.fontSans),
            header: findHeaderKey(base.fontHeader),
            mono: findMonoKey(base.fontMono)
        };
    });

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
                    value !==
                    (state.baseTheme.foundation?.[colorMode]?.[key as keyof FoundationPalette] ??
                        DEFAULT_FOUNDATION_COLORS[colorMode][key as keyof FoundationPalette])
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
            ([key, value]) =>
                value !==
                (state.baseTheme.typography?.roleWeights?.[key as keyof RoleWeights] ??
                    DEFAULT_ROLE_WEIGHTS[key as keyof RoleWeights])
        ).length
    );

    const baseAppearance = $derived(readThemeAppearance(state.baseTheme));

    const changedAxisCount = $derived(
        themeAxes.filter((axis) => state.theme[axis] !== state.baseTheme[axis]).length +
            (state.brandColors.light !==
                (state.baseTheme.tokens?.light?.['--color-primary'] ?? state.baseTheme.brand) ||
            state.brandColors.dark !==
                (state.baseTheme.tokens?.dark?.['--color-primary'] ?? state.baseTheme.brand)
                ? 1
                : 0) +
            foundationColorChanges +
            advancedTokenChanges +
            (state.headerSize === (state.baseTheme.typography?.headerSize ?? 16) ? 0 : 1) +
            (state.headerWeight === (state.baseTheme.typography?.headerWeight ?? '600') ? 0 : 1) +
            roleWeightChanges +
            (state.borders === baseAppearance.borders ? 0 : 1) +
            (state.insetPosition === baseAppearance.insetPosition ? 0 : 1) +
            (state.edgeHighlight === baseAppearance.edgeHighlight ? 0 : 1) +
            (state.surfaceShadows === baseAppearance.surfaceShadows ? 0 : 1) +
            (state.controlShadows === baseAppearance.controlShadows ? 0 : 1) +
            (state.dialogShadows === baseAppearance.dialogShadows ? 0 : 1) +
            (state.travelingHighlight === baseAppearance.travelingHighlight ? 0 : 1) +
            (state.primaryStroke === baseAppearance.primaryStroke ? 0 : 1) +
            (state.glassSurfaces === baseAppearance.glassSurfaces ? 0 : 1) +
            (state.interactiveCursor === baseAppearance.interactiveCursor ? 0 : 1)
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
                ...state.baseTheme.tokens?.shared,
                ...cleanTokens(state.advancedTokens.spacing),
                ...cleanTokens(state.advancedTokens.animation),
                '--mielui-inset-position': state.insetPosition,
                '--mielui-surface': state.glassSurfaces ? 'glass' : 'solid'
            },
            light: {
                ...state.baseTheme.tokens?.light,
                '--color-primary': state.brandColors.light,
                ...(state.brandColors.light !==
                (state.baseTheme.tokens?.light?.['--color-primary'] ?? state.baseTheme.brand)
                    ? brandTokens(state.brandColors.light)
                    : {}),
                ...cleanTokens(state.advancedTokens.colors.light)
            },
            dark: {
                ...state.baseTheme.tokens?.dark,
                '--color-primary': state.brandColors.dark,
                ...(state.brandColors.dark !==
                (state.baseTheme.tokens?.dark?.['--color-primary'] ?? state.baseTheme.brand)
                    ? brandTokens(state.brandColors.dark)
                    : {}),
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

        applyTheme(preset);
    }

    function applyTheme(preset: Theme) {
        const draftIdentity = {
            slug: `${preset.slug}-custom`,
            name: preset.name,
            description: preset.description
        };
        state.baseTheme = { ...preset };
        state.theme = { ...preset, ...draftIdentity };
        state.headerSize = preset.typography?.headerSize ?? 16;
        state.headerWeight = preset.typography?.headerWeight ?? '600';
        state.roleWeights = { ...DEFAULT_ROLE_WEIGHTS, ...preset.typography?.roleWeights };
        state.foundationColors = {
            light: { ...DEFAULT_FOUNDATION_COLORS.light, ...preset.foundation?.light },
            dark: { ...DEFAULT_FOUNDATION_COLORS.dark, ...preset.foundation?.dark }
        };
        state.advancedTokens = emptyAdvancedTokens();
        state.brandColors = {
            light: preset.tokens?.light?.['--color-primary'] ?? preset.brand,
            dark: preset.tokens?.dark?.['--color-primary'] ?? preset.brand
        };
        Object.assign(state, readThemeAppearance(preset));
        state.rememberedEdgeHighlight = state.edgeHighlight || 0.5;
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
            Object.assign(state, readThemeAppearance(storedTheme));
            state.rememberedEdgeHighlight = state.edgeHighlight || 0.5;
            syncFontSelections(state.theme);
        }
        storage.load();
        if (state.theme.slug === 'midnight-ledger') {
            const preset = builtInThemePresets.find((entry) => entry.slug === state.selectedPreset);
            state.theme = {
                ...state.theme,
                slug: `${preset?.slug ?? 'default'}-custom`,
                name: preset?.name ?? 'Default'
            };
        }
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
        untrack(() => {
            state.appliedRevision += 1;
        });
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

    let sharedTheme = $state<Theme | null>(null);
    let shareLink = $state('');

    onMount(() => {
        const hash = window.location.hash;
        if (!hash.startsWith('#theme=')) {
            return;
        }
        window.history.replaceState(
            window.history.state,
            '',
            window.location.pathname + window.location.search
        );
        void readSharedTheme(hash)
            .then((json) => {
                sharedTheme = json ? parseTheme(JSON.parse(json)) : null;
            })
            .catch(() => {
                toast.error('That theme link could not be read');
            });
    });

    $effect(() => {
        const json = generatedJson;
        let current = true;
        void themeShareLink(json, window.location.origin)
            .then((link) => {
                if (current) {
                    shareLink = link;
                }
            })
            .catch(() => {
                shareLink = '';
            });

        return () => {
            current = false;
        };
    });

    const history = createThemeHistory(state);

    function acceptSharedTheme() {
        if (!sharedTheme) {
            return;
        }
        const theme = sharedTheme;
        sharedTheme = null;
        applyTheme(theme);
        toast.success('Shared theme loaded');
    }

    function dismissSharedTheme() {
        sharedTheme = null;
    }
    return {
        state,
        tokens,
        history,
        acknowledgeCopy,
        setEdgeHighlightEnabled,
        resetTheme,
        updateBrand,
        updateFoundationColor,
        updateRoleWeight,
        confirmPresetChange,
        acceptSharedTheme,
        dismissSharedTheme,
        get baseline() {
            return baseline;
        },
        get sharedTheme() {
            return sharedTheme;
        },
        get shareLink() {
            return shareLink;
        },
        get appMode() {
            return appMode;
        },
        get appModeBinding() {
            return appModeBinding;
        },
        get changes() {
            return changedAxisCount;
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
