import {
    densities,
    interactiveCursors,
    motionFeels,
    neutralTemperatures,
    radiusScales,
    SUPPORTED_THEME_VERSIONS,
    type SupportedThemeVersion,
    THEME_VERSION,
    type Theme,
    type ThemeChrome,
    type ThemeFoundation,
    type ThemeFoundationPalette,
    type ThemeRoleWeights,
    type ThemeTypography,
    themeFontWeights
} from './theme-contract';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new TypeError(`Invalid theme: ${field} must be a non-empty string.`);
    }
    return value;
}

function enumValue<T extends string>(value: unknown, field: string, values: readonly T[]): T {
    if (typeof value !== 'string' || !values.includes(value as T)) {
        throw new TypeError(`Invalid theme: ${field} must be one of ${values.join(', ')}.`);
    }
    return value as T;
}

function cssValue(value: unknown, field: string): string {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new TypeError(`Invalid theme: ${field} must be a non-empty string.`);
    }
    const trimmed = value.trim();
    if (trimmed.length > 500 || /[{};]/.test(trimmed)) {
        throw new TypeError(`Invalid theme: ${field} must be a plain CSS value.`);
    }
    return trimmed;
}

function tokenName(value: string, field: string): string {
    if (!/^--[a-z0-9-]+$/.test(value)) {
        throw new TypeError(`Invalid theme: ${field} keys must look like --token-name.`);
    }
    return value;
}

function optionalTokenMap(value: unknown, field: string): Record<string, string> | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (!isRecord(value)) {
        throw new TypeError(`Invalid theme: ${field} must be an object.`);
    }
    const entries = Object.entries(value);
    if (entries.length === 0) {
        return undefined;
    }
    if (entries.length > 200) {
        throw new TypeError(`Invalid theme: ${field} must have at most 200 entries.`);
    }
    const map: Record<string, string> = {};
    for (const [name, raw] of entries) {
        tokenName(name, field);
        map[name] = cssValue(raw, `${field}.${name}`);
    }
    return map;
}

function optionalFoundation(value: unknown): ThemeFoundation | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (!isRecord(value)) {
        throw new TypeError('Invalid theme: foundation must be an object.');
    }
    const paletteKeys = [
        'base',
        'border',
        'background',
        'secondary',
        'foreground',
        'foregroundMuted',
        'onPrimary',
        'buttonForeground'
    ] as const;
    const parsePalette = (raw: unknown, field: string) => {
        if (raw === undefined) {
            return undefined;
        }
        if (!isRecord(raw)) {
            throw new TypeError(`Invalid theme: ${field} must be an object.`);
        }
        const palette: ThemeFoundationPalette = {};
        for (const key of paletteKeys) {
            const candidate = raw[key];
            if (candidate === undefined) {
                continue;
            }
            palette[key] = cssValue(candidate, `${field}.${key}`);
        }
        return Object.keys(palette).length > 0 ? palette : undefined;
    };
    const foundation: ThemeFoundation = {
        light: parsePalette(value.light, 'foundation.light'),
        dark: parsePalette(value.dark, 'foundation.dark')
    };
    if (!foundation.light && !foundation.dark) {
        return undefined;
    }
    return foundation;
}

function optionalTypography(value: unknown): ThemeTypography | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (!isRecord(value)) {
        throw new TypeError('Invalid theme: typography must be an object.');
    }
    const typography: ThemeTypography = {};
    if (value.headerSize !== undefined) {
        if (
            typeof value.headerSize !== 'number' ||
            !Number.isFinite(value.headerSize) ||
            value.headerSize < 10 ||
            value.headerSize > 32
        ) {
            throw new TypeError('Invalid theme: typography.headerSize must be 10-32.');
        }
        typography.headerSize = value.headerSize;
    }
    if (value.headerWeight !== undefined) {
        typography.headerWeight = enumValue(
            value.headerWeight,
            'typography.headerWeight',
            themeFontWeights
        );
    }
    if (value.roleWeights !== undefined) {
        if (!isRecord(value.roleWeights)) {
            throw new TypeError('Invalid theme: typography.roleWeights must be an object.');
        }
        const roles: ThemeRoleWeights = {};
        const roleKeys = ['body', 'label', 'button', 'badge', 'description'] as const;
        for (const role of roleKeys) {
            const candidate = value.roleWeights[role];
            if (candidate === undefined) {
                continue;
            }
            roles[role] = enumValue(candidate, `typography.roleWeights.${role}`, themeFontWeights);
        }
        if (Object.keys(roles).length > 0) {
            typography.roleWeights = roles;
        }
    }
    return Object.keys(typography).length > 0 ? typography : undefined;
}

