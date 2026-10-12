import type { ThemeBaseline } from './baseline';
import {
    countTokenOverrides,
    DEFAULT_FOUNDATION_COLORS,
    DEFAULT_ROLE_WEIGHTS,
    type FoundationPalette,
    type RoleWeights,
    themeAxes
} from './config';
import type { ThemeEditorState } from './state.svelte';

const colorModes = ['light', 'dark'] as const;

const appearanceKeys = [
    'borders',
    'insetPosition',
    'edgeHighlight',
    'surfaceShadows',
    'controlShadows',
    'dialogShadows',
    'travelingHighlight',
    'primaryStroke',
    'glassSurfaces',
    'interactiveCursor'
] as const;

/** Counts how many settings of the draft differ from the selected preset. */
export function createThemeChanges(state: ThemeEditorState, getBaseline: () => ThemeBaseline) {
    const axisChanges = $derived(
        themeAxes.filter((axis) => {
            return axis !== 'brand' && state.theme[axis] !== state.baseTheme[axis];
        }).length
    );

    const foundationColorChanges = $derived(
        colorModes.reduce((count, colorMode) => {
            const changedColors = Object.entries(state.foundationColors[colorMode]).filter(
                ([key, value]) => {
                    const name = key as keyof FoundationPalette;
                    const base =
                        state.baseTheme.foundation?.[colorMode]?.[name] ??
                        DEFAULT_FOUNDATION_COLORS[colorMode][name];

                    return value !== base;
                }
            ).length;

            return count + changedColors;
        }, 0)
    );

    const advancedTokenChanges = $derived(
        countTokenOverrides(state.advancedTokens.colors.light) +
            countTokenOverrides(state.advancedTokens.colors.dark) +
            countTokenOverrides(state.advancedTokens.spacing) +
            countTokenOverrides(state.advancedTokens.animation)
    );

    const roleWeightChanges = $derived(
        Object.entries(state.roleWeights).filter(([key, value]) => {
            const role = key as keyof RoleWeights;
            const base =
                state.baseTheme.typography?.roleWeights?.[role] ?? DEFAULT_ROLE_WEIGHTS[role];

            return value !== base;
        }).length
    );

    const settingChanges = $derived.by(() => {
        const baseline = getBaseline();
        const brandChanged =
            state.brandColors.light !== baseline.brand.light ||
            state.brandColors.dark !== baseline.brand.dark;
        const changed = [
            brandChanged,
            state.headerSize !== baseline.headerSize,
            state.headerWeight !== baseline.headerWeight,
            ...appearanceKeys.map((key) => state[key] !== baseline.appearance[key])
        ];

        return changed.filter(Boolean).length;
    });

    const count = $derived(
        axisChanges +
            foundationColorChanges +
            advancedTokenChanges +
            roleWeightChanges +
            settingChanges
    );

    const dirty = $derived(count > 0);

    return {
        get count() {
            return count;
        },
        get dirty() {
            return dirty;
        }
    };
}
