import { createContext, onMount } from 'svelte';

export type FontCategory = 'Sans serif' | 'Serif' | 'Monospace';
export type DocsFont = { name: string; category: FontCategory; family: string };

export const DEFAULT_FONT = 'Inter Tight';

/**
 * Every family the docs can preview. Inter Tight and Geist Mono ship with ui.css;
 * app.html loads the rest from Google Fonts without blocking the first paint.
 * Anything else would fall back to a system font.
 */
export const fonts: DocsFont[] = [
    ...[
        'Inter Tight',
        'DM Sans',
        'Geist',
        'Inter',
        'Instrument Sans',
        'Manrope',
        'Plus Jakarta Sans',
        'Outfit',
        'Space Grotesk',
        'Sora',
        'IBM Plex Sans',
        'Roboto',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Poppins',
        'Nunito',
        'Work Sans',
        'Figtree',
        'Public Sans',
        'Noto Sans'
    ].map((name) => ({ name, category: 'Sans serif' as const, family: `'${name}', sans-serif` })),
    ...[
        'Lora',
        'Source Serif 4',
        'Fraunces',
        'Newsreader',
        'Merriweather',
        'Playfair Display',
        'Libre Baskerville',
        'DM Serif Text',
        'Crimson Pro',
        'EB Garamond'
    ].map((name) => ({ name, category: 'Serif' as const, family: `'${name}', serif` })),
    ...[
        'Geist Mono',
        'IBM Plex Mono',
        'JetBrains Mono',
        'Fira Code',
        'Source Code Pro',
        'Roboto Mono'
    ].map((name) => ({ name, category: 'Monospace' as const, family: `'${name}', monospace` }))
];

type DocsFontState = {
    current: string;
};

const [getDocsFontState, setDocsFontState] = createContext<DocsFontState>();
export const FONT_STORAGE_KEY = 'mielui-docs-font';

function knownFont(value: unknown): string {
    return typeof value === 'string' && fonts.some((font) => font.name === value)
        ? value
        : DEFAULT_FONT;
}

function readFont(value: string | null): string {
    try {
        return knownFont(value === null ? DEFAULT_FONT : JSON.parse(value));
    } catch {
        return DEFAULT_FONT;
    }
}

export function createDocsFontState(): DocsFontState {
    let current = $state(DEFAULT_FONT);
    let storage: Storage | undefined;

    const state: DocsFontState = {
        get current() {
            return current;
        },
        set current(value: string) {
            current = knownFont(value);
            try {
                storage?.setItem(FONT_STORAGE_KEY, JSON.stringify(current));
            } catch {
                return;
            }
        }
    };

    setDocsFontState(state);

    onMount(() => {
        try {
            storage = window.localStorage;
            current = readFont(storage.getItem(FONT_STORAGE_KEY));
        } catch {
            storage = undefined;
        }

        function sync(event: StorageEvent) {
            if (
                storage &&
                event.storageArea === storage &&
                (event.key === FONT_STORAGE_KEY || event.key === null)
            ) {
                current = readFont(event.newValue);
            }
        }

        window.addEventListener('storage', sync);
        return () => {
            window.removeEventListener('storage', sync);
            storage = undefined;
        };
    });

    return state;
}

export { getDocsFontState };
