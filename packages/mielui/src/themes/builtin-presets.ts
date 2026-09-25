import { DEFAULT_THEME, THEME_VERSION, type Theme } from './theme';

export const magicTheme: Theme = {
    version: THEME_VERSION,
    slug: 'magic',
    name: 'Magic',
    description: 'Compact warm-neutral system with an indigo accent and flat chrome.',
    publisher: 'mielui',
    brand: '#1e42e6',
    neutral: 'warm',
    radius: 'default',
    density: 'compact',
    motion: 'subtle',
    fontSans: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#dedede',
            background: '#fafafa',
            secondary: '#efefee'
        },
        dark: {
            base: '#171717',
            border: '#1f1f1f',
            background: '#0f0f0f',
            secondary: '#1f1f1f'
        }
    },
    tokens: {
        shared: {
            '--radius-lg': '8px',
            '--radius-md': '6px',
            '--radius-sm': '4px',
            '--radius-xl': '12px'
        }
    },
    typography: {
        headerSize: 16,
        headerWeight: '600',
        roleWeights: {
            body: '500',
            label: '500',
            button: '500',
            badge: '500',
            description: '500'
        }
    },
    chrome: {
        shadows: false,
        primaryStroke: false,
        interactiveCursor: 'default'
    }
};

export const bitsyTheme: Theme = {
    version: THEME_VERSION,
    slug: 'bitsy',
    name: 'Bitsy',
    description: 'Comfortable rounded system with a graphite accent and flat stroked chrome.',
    publisher: 'mielui',
    brand: '#5a5c63',
    neutral: 'warm',
    radius: 'rounded',
    density: 'comfortable',
    motion: 'expressive',
    fontSans: "'DM Sans', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#d4d4d4',
            background: '#fdfdfc',
            secondary: '#efefee'
        },
        dark: {
            base: '#171717',
            border: '#2a2a2a',
            background: '#0a0a0a',
            secondary: '#252525'
        }
    },
    typography: {
        headerSize: 18,
        headerWeight: '600',
        roleWeights: {
            body: '500',
            label: '500',
            button: '600',
            badge: '500',
            description: '500'
        }
    },
    chrome: {
        shadows: false,
        primaryStroke: true,
        interactiveCursor: 'default'
    }
};

export const openTheme: Theme = {
    version: THEME_VERSION,
    slug: 'open',
    name: 'Open',
    description: 'Calm warm-neutral system with a graphite accent, Geist type, and flat controls.',
    publisher: 'mielui',
    brand: '#333333',
    neutral: 'warm',
    radius: 'rounded',
    density: 'default',
    motion: 'subtle',
    fontSans: "'Geist', sans-serif",
    fontMono: "'Roboto Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#ededed',
            background: '#ffffff',
            secondary: '#efefee',
            foreground: '#1c1c1b',
            foregroundMuted: '#787878',
            onPrimary: '#ffffff'
        },
        dark: {
            base: '#171717',
            border: '#262626',
            background: '#0a0a0a',
            secondary: '#252525',
            foreground: '#e6e6e6',
            foregroundMuted: '#a3a3a3',
            onPrimary: '#1a1a1a'
        }
    },
    tokens: {
        shared: {
            '--mielui-space-unit': '3.4px',
            '--radius-lg': '12px',
            '--radius-md': '10px',
            '--radius-xl': '14px',
            '--radius-sm': '7px'
        },
        dark: {
            '--color-primary': '#e6e6e6',
            '--color-primary-hover': 'color-mix(in srgb, #e6e6e6 78%, black)',
            '--color-ring': 'color-mix(in srgb, #e6e6e6 30%, transparent)'
        }
    },
    typography: {
        headerSize: 18,
        headerWeight: '500',
        roleWeights: {
            body: '500',
            label: '500',
            button: '500',
            badge: '500',
            description: '500'
        }
    },
    chrome: {
        surfaceShadows: false,
        controlShadows: false
    }
};

