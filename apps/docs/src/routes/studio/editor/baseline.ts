import type { Theme } from '@mielui/svelte/themes/theme';
import { readThemeAppearance } from './appearance';
import {
    DEFAULT_FOUNDATION_COLORS,
    DEFAULT_ROLE_WEIGHTS,
    findHeaderKey,
    findMonoKey,
    findSansKey
} from './config';
import { DEFAULT_HEADER_SIZE, DEFAULT_HEADER_WEIGHT } from './defaults';

/** Values of a preset, which each setting starts from and resets to. */
export function readThemeBaseline(base: Theme) {
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
        headerSize: base.typography?.headerSize ?? DEFAULT_HEADER_SIZE,
        headerWeight: base.typography?.headerWeight ?? DEFAULT_HEADER_WEIGHT,
        roleWeights: { ...DEFAULT_ROLE_WEIGHTS, ...base.typography?.roleWeights },
        sans: findSansKey(base.fontSans),
        header: findHeaderKey(base.fontHeader),
        mono: findMonoKey(base.fontMono)
    };
}

export type ThemeBaseline = ReturnType<typeof readThemeBaseline>;
