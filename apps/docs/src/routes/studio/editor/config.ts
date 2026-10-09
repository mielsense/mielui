import {
    DEFAULT_THEME,
    densities,
    motionFeels,
    radiusScales,
    type Theme
} from '@mielui/svelte/themes/theme';
import { fonts } from '$lib/fonts.svelte';
import type {
    AnimationTokenName,
    ColorTokenName,
    SpacingTokenName
} from '$lib/studio-advanced-tokens';

export type FoundationPalette = {
    base: string;
    border: string;
    background: string;
    secondary: string;
    foreground: string;
    foregroundMuted: string;
    onPrimary: string;
    buttonForeground: string;
};

export type FoundationColors = {
    light: FoundationPalette;
    dark: FoundationPalette;
};

export type BrandColors = {
    light: string;
    dark: string;
};

export type InteractiveCursor = 'default' | 'pointer';

export type StudioExtensions = {
    presetSlug: string;
    headerSize: number;
    headerWeight: FontWeight;
    roleWeights: RoleWeights;
    brandColors: BrandColors;
    foundationColors: FoundationColors;
    advancedTokens: AdvancedTokens;
    borders: 'double' | 'single';
    insetPosition: 'top' | 'bottom';
    edgeHighlight: number;
    surfaceShadows: boolean;
    controlShadows: boolean;
    dialogShadows: boolean;
    travelingHighlight: boolean;
    glassSurfaces?: boolean;
    primaryStroke: boolean;
    interactiveCursor: InteractiveCursor;
};

export type FontWeight = '400' | '500' | '600' | '700';

export type RoleWeights = {
    body: FontWeight;
    label: FontWeight;
    button: FontWeight;
    badge: FontWeight;
    description: FontWeight;
};

export const STUDIO_EXTENSIONS_KEY = 'mielui-studio-extensions-v1';

/**
 * The default theme's colors, as `ui.css` resolves them. The border is the opaque
 * equivalent of the stylesheet's translucent ink mix on a card.
 */
export const DEFAULT_FOUNDATION_COLORS: FoundationColors = {
    light: {
        base: '#ffffff',
        border: '#e5e5e5',
        background: '#f6f6f6',
        secondary: '#e9e9e9',
        foreground: '#292929',
        foregroundMuted: '#6d6d6d',
        onPrimary: '#21151e',
        buttonForeground: '#292929'
    },
    dark: {
        base: '#131313',
        border: '#2d2d2d',
        background: '#1a1a1a',
        secondary: '#262626',
        foreground: '#ededed',
        foregroundMuted: '#969696',
        onPrimary: '#21151e',
        buttonForeground: '#ededed'
    }
};

/**
 * Defaults the Studio used in earlier versions, oldest first. A saved draft that still
 * holds one of these values never chose it, so restoring a draft replaces it with the
 * current default.
 */
export const LEGACY_FOUNDATION_COLORS: FoundationColors[] = [
    {
        light: {
            base: '#ffffff',
            border: '#e8e8e6',
            background: '#fdfdfc',
            secondary: '#efefee',
            foreground: '#1c1c1b',
            foregroundMuted: '#737373',
            onPrimary: '#ffffff',
            buttonForeground: '#1c1c1b'
        },
        dark: {
            base: '#171717',
            border: '#2a2a2a',
            background: '#0a0a0a',
            secondary: '#252525',
            foreground: '#ededed',
            foregroundMuted: '#a3a3a3',
            onPrimary: '#ffffff',
            buttonForeground: '#ededed'
        }
    },
    {
        light: {
            base: '#ffffff',
            border: '#e8e8e6',
            background: '#fdfdfd',
            secondary: '#f0f0ee',
            foreground: '#1c1c19',
            foregroundMuted: '#6d6d67',
            onPrimary: '#ffffff',
            buttonForeground: '#1c1c19'
        },
        dark: {
            base: '#171717',
            border: '#2a2a2a',
            background: '#0a0a0a',
            secondary: '#252525',
            foreground: '#ededed',
            foregroundMuted: '#a6a6a6',
            onPrimary: '#21151e',
            buttonForeground: '#ededed'
        }
    },
    {
        light: {
            base: '#ffffff',
            border: '#e5e5e5',
            background: '#f6f6f6',
            secondary: '#e9e9e9',
            foreground: '#292929',
            foregroundMuted: '#6d6d6d',
            onPrimary: '#21151e',
            buttonForeground: '#292929'
        },
        dark: {
            base: '#1a1a1a',
            border: '#353535',
            background: '#121212',
            secondary: '#272727',
            foreground: '#ededed',
            foregroundMuted: '#969696',
            onPrimary: '#21151e',
            buttonForeground: '#ededed'
        }
    },
    {
        light: {
            base: '#ffffff',
            border: '#e5e5e5',
            background: '#f6f6f6',
            secondary: '#e9e9e9',
            foreground: '#292929',
            foregroundMuted: '#6d6d6d',
            onPrimary: '#21151e',
            buttonForeground: '#292929'
        },
        dark: {
            base: '#0e0e0e',
            border: '#2d2d2d',
            background: '#161616',
            secondary: '#232323',
            foreground: '#ededed',
            foregroundMuted: '#969696',
            onPrimary: '#21151e',
            buttonForeground: '#ededed'
        }
    }
];

export const DEFAULT_ROLE_WEIGHTS: RoleWeights = {
    body: '400',
    label: '500',
    button: '500',
    badge: '500',
    description: '400'
};

export const fontWeights = ['400', '500', '600', '700'] as const;