export const functionalTheme: Theme = {
    version: THEME_VERSION,
    slug: 'functional',
    name: 'Functional',
    description: 'Mielui default — a calm, warm-neutral interface system.',
    publisher: 'mielui',
    brand: '#0088ff',
    neutral: 'warm',
    radius: 'rounded',
    density: 'default',
    motion: 'subtle',
    fontSans: "'Inter', sans-serif",
    fontMono: "'Roboto Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#f2f2f2',
            background: '#ffffff',
            secondary: '#efefee',
            foreground: '#4a4a49',
            foregroundMuted: '#828282',
            onPrimary: '#ffffff'
        },
        dark: {
            base: '#171717',
            border: '#212121',
            background: '#0a0a0a',
            secondary: '#252525',
            foreground: '#d6d6d6',
            foregroundMuted: '#6b6b6b',
            onPrimary: '#ffffff'
        }
    },
    tokens: {
        shared: {
            '--radius-xl': '12px',
            '--radius-lg': '8px',
            '--radius-md': '6px',
            '--radius-sm': '3px',
            '--border-size': '1px',
            '--mielui-space-unit': '3.5px',
            '--motion-duration-item': '0ms',
            '--motion-duration-modal-in': '70ms',
            '--motion-duration-toast-out': '0ms',
            '--motion-duration-sheet-out': '0ms',
            '--motion-duration-menu': '70ms',
            '--motion-duration-hover': '0ms',
            '--motion-duration-sheet': '0ms',
            '--motion-duration-toast-in': '70ms',
            '--motion-duration-panel-out': '0ms',
            '--motion-duration-press': '0ms',
            '--motion-duration-modal-out': '0ms',
            '--motion-duration-panel-in': '70ms',
            '--motion-duration-overlay': '20ms',
            '--motion-duration-panel': '70ms',
            '--motion-panel-scale-start': '1',
            '--motion-menu-blur': '0px',
            '--motion-modal-blur': '0px',
            '--motion-menu-scale-start': '1',
            '--motion-modal-scale-start': '1',
            '--motion-press-px': '1px',
            '--motion-panel-y': '3px',
            '--motion-menu-y': '3px'
        },
        dark: {
            '--color-primary': '#1e78e6',
            '--color-primary-hover': 'color-mix(in srgb, #1e78e6 78%, black)',
            '--color-ring': 'color-mix(in srgb, #1e78e6 30%, transparent)'
        }
    },
    typography: {
        headerSize: 16,
        headerWeight: '600',
        roleWeights: {
            body: '400',
            label: '400',
            button: '400',
            badge: '400',
            description: '400'
        }
    },
    chrome: {
        controlShadows: false,
        travelingHighlight: false,
        interactiveCursor: 'pointer'
    }
};

const daydreamTheme: Theme = {
    version: THEME_VERSION,
    slug: 'daydream',
    name: 'Daydream',
    description:
        'Soft pink controls, warm paper surfaces, and a playful lavender, mint, and peach palette.',
    publisher: 'mielui',
    brand: '#eeb2d2',
    neutral: 'warm',
    radius: 'rounded',
    density: 'comfortable',
    motion: 'subtle',
    fontSans: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#eeefeb',
            border: '#dfe2da',
            background: '#f7f6f2',
            secondary: '#fafbf7',
            foreground: '#29272c',
            foregroundMuted: '#706970',
            onPrimary: '#352330'
        },
        dark: {
            base: '#252329',
            border: '#3d3740',
            background: '#19171c',
            secondary: '#322d35',
            foreground: '#f7f1f5',
            foregroundMuted: '#b9aeb8',
            onPrimary: '#352330'
        }
    },
    tokens: {
        shared: {
            '--radius-sm': '8px',
            '--radius-md': '12px',
            '--radius-lg': '16px',
            '--radius-xl': '24px',
            '--chart-1': '#bfa4e9',
            '--chart-2': '#9bc8f3',
            '--chart-3': '#f4b480',
            '--chart-4': '#b7dca7',
            '--chart-5': '#f4dd82',
            '--color-primary-hover': '#e5a2c5',
            '--mielui-surface': 'solid'
        },
        light: {
            '--color-success': '#39774e',
            '--color-warning': '#98601f',
            '--color-error': '#b64158',
            '--color-info': '#486b9e'
        },
        dark: {
            '--color-success': '#b7dca7',
            '--color-warning': '#f4dd82',
            '--color-error': '#f3a4b5',
            '--color-info': '#9bc8f3'
        }
    },
    typography: {
        headerSize: 18,
        headerWeight: '600',
        roleWeights: {
            body: '400',
            label: '500',
            button: '500',
            badge: '500',
            description: '400'
        }
    },
    chrome: {
        borders: 'single',
        edgeHighlight: 0,
        surfaceShadows: false,
        controlShadows: false,
        dialogShadows: false,
        primaryStroke: false,
        interactiveCursor: 'pointer'
    }
};

export const builtInThemePresets: readonly Theme[] = [
    DEFAULT_THEME,
    magicTheme,
    bitsyTheme,
    openTheme,
    functionalTheme,
    daydreamTheme
];

export const defaultTheme = DEFAULT_THEME;
