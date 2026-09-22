import { browser } from '$app/environment';
import { parseTheme, THEME_VERSION, type Theme } from './theme';

const STORAGE_KEY = 'mielui-live-theme-css';
const STYLE_ID = 'mielui-live-theme-style';
const STUDIO_THEME_KEY = 'mielui-studio-theme-v2';
const SAVED_THEMES_KEY = 'mielui-saved-themes-v2';
const LEGACY_KEYS = ['mielui-theme-studio-state', 'mielui-saved-themes'];

export type SavedTheme = Theme & { id: string; savedAt: string };

function readStored(key: string): string | null {
    if (!browser) {
        return null;
    }
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeStored(key: string, value: string): boolean {
    if (!browser) {
        return false;
    }
    try {
        localStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
}

function removeStored(key: string) {
    if (!browser) {
        return;
    }
    try {
        localStorage.removeItem(key);
    } catch {
        return;
    }
}

function getStyleTag() {
    if (!browser) {
        return null;
    }
    let tag = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (tag) {
        return tag;
    }
    tag = document.createElement('style');
    tag.id = STYLE_ID;
    document.head.appendChild(tag);
    return tag;
}

export function applyLiveThemeCss(css: string) {
    if (!browser) {
        return;
    }
    const tag = getStyleTag();
    if (!tag) {
        return;
    }
    tag.textContent = css;
    writeStored(STORAGE_KEY, css);
}

export function hydrateLiveThemeCss() {
    if (!browser) {
        return;
    }
    const stored = readStored(STORAGE_KEY);
    if (!stored) {
        return;
    }
    const tag = getStyleTag();
    if (tag) {
        tag.textContent = stored;
    }
}

export function getStoredLiveThemeCss() {
    return browser ? readStored(STORAGE_KEY) : null;
}

export function clearLiveThemeCss() {
    if (!browser) {
        return;
    }
    removeStored(STORAGE_KEY);
    document.getElementById(STYLE_ID)?.remove();
}

function randomId() {
    if (browser && typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return `local-${crypto.randomUUID()}`;
    }
    return `local-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

function currentTheme(value: unknown): Theme {
    return {
        ...parseTheme(value),
        version: THEME_VERSION
    };
}

export function saveStudioTheme(theme: Theme) {
    if (!browser) {
        return;
    }
    writeStored(STUDIO_THEME_KEY, JSON.stringify(currentTheme(theme)));
}

export function loadStudioTheme(): Theme | null {
    if (!browser) {
        return null;
    }
    for (const key of LEGACY_KEYS) {
        removeStored(key);
    }
    const stored = readStored(STUDIO_THEME_KEY);
    if (!stored) {
        return null;
    }
    try {
        return currentTheme(JSON.parse(stored));
    } catch {
        removeStored(STUDIO_THEME_KEY);
        return null;
    }
}

export function getSavedThemes(): SavedTheme[] {
    if (!browser) {
        return [];
    }
    const stored = readStored(SAVED_THEMES_KEY);
    if (!stored) {
        return [];
    }
    try {
        const values: unknown = JSON.parse(stored);
        if (!Array.isArray(values)) {
            throw new TypeError('Expected a theme list.');
        }
        return values
            .map((value) => {
                if (typeof value !== 'object' || value === null) {
                    throw new TypeError('Invalid theme.');
                }
                const record = value as Record<string, unknown>;
                return {
                    ...currentTheme(record),
                    id: typeof record.id === 'string' ? record.id : randomId(),
                    savedAt:
                        typeof record.savedAt === 'string'
                            ? record.savedAt
                            : new Date().toISOString()
                };
            })
            .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
    } catch {
        removeStored(SAVED_THEMES_KEY);
        return [];
    }
}

export function saveLocalTheme(theme: Theme, existingId?: string): SavedTheme {
    const entry = {
        ...currentTheme(theme),
        id: existingId ?? randomId(),
        savedAt: new Date().toISOString()
    };
    if (!browser) {
        return entry;
    }
    const next = [entry, ...getSavedThemes().filter((candidate) => candidate.id !== entry.id)];
    if (!writeStored(SAVED_THEMES_KEY, JSON.stringify(next))) {
        throw new Error(
            'Could not save themes on this device. Check browser storage permissions and available space.'
        );
    }
    return entry;
}

export function deleteLocalTheme(id: string) {
    if (!browser) {
        return;
    }
    const next = getSavedThemes().filter((theme) => theme.id !== id);
    if (!writeStored(SAVED_THEMES_KEY, JSON.stringify(next))) {
        throw new Error(
            'Could not save themes on this device. Check browser storage permissions and available space.'
        );
    }
}
