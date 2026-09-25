import { DEFAULT_THEME, type Theme } from '@mielui/svelte/themes/theme';
import {
    type AdvancedTokens,
    type BrandColors,
    DEFAULT_FOUNDATION_COLORS,
    DEFAULT_ROLE_WEIGHTS,
    emptyAdvancedTokens,
    type FontWeight,
    type FoundationColors,
    type InteractiveCursor,
    type RoleWeights
} from './config';

export function createThemeEditorState() {
    const state = $state({
        theme: {
            ...DEFAULT_THEME,
            slug: 'midnight-ledger',
            name: 'Midnight Ledger'
        } as Theme,
        baseTheme: { ...DEFAULT_THEME } as Theme,
        selectedPreset: DEFAULT_THEME.slug,
        previousPreset: DEFAULT_THEME.slug,
        previousRadius: DEFAULT_THEME.radius as Theme['radius'],
        previousDensity: DEFAULT_THEME.density as Theme['density'],
        previousMotion: DEFAULT_THEME.motion as Theme['motion'],
        selectedSans: 'inter',
        previousSans: 'inter',
        selectedHeader: 'same-as-sans',
        previousHeader: 'same-as-sans',
        selectedMono: 'jetbrains-mono',
        previousMono: 'jetbrains-mono',
        headerSize: 16,
        headerWeight: '600' as FontWeight,
        roleWeights: { ...DEFAULT_ROLE_WEIGHTS } as RoleWeights,
        foundationColors: {
            light: { ...DEFAULT_FOUNDATION_COLORS.light },
            dark: { ...DEFAULT_FOUNDATION_COLORS.dark }
        } as FoundationColors,
        advancedTokens: emptyAdvancedTokens() as AdvancedTokens,
        brandColors: {
            light: DEFAULT_THEME.brand,
            dark: DEFAULT_THEME.brand
        } as BrandColors,
        borders: 'double' as NonNullable<NonNullable<Theme['chrome']>['borders']>,
        insetPosition: 'bottom' as 'top' | 'bottom',
        edgeHighlight: 0.5,
        rememberedEdgeHighlight: 0.5,
        surfaceShadows: true,
        controlShadows: true,
        dialogShadows: true,
        glassSurfaces: false,
        travelingHighlight: true,
        primaryStroke: false,
        interactiveCursor: 'default' as InteractiveCursor,
        colorsModalOpen: false,
        spacingModalOpen: false,
        animationModalOpen: false,
        pendingPreset: null as string | null,
        presetDialogOpen: false,
        copiedKey: null as 'css' | 'json' | null,
        hydrated: false,
        appliedDark: false,
        setupOpen: false
    });
    return state;
}

export type ThemeEditorState = ReturnType<typeof createThemeEditorState>;
