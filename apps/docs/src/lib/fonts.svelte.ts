import { getContext, onMount, setContext } from 'svelte';

export type FontCategory = 'Sans serif' | 'Serif' | 'Monospace';
export type DocsFont = { name: string; category: FontCategory; family: string };

export const DEFAULT_FONT = 'DM Sans';

/**
 * Every family imported by app.css from Google Fonts. Only these can be
 * previewed — anything else would fall back to a system font.
 */
export const fonts: DocsFont[] = [
    ...[
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

const fontContext = Symbol('docs-font');
const storageKey = 'mielui-docs-font';

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
                storage?.setItem(storageKey, JSON.stringify(current));
            } catch {
                return;
            }
        }
    };

    setContext(fontContext, state);

    onMount(() => {
        try {
            storage = window.localStorage;
            current = readFont(storage.getItem(storageKey));
        } catch {
            storage = undefined;
        }

        function sync(event: StorageEvent) {
            if (
                storage &&
                event.storageArea === storage &&
                (event.key === storageKey || event.key === null)
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

export function getDocsFontState(): DocsFontState {
    const state = getContext<DocsFontState | undefined>(fontContext);
    if (!state) {
        throw new Error('Font selection requires the application font context.');
    }
    return state;
}
