import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
import { applyLiveThemeCss, loadStudioTheme, saveStudioTheme } from '@mielui/svelte/themes/live';
import { type Theme, themeToCss } from '@mielui/svelte/themes/theme';
import { mode } from 'mode-watcher';
import { onMount, untrack } from 'svelte';
import { takeHandedOffTheme } from '$lib/studio/handoff';
import { readThemeAppearance } from './appearance';
import { readThemeBaseline, type ThemeBaseline } from './baseline';
import { createThemeChanges } from './changes.svelte';
import {
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
    sansFonts
} from './config';
import { DEFAULT_EDGE_HIGHLIGHT } from './defaults';
import { exportTheme } from './export-theme';
import { createThemeHistory } from './history.svelte';
import { createThemeEditorStorage } from './persistence';
import { createThemeShare } from './share.svelte';
import { createThemeEditorState } from './state.svelte';
import { createThemeTokenEditor } from './tokens';

export function createThemeEditor() {
    const state = createThemeEditorState();
    const storage = createThemeEditorStorage(state);

    const appMode = $derived(mode.current === 'dark' ? 'dark' : 'light');

    /** The surface the preview cards render with, following the glass setting. */
    const surface = $derived(state.glassSurfaces ? 'glass' : 'solid');

    /** Values of the selected preset, which each setting resets to. */
    const baseline = $derived(readThemeBaseline(state.baseTheme));

    const changes = createThemeChanges(state, () => baseline);

    const exportedTheme = $derived(exportTheme(state, baseline.brand));

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
        const presetValues = readThemeBaseline(preset);

        state.baseTheme = { ...preset };
        state.theme = { ...preset, ...draftIdentity };
        state.headerSize = presetValues.headerSize;
        state.headerWeight = presetValues.headerWeight;
        state.roleWeights = presetValues.roleWeights;
        state.foundationColors = presetValues.foundation;
        state.advancedTokens = emptyAdvancedTokens();
        state.brandColors = presetValues.brand;
        Object.assign(state, presetValues.appearance);
        state.rememberedEdgeHighlight = state.edgeHighlight || DEFAULT_EDGE_HIGHLIGHT;
        syncFontSelections(state.theme);
    }

    function resetTheme() {
        applyPreset(state.baseTheme.slug);
    }

    /** Whether an appearance setting differs from the preset, and how to put it back. */
    function appearanceReset(key: keyof ThemeBaseline['appearance']) {
        const base = baseline.appearance[key];

        return {
            changed: state[key] !== base,
            run: () => {
                Object.assign(state, { [key]: base });
            }
        };
    }

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
            state.rememberedEdgeHighlight = state.edgeHighlight || DEFAULT_EDGE_HIGHLIGHT;
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

        const handedOff = takeHandedOffTheme();
        if (handedOff) {
            if (builtInThemePresets.some((entry) => entry.slug === handedOff.slug)) {
                state.selectedPreset = handedOff.slug;
                state.previousPreset = handedOff.slug;
            }
            applyTheme(handedOff);
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

        return () => {
            observer.disconnect();
        };
    });

    $effect(() => {
        if (state.selectedPreset === state.previousPreset) {
            return;
        }
        const nextPreset = state.selectedPreset;
        if (changes.dirty) {
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

    const share = createThemeShare({
        json: () => generatedJson,
        apply: applyTheme
    });

    const history = createThemeHistory(state);

    return {
        state,
        tokens,
        history,
        setEdgeHighlightEnabled,
        appearanceReset,
        resetTheme,
        updateBrand,
        updateFoundationColor,
        updateRoleWeight,
        confirmPresetChange,
        acceptSharedTheme: share.accept,
        dismissSharedTheme: share.dismiss,
        get baseline() {
            return baseline;
        },
        get sharedTheme() {
            return share.sharedTheme;
        },
        get shareLink() {
            return share.link;
        },
        get appMode() {
            return appMode;
        },
        get surface() {
            return surface;
        },
        get changes() {
            return changes.count;
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
