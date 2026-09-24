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

export const DEFAULT_FOUNDATION_COLORS: FoundationColors = {
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
};

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
    { label: 'Ink', value: '#171717' }
];

export const borderSwatches = [
    { label: 'Mist', value: '#e8e8e6' },
    { label: 'Silver', value: '#d4d4d2' },
    { label: 'Graphite', value: '#3a3a3a' },
    { label: 'Charcoal', value: '#2a2a2a' }
];

export const backgroundSwatches = [
    { label: 'Canvas', value: '#fdfdfc' },
    { label: 'Cloud', value: '#f7f7f5' },
    { label: 'Slate', value: '#111318' },
    { label: 'Night', value: '#0a0a0a' }
];

export const secondarySwatches = [
    { label: 'Soft', value: '#efefee' },
    { label: 'Stone', value: '#e7e5e4' },
    { label: 'Smoke', value: '#303030' },
    { label: 'Carbon', value: '#252525' }
];

export const foregroundSwatches = [
    { label: 'Ink', value: '#1c1c1b' },
    { label: 'Charcoal', value: '#3a3a3a' },
    { label: 'Mist', value: '#a3a3a3' },
    { label: 'Snow', value: '#ededed' }
];

export const onPrimarySwatches = [
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

export function toFontOption(font: (typeof fonts)[number]) {
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
        '--color-ring': `color-mix(in srgb, ${color} 30%, transparent)`
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
