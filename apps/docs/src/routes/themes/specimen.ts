import { DEFAULT_THEME, type Theme } from '@mielui/svelte/themes/theme';

const radii = {
    sharp: '4px',
    default: '12px',
    rounded: '999px'
};

/** The first family of a font stack, without quotes. */
export function fontName(family: string) {
    return family.split(',')[0].replaceAll(/['"]/g, '').trim();
}

/** The colors and corner radius a theme card previews, for the light or dark appearance. */
export function specimen(theme: Theme, dark: boolean) {
    const foundation = dark ? theme.foundation?.dark : theme.foundation?.light;
    const accent = (dark ? theme.tokens?.dark?.['--color-primary'] : undefined) ?? theme.brand;
    const defaultBrand = theme.brand.toLowerCase() === DEFAULT_THEME.brand;

    return {
        background: foundation?.background ?? (dark ? '#1a1a1a' : '#f6f6f6'),
        base: foundation?.base ?? (dark ? '#131313' : '#ffffff'),
        secondary: foundation?.secondary ?? (dark ? '#262626' : '#e9e9e9'),
        border: foundation?.border ?? (dark ? '#2d2d2d' : '#e0e0e0'),
        foreground: foundation?.foreground ?? (dark ? '#ededed' : '#292929'),
        onBrand: foundation?.onPrimary ?? (defaultBrand ? '#21151e' : '#ffffff'),
        accent,
        swatches: [
            accent,
            foundation?.base,
            foundation?.secondary,
            foundation?.border,
            foundation?.foreground
        ].filter((color): color is string => Boolean(color)),
        radius: radii[theme.radius] ?? '10px'
    };
}
