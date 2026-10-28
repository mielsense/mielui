import { createContext, onMount } from 'svelte';

export type FontCategory = 'Sans serif' | 'Serif' | 'Monospace';
export type DocsFont = { name: string; category: FontCategory; family: string };

export const DEFAULT_FONT = 'System';

/** The platform's own sans: SF Pro on Apple devices, Inter Tight elsewhere. Keep identical to `--font-sans` in app.css. */
const SYSTEM_FONT_FAMILY =
    "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter Tight', system-ui, sans-serif";

/**
 * Every family the docs can preview. System is the platform's own font; Inter Tight and
 * Geist Mono ship with ui.css;
 * the rest come from Google Fonts, loaded only by `loadGoogleFonts`.
 * Anything else would fall back to a system font.
 */
export const fonts: DocsFont[] = [
    { name: 'System', category: 'Sans serif', family: SYSTEM_FONT_FAMILY },
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

/** Google Fonts stylesheets for every family in `fonts` that ui.css does not ship. */
export const googleFontStylesheets = [
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Figtree:wght@400;500;600;700&family=Geist:wght@100..900&family=IBM+Plex+Sans:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Lato:wght@400;700;900&family=Manrope:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Public+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Sora:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&family=DM+Serif+Text:ital@0;1&family=EB+Garamond:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400..700&family=Libre+Baskerville:wght@400;700&family=Lora:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Newsreader:opsz,wght@6..72,400..700&family=Playfair+Display:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400..700&display=swap',
    'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Geist+Mono:wght@100..900&family=IBM+Plex+Mono:wght@400;500;600;700&family=JetBrains+Mono:wght@100..800&family=Roboto+Mono:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600;700&display=swap'
];

/** Adds the Google Fonts stylesheets once, without blocking rendering. */
export function loadGoogleFonts() {
    for (const href of googleFontStylesheets) {
        if (document.querySelector(`link[href="${href}"]`)) {
            continue;
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.append(link);
    }
}

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