function optionalChrome(value: unknown): ThemeChrome | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (!isRecord(value)) {
        throw new TypeError('Invalid theme: chrome must be an object.');
    }
    const chrome: ThemeChrome = {};
    if (value.borders !== undefined) {
        chrome.borders = enumValue(value.borders, 'chrome.borders', ['double', 'single'] as const);
    }
    if (value.edgeHighlight !== undefined) {
        if (
            typeof value.edgeHighlight !== 'number' ||
            !Number.isFinite(value.edgeHighlight) ||
            value.edgeHighlight < 0 ||
            value.edgeHighlight > 1
        ) {
            throw new TypeError(
                'Invalid theme: chrome.edgeHighlight must be a finite number from 0 to 1.'
            );
        }
        chrome.edgeHighlight = value.edgeHighlight;
    }
    if (value.shadows !== undefined) {
        if (typeof value.shadows !== 'boolean') {
            throw new TypeError('Invalid theme: chrome.shadows must be a boolean.');
        }
        chrome.shadows = value.shadows;
    }
    for (const key of ['surfaceShadows', 'controlShadows', 'dialogShadows'] as const) {
        if (value[key] !== undefined) {
            if (typeof value[key] !== 'boolean') {
                throw new TypeError(`Invalid theme: chrome.${key} must be a boolean.`);
            }
            chrome[key] = value[key];
        }
    }
    if (value.travelingHighlight !== undefined) {
        if (value.travelingHighlight !== false) {
            throw new TypeError(
                'Invalid theme: chrome.travelingHighlight only accepts false (the highlight is on by default).'
            );
        }
        chrome.travelingHighlight = false;
    }
    if (value.primaryStroke !== undefined) {
        if (typeof value.primaryStroke !== 'boolean') {
            throw new TypeError('Invalid theme: chrome.primaryStroke must be a boolean.');
        }
        chrome.primaryStroke = value.primaryStroke;
    }
    if (value.interactiveCursor !== undefined) {
        chrome.interactiveCursor = enumValue(
            value.interactiveCursor,
            'chrome.interactiveCursor',
            interactiveCursors
        );
    }
    return Object.keys(chrome).length > 0 ? chrome : undefined;
}

/** Validates untrusted registry/local-storage JSON and returns a normalized theme. */
export function parseTheme(value: unknown): Theme {
    if (!isRecord(value)) {
        throw new TypeError('Invalid theme: expected an object.');
    }
    if (
        typeof value.version !== 'number' ||
        !(SUPPORTED_THEME_VERSIONS as readonly number[]).includes(value.version)
    ) {
        throw new TypeError(
            `Invalid theme: version must be one of ${SUPPORTED_THEME_VERSIONS.join(', ')}.`
        );
    }
    const version = value.version as SupportedThemeVersion;

    const slug = requiredString(value.slug, 'slug');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new TypeError(
            'Invalid theme: slug must contain lowercase letters, numbers, or hyphens.'
        );
    }

    const brand = requiredString(value.brand, 'brand').toLowerCase();
    if (!/^#[0-9a-f]{6}$/.test(brand)) {
        throw new TypeError('Invalid theme: brand must be a six-digit hex color.');
    }

    const theme: Theme = {
        version,
        slug,
        name: requiredString(value.name, 'name'),
        description: typeof value.description === 'string' ? value.description : '',
        brand,
        neutral: enumValue(value.neutral, 'neutral', neutralTemperatures),
        radius: enumValue(value.radius, 'radius', radiusScales),
        density: enumValue(value.density, 'density', densities),
        motion: enumValue(value.motion, 'motion', motionFeels),
        fontSans: cssValue(value.fontSans, 'fontSans'),
        fontMono: cssValue(value.fontMono, 'fontMono'),
        fontHeader: cssValue(value.fontHeader, 'fontHeader')
    };
    if (typeof value.publisher === 'string' && value.publisher.trim()) {
        theme.publisher = value.publisher;
    }
    const foundation = optionalFoundation(value.foundation);
    if (foundation) {
        theme.foundation = foundation;
    }
    const tokens = isRecord(value.tokens)
        ? {
              light: optionalTokenMap(value.tokens.light, 'tokens.light'),
              dark: optionalTokenMap(value.tokens.dark, 'tokens.dark'),
              shared: optionalTokenMap(value.tokens.shared, 'tokens.shared')
          }
        : undefined;
    if (tokens && (tokens.light || tokens.dark || tokens.shared)) {
        theme.tokens = {
            ...(tokens.light ? { light: tokens.light } : {}),
            ...(tokens.dark ? { dark: tokens.dark } : {}),
            ...(tokens.shared ? { shared: tokens.shared } : {})
        };
    }
    const typography = optionalTypography(value.typography);
    if (typography) {
        theme.typography = typography;
    }
    const chrome = optionalChrome(value.chrome);
    if (chrome) {
        theme.chrome = chrome;
    }
    return theme;
}

/** Upgrades a v2 theme to v3 without changing its rendered CSS. */
export function migrateThemeV2ToV3(theme: Theme): Theme {
    const parsed = parseTheme(theme);
    return {
        ...parsed,
        version: 3
    };
}

/** Upgrades a v3 theme to v4, dropping the removed `foundation.muted` surface. */
export function migrateThemeV3ToV4(theme: Theme): Theme {
    const parsed = parseTheme(theme);
    return {
        ...parsed,
        version: THEME_VERSION
    };
}

export function isTheme(value: unknown): value is Theme {
    try {
        parseTheme(value);
        return true;
    } catch {
        return false;
    }
}
