import { parseCssVar } from './css-variable';

export type ParsedCssColor = {
    hex: string;
    alpha: number;
};

export function formatCssColor(hex: string, alpha: number): string {
    const normalized = hex.toLowerCase();
    if (alpha >= 0.995) {
        return normalized;
    }

    const rgb = hexToRgb(normalized);
    if (!rgb) {
        return normalized;
    }

    const [red, green, blue] = rgb;
    const roundedAlpha = Math.round(Math.max(0, Math.min(1, alpha)) * 100) / 100;
    return `rgb(${red} ${green} ${blue} / ${roundedAlpha})`;
}

export function parseCssColor(
    value: string,
    resolveVar: (name: string) => string
): ParsedCssColor | null {
    return parseCssColorValue(value, resolveVar, new Set());
}

function parseCssColorValue(
    value: string,
    resolveVar: (name: string) => string,
    seen: Set<string>
): ParsedCssColor | null {
    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }

    const named = namedColor(trimmed);
    if (named) {
        return named;
    }

    const cssVar = parseCssVar(trimmed);
    if (cssVar) {
        if (seen.has(cssVar.name)) {
            return cssVar.fallback ? parseCssColorValue(cssVar.fallback, resolveVar, seen) : null;
        }

        seen = new Set(seen).add(cssVar.name);
        const resolved = resolveVar(cssVar.name).trim();
        if (resolved) {
            return parseCssColorValue(resolved, resolveVar, seen);
        }

        if (cssVar.fallback) {
            return parseCssColorValue(cssVar.fallback, resolveVar, seen);
        }

        return null;
    }

    if (trimmed.toLowerCase().startsWith('color-mix(')) {
        return parseColorMix(trimmed, resolveVar, seen);
    }

    const hex = parseHex(trimmed);
    if (hex) {
        return {
            hex,
            alpha: 1
        };
    }

    const rgb = parseRgb(trimmed);
    if (rgb) {
        return rgb;
    }

    return parseHsl(trimmed);
}

function parseColorMix(
    value: string,
    resolveVar: (name: string) => string,
    seen: Set<string>
): ParsedCssColor | null {
    const match = value
        .trim()
        .match(/^color-mix\(\s*in\s+srgb\s*,\s*(.+)\s+([0-9.]+)%\s*,\s*(.+)\s*\)$/i);
    if (!match?.[1] || !match[2] || !match[3]) {
        return null;
    }

    const amount = Number(match[2]) / 100;
    if (!Number.isFinite(amount)) {
        return null;
    }

    const first = parseCssColorValue(match[1], resolveVar, seen);
    if (!first) {
        return null;
    }

    const secondName = match[3].trim().toLowerCase();
    if (secondName === 'transparent') {
        return {
            hex: first.hex,
            alpha: first.alpha * amount
        };
    }

    const second = parseCssColorValue(match[3], resolveVar, seen);
    if (!second) {
        return null;
    }

    return {
        hex: mixHex(first.hex, second.hex, amount),
        alpha: first.alpha * amount + second.alpha * (1 - amount)
    };
}

function namedColor(value: string): ParsedCssColor | null {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'white') {
        return {
            hex: '#ffffff',
            alpha: 1
        };
    }

    if (normalized === 'black') {
        return {
            hex: '#000000',
            alpha: 1
        };
    }

    if (normalized === 'transparent') {
        return {
            hex: '#000000',
            alpha: 0
        };
    }

    return null;
}

function parseHex(value: string): string | null {
    const normalized = value.trim().toLowerCase();
    if (/^#[0-9a-f]{6}$/.test(normalized)) {
        return normalized;
    }

    if (/^#[0-9a-f]{3}$/.test(normalized)) {
        return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
    }

    return null;
}

function parseRgb(value: string): ParsedCssColor | null {
    const match = value
        .trim()
        .match(
            /^rgba?\(\s*([0-9.]+%?)[\s,]+([0-9.]+%?)[\s,]+([0-9.]+%?)(?:\s*[,/]\s*([0-9.]+%?))?\s*\)$/i
        );
    if (!match?.[1] || !match[2] || !match[3]) {
        return null;
    }

    const red = parseRgbChannel(match[1]);
    const green = parseRgbChannel(match[2]);
    const blue = parseRgbChannel(match[3]);
    if (red === null || green === null || blue === null) {
        return null;
    }

    return {
        hex: rgbToHex(red, green, blue),
        alpha: parseAlpha(match[4])
    };
}

function parseHsl(value: string): ParsedCssColor | null {
    const match = value
        .trim()
        .match(
            /^hsla?\(\s*([0-9.]+)(?:deg)?[\s,]+([0-9.]+)%[\s,]+([0-9.]+)%(?:\s*[,/]\s*([0-9.]+%?))?\s*\)$/i
        );
    if (!match?.[1] || !match[2] || !match[3]) {
        return null;
    }

    const hue = ((Number(match[1]) % 360) + 360) % 360;
    const sat = Number(match[2]);
    const light = Number(match[3]);
    if (!Number.isFinite(hue) || !Number.isFinite(sat) || !Number.isFinite(light)) {
        return null;
    }

    return {
        hex: hslToHex(hue, sat, light),
        alpha: parseAlpha(match[4])
    };
}

function parseRgbChannel(value: string): number | null {
    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed)) {
        return null;
    }

    if (value.trim().endsWith('%')) {
        return Math.round((parsed / 100) * 255);
    }

    return parsed;
}

function parseAlpha(value: string | undefined): number {
    if (value === undefined) {
        return 1;
    }

    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed)) {
        return 1;
    }

    if (value.trim().endsWith('%')) {
        return Math.max(0, Math.min(1, parsed / 100));
    }

    return Math.max(0, Math.min(1, parsed));
}

function hexToRgb(hex: string): [number, number, number] | null {
    const normalized = hex.replace('#', '');
    if (normalized.length !== 6) {
        return null;
    }

    return [
        Number.parseInt(normalized.slice(0, 2), 16),
        Number.parseInt(normalized.slice(2, 4), 16),
        Number.parseInt(normalized.slice(4, 6), 16)
    ];
}

function rgbToHex(red: number, green: number, blue: number): string {
    const toHex = (channel: number) =>
        Math.round(Math.max(0, Math.min(255, channel)))
            .toString(16)
            .padStart(2, '0');

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function mixHex(left: string, right: string, amountLeft: number): string {
    const leftRgb = hexToRgb(left);
    const rightRgb = hexToRgb(right);
    if (!leftRgb || !rightRgb) {
        return left;
    }

    const amountRight = 1 - amountLeft;
    return rgbToHex(
        leftRgb[0] * amountLeft + rightRgb[0] * amountRight,
        leftRgb[1] * amountLeft + rightRgb[1] * amountRight,
        leftRgb[2] * amountLeft + rightRgb[2] * amountRight
    );
}

function hslToHex(hue: number, sat: number, light: number): string {
    const s = sat / 100;
    const l = light / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    if (hue < 60) {
        r = c;
        g = x;
    } else if (hue < 120) {
        r = x;
        g = c;
    } else if (hue < 180) {
        g = c;
        b = x;
    } else if (hue < 240) {
        g = x;
        b = c;
    } else if (hue < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}
