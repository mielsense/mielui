import { parseTheme, type Theme } from '@mielui/svelte/themes/theme';

const HANDOFF_KEY = 'mielui-studio-handoff-v1';

/**
 * Remembers a theme that was applied outside the Studio. The Studio keeps its own draft and
 * applies it on open, so without this it would put its old draft back over the new theme.
 */
export function handOffTheme(theme: Theme) {
    try {
        localStorage.setItem(HANDOFF_KEY, JSON.stringify(theme));
    } catch {
        return;
    }
}

/** Returns the handed-off theme once, then forgets it. */
export function takeHandedOffTheme(): Theme | null {
    try {
        const stored = localStorage.getItem(HANDOFF_KEY);
        if (!stored) {
            return null;
        }
        localStorage.removeItem(HANDOFF_KEY);

        return parseTheme(JSON.parse(stored));
    } catch {
        return null;
    }
}
