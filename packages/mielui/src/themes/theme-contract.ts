export const THEME_VERSION = 4 as const;

/** Versions accepted by parseTheme. Older theme payloads keep working. */
export const SUPPORTED_THEME_VERSIONS = [2, 3, 4] as const;

export type SupportedThemeVersion = (typeof SUPPORTED_THEME_VERSIONS)[number];

export const neutralTemperatures = ['cool', 'true', 'warm'] as const;
export const radiusScales = ['sharp', 'default', 'rounded'] as const;
export const densities = ['compact', 'default', 'comfortable'] as const;
export const motionFeels = ['none', 'subtle', 'default', 'expressive'] as const;
export const themeFontWeights = ['400', '500', '600', '700'] as const;
export const interactiveCursors = ['default', 'pointer'] as const;

export type NeutralTemp = (typeof neutralTemperatures)[number];
export type RadiusScale = (typeof radiusScales)[number];
export type Density = (typeof densities)[number];
export type MotionFeel = (typeof motionFeels)[number];
export type ThemeFontWeight = (typeof themeFontWeights)[number];
export type InteractiveCursor = (typeof interactiveCursors)[number];

export type ThemeFoundationPalette = {
    base?: string;
    border?: string;
    background?: string;
    secondary?: string;
    foreground?: string;
    foregroundMuted?: string;
    onPrimary?: string;
    buttonForeground?: string;
};

export type ThemeFoundation = {
    light?: ThemeFoundationPalette;
    dark?: ThemeFoundationPalette;
};

export type ThemeTokenOverrides = {
    light?: Record<string, string>;
    dark?: Record<string, string>;
    shared?: Record<string, string>;
};

export type ThemeRoleWeights = {
    body?: ThemeFontWeight;
    label?: ThemeFontWeight;
    button?: ThemeFontWeight;
    badge?: ThemeFontWeight;
    description?: ThemeFontWeight;
};

export type ThemeTypography = {
    headerSize?: number;
    headerWeight?: ThemeFontWeight;
    roleWeights?: ThemeRoleWeights;
};

export type ThemeChrome = {
    shadows?: boolean;
    /** Strength of light-catching inset edges, from 0 to 1. Defaults to 0.5. */
    edgeHighlight?: number;
    borders?: 'double' | 'single';
    /** Shadows on cards, floating menus, and other surfaces (`--elevation-1`, `--elevation-float`). */
    surfaceShadows?: boolean;
    /** Shadows on inputs, buttons, and similar controls (`--elevation-control`, `--elevation-button-outline`). */
    controlShadows?: boolean;
    /** Shadows on dialogs and sheets (`--elevation-modal`). */
    dialogShadows?: boolean;
    /** Keeps the item highlight but disables the slide between items. */
    travelingHighlight?: false;
    primaryStroke?: boolean;
    interactiveCursor?: InteractiveCursor;
};

/** The single, versioned public authoring contract for Mielui themes. */
export type Theme = {
    version: SupportedThemeVersion;
    slug: string;
    name: string;
    description: string;
    publisher?: string;
    /** Primary/accent color as a six-digit hex value. */
    brand: string;
    neutral: NeutralTemp;
    radius: RadiusScale;
    density: Density;
    motion: MotionFeel;
    /** CSS font-family values, including fallbacks when desired. */
    fontSans: string;
    fontMono: string;
    fontHeader: string;
    /** Optional per-mode surface colors. Mirrors the theme studio foundation section. */
    foundation?: ThemeFoundation;
    /** Optional raw token overrides keyed by CSS custom property name. */
    tokens?: ThemeTokenOverrides;
    /** Optional type-scale overrides. Mirrors the theme studio typography section. */
    typography?: ThemeTypography;
    /** Optional chrome flags. Mirrors the theme studio chrome section. */
    chrome?: ThemeChrome;
};

export type ThemeRecord = Theme & {
    id: string;
    createdAt: string;
    updatedAt: string;
};

/** Matches the public axes baked into ui.css exactly. */
export const DEFAULT_THEME: Theme = {
    version: THEME_VERSION,
    slug: 'default',
    name: 'Default',
    description: 'Mielui default — a calm, warm-neutral interface system.',
    publisher: 'mielui',
    brand: '#ba7ca5',
    neutral: 'warm',
    radius: 'default',
    density: 'default',
    motion: 'default',
    fontSans: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)'
};