export const cursorChoices = ['default', 'pointer'] as const;

export const brandSwatches = [
    { label: 'Mielui', value: DEFAULT_THEME.brand },
    { label: 'Graphite', value: '#4d607f' },
    { label: 'Grove', value: '#2f7a54' },
    { label: 'Linen', value: '#a44a2f' },
    { label: 'Violet', value: '#7457d9' }
];

export const baseSwatches = [
    { label: 'White', value: '#ffffff' },
    { label: 'Porcelain', value: '#fafaf9' },
    { label: 'Graphite', value: '#202020' },
    { label: 'Ink', value: '#131313' }
];

export const borderSwatches = [
    { label: 'Mist', value: '#e5e5e5' },
    { label: 'Silver', value: '#d4d4d2' },
    { label: 'Graphite', value: '#454545' },
    { label: 'Charcoal', value: '#2d2d2d' }
];

export const backgroundSwatches = [
    { label: 'Stage', value: '#f6f6f6' },
    { label: 'Paper', value: '#fdfdfd' },
    { label: 'Slate', value: '#111318' },
    { label: 'Night', value: '#1a1a1a' }
];

export const secondarySwatches = [
    { label: 'Soft', value: '#e9e9e9' },
    { label: 'Stone', value: '#e7e5e4' },
    { label: 'Smoke', value: '#303030' },
    { label: 'Carbon', value: '#262626' }
];

export const foregroundSwatches = [
    { label: 'Ink', value: '#292929' },
    { label: 'Charcoal', value: '#3a3a3a' },
    { label: 'Pewter', value: '#6d6d6d' },
    { label: 'Mist', value: '#969696' },
    { label: 'Snow', value: '#ededed' }
];

export const onPrimarySwatches = [
    { label: 'Plum', value: '#21151e' },
    { label: 'White', value: '#ffffff' },
    { label: 'Porcelain', value: '#fafaf9' },
    { label: 'Ink', value: '#1c1c1b' },
    { label: 'Night', value: '#0a0a0a' }
];

export type AdvancedTokens = {
    colors: Record<'light' | 'dark', Partial<Record<ColorTokenName, string>>>;
    spacing: Partial<Record<SpacingTokenName, string>>;
    animation: Partial<Record<AnimationTokenName, string>>;
};

function toFontOption(font: (typeof fonts)[number]) {
    return {
        key: font.name.toLowerCase().replaceAll(' ', '-'),
        label: font.name,
        value: font.family
    };
}

export const sansFonts = fonts.filter((font) => font.category === 'Sans serif').map(toFontOption);

export const serifFonts = fonts.filter((font) => font.category === 'Serif').map(toFontOption);

export const monoFonts = fonts.filter((font) => font.category === 'Monospace').map(toFontOption);

export const headerFonts = [
    { key: 'same-as-sans', label: 'Same as sans', value: 'var(--font-sans)' },
    ...serifFonts,
    ...sansFonts
];

export const themeAxes = [
    'brand',
    'neutral',
    'radius',
    'density',
    'motion',
    'fontSans',
    'fontMono',
    'fontHeader'
] as const;

export const radiusTokenNames = [
    '--radius-sm',
    '--radius-md',
    '--radius-lg',
    '--radius-xl'
] as const;

export const movementPresets = ['subtle', 'default', 'expressive'] as const;

export const motionDurationTokenNames: AnimationTokenName[] = [
    '--motion-duration-hover',
    '--motion-duration-menu',
    '--motion-duration-panel',
    '--motion-duration-sheet',
    '--motion-duration-sheet-out',
    '--motion-duration-overlay',
    '--motion-duration-toast-in',
    '--motion-duration-toast-out'
];

export function brandTokens(color: string) {
    return {
        '--color-primary': color,
        '--color-primary-hover': `color-mix(in srgb, ${color} 78%, black)`,
        '--color-ring': `color-mix(in srgb, ${color} 80%, transparent)`
    };
}

export function cleanTokens(overrides: Partial<Record<string, string>>): Record<string, string> {
    return Object.fromEntries(
        Object.entries(overrides).filter((entry): entry is [string, string] =>
            Boolean(entry[1]?.trim())
        )
    );
}

export function emptyAdvancedTokens(): AdvancedTokens {
    return {
        colors: { light: {}, dark: {} },
        spacing: {},
        animation: {}
    };
}

export function countTokenOverrides<T extends string>(overrides: Partial<Record<T, string>>) {
    return (Object.values(overrides) as (string | undefined)[]).filter((value) => value?.trim())
        .length;
}

export function formatChoice(value: string) {
    if (value === 'comfortable') {
        return 'Comfy';
    }
    if (value === 'expressive') {
        return 'Bold';
    }
    if (value === 'true') {
        return 'True';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function isRadiusScale(value: string): value is Theme['radius'] {
    return (radiusScales as readonly string[]).includes(value);
}

export function isDensity(value: string): value is Theme['density'] {
    return (densities as readonly string[]).includes(value);
}

export function isMotionFeel(value: string): value is Theme['motion'] {
    return (motionFeels as readonly string[]).includes(value);
}

export function findSansKey(value: string) {
    return sansFonts.find((font) => font.value === value)?.key ?? 'inter';
}

export function findMonoKey(value: string) {
    return monoFonts.find((font) => font.value === value)?.key ?? 'jetbrains-mono';
}

export function findHeaderKey(value: string) {
    return headerFonts.find((font) => font.value === value)?.key ?? 'same-as-sans';
}
