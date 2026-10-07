import { DEFAULT_THEME, THEME_VERSION, type Theme } from './theme';

type CodePalette = {
    comment: string;
    keyword: string;
    string: string;
    number: string;
    function: string;
    property: string;
    builtin: string;
    entity: string;
    meta: string;
};

function codeTokens(palette: CodePalette): Record<string, string> {
    return {
        '--color-code-comment': palette.comment,
        '--color-code-keyword': palette.keyword,
        '--color-code-string': palette.string,
        '--color-code-number': palette.number,
        '--color-code-function': palette.function,
        '--color-code-property': palette.property,
        '--color-code-builtin': palette.builtin,
        '--color-code-entity': palette.entity,
        '--color-code-meta': palette.meta
    };
}

export const magicTheme: Theme = {
    version: THEME_VERSION,
    slug: 'magic',
    name: 'Magic',
    description: 'Compact cool-gray system with an indigo accent and flat, crisp chrome.',
    publisher: 'mielui',
    brand: '#4f46e5',
    neutral: 'cool',
    radius: 'default',
    density: 'compact',
    motion: 'subtle',
    fontSans: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#e2e4ea',
            background: '#f8f9fb',
            secondary: '#eef0f4',
            foreground: '#161821',
            foregroundMuted: '#676c7b',
            onPrimary: '#ffffff'
        },
        dark: {
            base: '#15161c',
            border: '#262833',
            background: '#0c0d11',
            secondary: '#1e2029',
            foreground: '#ecedf2',
            foregroundMuted: '#9a9fb0',
            onPrimary: '#ffffff'
        }
    },
    tokens: {
        shared: {
            '--radius-lg': '8px',
            '--radius-md': '6px',
            '--radius-sm': '4px',
            '--radius-xl': '12px'
        },
        dark: {
            '--color-primary': '#6d66f0',
            '--color-primary-hover': 'color-mix(in srgb, #6d66f0 78%, black)',
            '--color-ring': 'color-mix(in srgb, #6d66f0 80%, transparent)'
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
    description: 'Rounded system with a coral accent, cream surfaces, and DM Sans.',
    publisher: 'mielui',
    brand: '#ee6a43',
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
            border: '#eadfd6',
            background: '#fdf9f5',
            secondary: '#f6eee7',
            foreground: '#2a211c',
            foregroundMuted: '#7d6f66',
            onPrimary: '#2b1108'
        },
        dark: {
            base: '#211b18',
            border: '#3a302b',
            background: '#161210',
            secondary: '#2c2420',
            foreground: '#f7efe9',
            foregroundMuted: '#b7a79d',
            onPrimary: '#2b1108'
        }
    },
    typography: {
        headerSize: 18,
        headerWeight: '700',
        roleWeights: {
            body: '500',
            label: '500',
            button: '600',
            badge: '500',
            description: '500'
        }
    },
    chrome: {
        edgeHighlight: 0.7,
        surfaceShadows: false,
        primaryStroke: true,
        interactiveCursor: 'pointer'
    }
};

export const openTheme: Theme = {
    version: THEME_VERSION,
    slug: 'open',
    name: 'Open',
    description: 'Neutral monochrome system with an ink accent, Geist type, and flat controls.',
    publisher: 'mielui',
    brand: '#171717',
    neutral: 'true',
    radius: 'rounded',
    density: 'default',
    motion: 'subtle',
    fontSans: "'Geist', sans-serif",
    fontMono: "'Geist Mono', monospace",
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
            '--color-ring': 'color-mix(in srgb, #e6e6e6 80%, transparent)'
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
    description:
        'Bright, instant system with a blue accent, Inter and Roboto Mono, and no motion delay.',
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
            foreground: '#2b2b2a',
            foregroundMuted: '#6f6f6e',
            onPrimary: '#ffffff'
        },
        dark: {
            base: '#171717',
            border: '#212121',
            background: '#0a0a0a',
            secondary: '#252525',
            foreground: '#e2e2e2',
            foregroundMuted: '#8f8f8f',
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
            '--color-ring': 'color-mix(in srgb, #1e78e6 80%, transparent)'
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

const honeyTheme: Theme = {
    version: THEME_VERSION,
    slug: 'honey',
    name: 'Honey',
    description: 'Golden accent on warm cream surfaces with rounded corners and Figtree.',
    publisher: 'mielui',
    brand: '#e5a11c',
    neutral: 'warm',
    radius: 'rounded',
    density: 'default',
    motion: 'default',
    fontSans: "'Figtree', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#fffdf8',
            border: '#ece2cc',
            background: '#fbf6ea',
            secondary: '#f4ebd7',
            foreground: '#2a2415',
            foregroundMuted: '#7b7058',
            onPrimary: '#2b1e05'
        },
        dark: {
            base: '#211d14',
            border: '#3a3323',
            background: '#15120b',
            secondary: '#2b2619',
            foreground: '#f6efdd',
            foregroundMuted: '#b5a98a',
            onPrimary: '#2b1e05'
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
        surfaceShadows: false,
        primaryStroke: true,
        interactiveCursor: 'pointer'
    }
};

const forestTheme: Theme = {
    version: THEME_VERSION,
    slug: 'forest',
    name: 'Forest',
    description:
        'Deep green accent, soft sage surfaces, and Fraunces headings over Instrument Sans.',
    publisher: 'mielui',
    brand: '#2f6b4f',
    neutral: 'warm',
    radius: 'default',
    density: 'default',
    motion: 'subtle',
    fontSans: "'Instrument Sans', sans-serif",
    fontMono: "'IBM Plex Mono', monospace",
    fontHeader: "'Fraunces', serif",
    foundation: {
        light: {
            base: '#ffffff',
            border: '#dfe5dc',
            background: '#f6f8f3',
            secondary: '#ebf0e7',
            foreground: '#1a241d',
            foregroundMuted: '#627066',
            onPrimary: '#ffffff'
        },
        dark: {
            base: '#161d18',
            border: '#27332b',
            background: '#0d120f',
            secondary: '#1f2922',
            foreground: '#e9f0ea',
            foregroundMuted: '#9aab9f',
            onPrimary: '#ffffff'
        }
    },
    tokens: {
        dark: {
            '--color-primary': '#4f9a76',
            '--color-primary-hover': 'color-mix(in srgb, #4f9a76 78%, black)',
            '--color-ring': 'color-mix(in srgb, #4f9a76 80%, transparent)'
        }
    },
    typography: {
        headerSize: 20,
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
        surfaceShadows: false,
        primaryStroke: false
    }
};

const inkTheme: Theme = {
    version: THEME_VERSION,
    slug: 'ink',
    name: 'Ink',
    description:
        'Editorial paper-and-ink system with sharp corners, Newsreader headings, and no shadows.',
    publisher: 'mielui',
    brand: '#1f1d1a',
    neutral: 'warm',
    radius: 'sharp',
    density: 'default',
    motion: 'subtle',
    fontSans: "'Public Sans', sans-serif",
    fontMono: "'IBM Plex Mono', monospace",
    fontHeader: "'Newsreader', serif",
    foundation: {
        light: {
            base: '#fffefb',
            border: '#e3ded3',
            background: '#f8f5ee',
            secondary: '#eeeadf',
            foreground: '#1f1d1a',
            foregroundMuted: '#6e685d',
            onPrimary: '#fffefb'
        },
        dark: {
            base: '#1b1a17',
            border: '#33312b',
            background: '#11100e',
            secondary: '#262420',
            foreground: '#f1ede4',
            foregroundMuted: '#a8a294',
            onPrimary: '#1b1a17'
        }
    },
    tokens: {
        shared: {
            '--radius-sm': '2px',
            '--radius-md': '3px',
            '--radius-lg': '4px',
            '--radius-xl': '6px'
        },
        dark: {
            '--color-primary': '#f1ede4',
            '--color-primary-hover': 'color-mix(in srgb, #f1ede4 78%, black)',
            '--color-ring': 'color-mix(in srgb, #f1ede4 80%, transparent)'
        }
    },
    typography: {
        headerSize: 20,
        headerWeight: '500',
        roleWeights: {
            body: '400',
            label: '500',
            button: '500',
            badge: '500',
            description: '400'
        }
    },
    chrome: {
        edgeHighlight: 0,
        surfaceShadows: false,
        controlShadows: false,
        dialogShadows: false,
        primaryStroke: false
    }
};

const oceanTheme: Theme = {
    version: THEME_VERSION,
    slug: 'ocean',
    name: 'Ocean',
    description: 'Teal accent on cool blue-gray surfaces with Manrope and default spacing.',
    publisher: 'mielui',
    brand: '#0f7f8c',
    neutral: 'cool',
    radius: 'default',
    density: 'default',
    motion: 'default',
    fontSans: "'Manrope', sans-serif",
    fontMono: "'IBM Plex Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#d9e4e8',
            background: '#f4f9fa',
            secondary: '#e6f0f2',
            foreground: '#10242a',
            foregroundMuted: '#5b727a',
            onPrimary: '#ffffff'
        },
        dark: {
            base: '#101b1f',
            border: '#20333a',
            background: '#091114',
            secondary: '#182a30',
            foreground: '#e4f1f4',
            foregroundMuted: '#8fabb3',
            onPrimary: '#ffffff'
        }
    },
    tokens: {
        dark: {
            '--color-primary': '#2aa5b3',
            '--color-primary-hover': 'color-mix(in srgb, #2aa5b3 78%, black)',
            '--color-ring': 'color-mix(in srgb, #2aa5b3 80%, transparent)'
        }
    },
    typography: {
        headerSize: 17,
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
        surfaceShadows: false,
        primaryStroke: true
    }
};

const consoleTheme: Theme = {
    version: THEME_VERSION,
    slug: 'console',
    name: 'Console',
    description:
        'Dense, squared system with a signal-green accent, IBM Plex type, and motion turned off.',
    publisher: 'mielui',
    brand: '#1f9d55',
    neutral: 'true',
    radius: 'sharp',
    density: 'compact',
    motion: 'none',
    fontSans: "'IBM Plex Sans', sans-serif",
    fontMono: "'IBM Plex Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#dcdcdc',
            background: '#f5f5f5',
            secondary: '#ebebeb',
            foreground: '#141414',
            foregroundMuted: '#666666',
            onPrimary: '#04130a'
        },
        dark: {
            base: '#101010',
            border: '#262626',
            background: '#050505',
            secondary: '#1a1a1a',
            foreground: '#e8e8e8',
            foregroundMuted: '#8f8f8f',
            onPrimary: '#04130a'
        }
    },
    tokens: {
        shared: {
            '--radius-sm': '2px',
            '--radius-md': '2px',
            '--radius-lg': '3px',
            '--radius-xl': '4px'
        },
        dark: {
            '--color-primary': '#3ddc84',
            '--color-primary-hover': 'color-mix(in srgb, #3ddc84 78%, black)',
            '--color-ring': 'color-mix(in srgb, #3ddc84 80%, transparent)'
        }
    },
    typography: {
        headerSize: 15,
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
        edgeHighlight: 0,
        surfaceShadows: false,
        controlShadows: false,
        dialogShadows: false,
        travelingHighlight: false,
        primaryStroke: false,
        interactiveCursor: 'default'
    }
};

const emberTheme: Theme = {
    version: THEME_VERSION,
    slug: 'ember',
    name: 'Ember',
    description: 'Warm red accent with rosy neutrals, Plus Jakarta Sans, and soft raised controls.',
    publisher: 'mielui',
    brand: '#d6453d',
    neutral: 'warm',
    radius: 'default',
    density: 'default',
    motion: 'default',
    fontSans: "'Plus Jakarta Sans', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#eadcda',
            background: '#fcf8f7',
            secondary: '#f5ebe9',
            foreground: '#281a19',
            foregroundMuted: '#7c6462',
            onPrimary: '#ffffff'
        },
        dark: {
            base: '#1f1716',
            border: '#382928',
            background: '#140e0d',
            secondary: '#2a1f1e',
            foreground: '#f7ebe9',
            foregroundMuted: '#b89f9c',
            onPrimary: '#ffffff'
        }
    },
    typography: {
        headerSize: 18,
        headerWeight: '700',
        roleWeights: {
            body: '500',
            label: '500',
            button: '500',
            badge: '500',
            description: '500'
        }
    },
    chrome: {
        edgeHighlight: 0.6,
        surfaceShadows: false,
        primaryStroke: true
    }
};

const lilacTheme: Theme = {
    version: THEME_VERSION,
    slug: 'lilac',
    name: 'Lilac',
    description: 'Soft violet accent, cool lavender surfaces, generous rounding, and Nunito.',
    publisher: 'mielui',
    brand: '#8f7cf7',
    neutral: 'cool',
    radius: 'rounded',
    density: 'comfortable',
    motion: 'expressive',
    fontSans: "'Nunito', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#e3e0f2',
            background: '#f8f7fd',
            secondary: '#eeecf9',
            foreground: '#1e1b2e',
            foregroundMuted: '#6b6785',
            onPrimary: '#17122e'
        },
        dark: {
            base: '#19172a',
            border: '#2d2a45',
            background: '#0f0e1a',
            secondary: '#232038',
            foreground: '#eeecfa',
            foregroundMuted: '#a5a1c2',
            onPrimary: '#17122e'
        }
    },
    typography: {
        headerSize: 18,
        headerWeight: '700',
        roleWeights: {
            body: '500',
            label: '500',
            button: '600',
            badge: '500',
            description: '500'
        }
    },
    chrome: {
        surfaceShadows: false,
        primaryStroke: false,
        interactiveCursor: 'pointer'
    }
};

export const profitableTheme: Theme = {
    version: THEME_VERSION,
    slug: 'profitable',
    name: 'Profitable',
    description: 'Calm warm-neutral system with a graphite accent, Geist type, and flat surfaces.',
    brand: '#333333',
    neutral: 'warm',
    radius: 'rounded',
    density: 'default',
    motion: 'default',
    fontSans: "'Geist', sans-serif",
    fontMono: "'Roboto Mono', monospace",
    fontHeader: 'var(--font-sans)',
    publisher: 'Sivir UI',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#e8e8e6',
            background: '#fcfcfc',
            secondary: '#efefee',
            foreground: '#1c1c1b',
            foregroundMuted: '#737373',
            onPrimary: '#ffffff',
            buttonForeground: '#1c1c1b'
        },
        dark: {
            base: '#171717',
            border: '#2a2a2a',
            background: '#0a0a0a',
            secondary: '#252525',
            foreground: '#ededed',
            foregroundMuted: '#a3a3a3',
            onPrimary: '#242424',
            buttonForeground: '#ededed'
        }
    },
    tokens: {
        dark: {
            '--color-primary': '#e8e8e8',
            '--color-primary-hover': 'color-mix(in srgb, #e8e8e8 78%, black)',
            '--color-ring': 'color-mix(in srgb, #e8e8e8 30%, transparent)'
        },
        shared: {
            '--sivir-space-unit': '3.4px',
            '--radius-lg': '12px',
            '--radius-md': '10px',
            '--radius-xl': '14px',
            '--radius-sm': '7px',
            '--motion-duration-hover': '120ms',
            '--motion-duration-menu': '90ms',
            '--motion-duration-panel': '130ms',
            '--motion-duration-sheet': '130ms',
            '--motion-duration-overlay': '120ms',
            '--motion-menu-x': '2px',
            '--motion-menu-y': '2px',
            '--motion-menu-scale-start': '0.98',
            '--motion-menu-blur': '0px',
            '--motion-modal-x': '2px',
            '--motion-modal-y': '2px',
            '--motion-modal-scale-start': '0.98',
            '--motion-modal-blur': '0px',
            '--motion-panel-y': '2px',
            '--motion-panel-scale-start': '0.98',
            '--motion-step-x': '0px',
            '--motion-step-blur': '0px',
            '--motion-press-px': '0px',
            '--motion-duration-panel-in': '130ms',
            '--motion-duration-panel-out': '70ms',
            '--motion-duration-modal-in': '130ms',
            '--motion-duration-modal-out': '70ms',
            '--motion-duration-step-in': '130ms',
            '--motion-duration-step-out': '70ms',
            '--motion-duration-toast-in': '130ms',
            '--motion-duration-toast-out': '70ms',
            '--motion-duration-sheet-out': '70ms'
        }
    },
    typography: {
        headerSize: 16,
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
        surfaceShadows: false,
        controlShadows: false,
        dialogShadows: true,
        primaryStroke: false,
        interactiveCursor: 'default'
    }
};

export const ravenTheme: Theme = {
    version: THEME_VERSION,
    slug: 'raven',
    name: 'Raven',
    description: 'True-black timeline surfaces, hairline borders, and a bright blue accent.',
    brand: '#1d9bf0',
    neutral: 'cool',
    radius: 'default',
    density: 'default',
    motion: 'expressive',
    fontSans: "'Figtree', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    publisher: 'Sivir UI',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#eff3f4',
            background: '#ffffff',
            secondary: '#f7f9f9',
            foreground: '#0f1419',
            foregroundMuted: '#536471',
            onPrimary: '#ffffff',
            buttonForeground: '#0f1419'
        },
        dark: {
            base: '#000000',
            border: '#2f3336',
            background: '#000000',
            secondary: '#16181c',
            foreground: '#e7e9ea',
            foregroundMuted: '#71767b',
            onPrimary: '#ffffff',
            buttonForeground: '#e7e9ea'
        }
    },
    tokens: {
        light: {
            '--color-input': '#cfd9de'
        },
        dark: {
            '--color-input': '#333639'
        },
        shared: {
            '--radius-sm': '4px',
            '--radius-md': '6px',
            '--radius-lg': '8px',
            '--radius-xl': '12px',
            '--motion-duration-hover': '160ms',
            '--motion-duration-menu': '140ms',
            '--motion-duration-panel': '200ms',
            '--motion-duration-sheet': '300ms',
            '--motion-duration-overlay': '180ms',
            '--motion-duration-modal-in': '240ms',
            '--motion-duration-modal-out': '160ms',
            '--motion-menu-y': '0px',
            '--motion-menu-scale-start': '0.9',
            '--motion-menu-blur': '0px',
            '--motion-modal-y': '0px',
            '--motion-modal-scale-start': '0.88',
            '--motion-modal-blur': '0px',
            '--motion-step-x': '24px',
            '--motion-step-blur': '0px',
            '--motion-press-px': '1px'
        }
    },
    typography: {
        headerSize: 17,
        headerWeight: '700',
        roleWeights: {
            body: '500',
            label: '500',
            button: '700',
            badge: '600',
            description: '500'
        }
    },
    chrome: {
        borders: 'single',
        surfaceShadows: false,
        controlShadows: false,
        dialogShadows: true,
        travelingHighlight: false,
        primaryStroke: false,
        interactiveCursor: 'pointer'
    }
};

export const clawdTheme: Theme = {
    version: THEME_VERSION,
    slug: 'clawd',
    name: 'Clawd',
    description: 'Compact warm-dark workspace with a clay accent, flat chrome, and tight radii.',
    brand: '#292929',
    neutral: 'warm',
    radius: 'default',
    density: 'compact',
    motion: 'subtle',
    fontSans: "'DM Sans', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    publisher: 'Sivir UI',
    foundation: {
        light: {
            base: '#fffefb',
            border: '#e8e6dc',
            background: '#faf9f5',
            secondary: '#f0eee6',
            foreground: '#141413',
            foregroundMuted: '#73726c',
            onPrimary: '#ffffff',
            buttonForeground: '#141413'
        },
        dark: {
            base: '#262624',
            border: '#30302e',
            background: '#131314',
            secondary: '#30302e',
            foreground: '#faf9f5',
            foregroundMuted: '#a1a09a',
            onPrimary: '#000000',
            buttonForeground: '#faf9f5'
        }
    },
    tokens: {
        light: {
            '--color-input': '#dcd9cc',
            ...codeTokens({
                comment: '#8c8779',
                keyword: '#b5452a',
                string: '#5a7a3a',
                number: '#a5651b',
                function: '#7a5a9e',
                property: '#3f6b8c',
                builtin: '#c26a2c',
                entity: '#5a7a3a',
                meta: '#8c8779'
            })
        },
        dark: {
            '--color-primary': '#e8e8e8',
            '--color-primary-hover': 'color-mix(in srgb, #e8e8e8 78%, black)',
            '--color-ring': 'color-mix(in srgb, #e8e8e8 30%, transparent)',
            '--color-input': '#3d3d3a',
            ...codeTokens({
                comment: '#8c8779',
                keyword: '#e8917a',
                string: '#a6c47f',
                number: '#e0b062',
                function: '#c0a2e3',
                property: '#8fbbdb',
                builtin: '#eba26a',
                entity: '#a6c47f',
                meta: '#8c8779'
            })
        },
        shared: {
            '--motion-duration-step-in': '30ms',
            '--motion-duration-step-out': '60ms',
            '--motion-duration-panel-in': '30ms',
            '--motion-duration-panel-out': '60ms',
            '--motion-duration-modal-in': '30ms',
            '--motion-duration-modal-out': '60ms',
            '--motion-duration-press': '40ms',
            '--motion-duration-item': '0ms',
            '--motion-menu-x': '2px',
            '--motion-menu-y': '2px',
            '--motion-menu-scale-start': '1',
            '--motion-menu-blur': '0px',
            '--motion-modal-x': '2px',
            '--motion-modal-y': '2px',
            '--motion-modal-scale-start': '1',
            '--motion-modal-blur': '0px',
            '--motion-panel-y': '2px',
            '--motion-panel-scale-start': '0.98',
            '--motion-step-x': '0px',
            '--motion-step-blur': '0px',
            '--motion-press-px': '0px',
            '--motion-duration-switch': '0ms',
            '--motion-switch-stretch': '0'
        }
    },
    typography: {
        headerSize: 16,
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
        borders: 'single',
        surfaceShadows: false,
        controlShadows: false,
        dialogShadows: true,
        travelingHighlight: false,
        primaryStroke: false,
        interactiveCursor: 'default'
    }
};

export const inspirationTheme: Theme = {
    version: THEME_VERSION,
    slug: 'inspiration',
    name: 'Inspiration',
    description: 'Violet primary, sharp corners, heavier type, and quick, unblurred menus.',
    brand: '#bc3afc',
    neutral: 'warm',
    radius: 'sharp',
    density: 'default',
    motion: 'expressive',
    fontSans: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    publisher: 'Sivir UI',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#ddddda',
            background: '#fdfdfc',
            secondary: '#f0f0ef',
            foreground: '#1f1f1e',
            foregroundMuted: '#808080',
            onPrimary: '#ffffff',
            buttonForeground: '#1c1c1b'
        },
        dark: {
            base: '#171717',
            border: '#2a2a2a',
            background: '#0a0a0a',
            secondary: '#252525',
            foreground: '#ededed',
            foregroundMuted: '#a3a3a3',
            onPrimary: '#ffffff',
            buttonForeground: '#ededed'
        }
    },
    tokens: {
        dark: {
            '--color-primary': '#be3dff',
            '--color-primary-hover': 'color-mix(in srgb, #be3dff 78%, black)',
            '--color-ring': 'color-mix(in srgb, #be3dff 30%, transparent)'
        },
        shared: {
            '--radius-sm': '4px',
            '--radius-md': '5px',
            '--radius-lg': '6px',
            '--radius-xl': '8px',
            '--motion-press-px': '2px',
            '--motion-menu-origin': 'top',
            '--motion-menu-scale-start': '1',
            '--motion-menu-blur': '0px',
            '--motion-duration-panel-out': '160ms',
            '--motion-duration-panel-in': '190ms',
            '--motion-menu-y': '3px',
            '--motion-duration-hover': '70ms',
            '--motion-duration-swap': '0ms',
            '--motion-duration-switch': '160ms',
            '--motion-switch-stretch': '0.8'
        }
    },
    typography: {
        headerSize: 16,
        headerWeight: '600',
        roleWeights: {
            body: '500',
            label: '600',
            button: '600',
            badge: '600',
            description: '500'
        }
    },
    chrome: {
        borders: 'single',
        surfaceShadows: true,
        controlShadows: true,
        dialogShadows: true,
        travelingHighlight: false,
        primaryStroke: true,
        interactiveCursor: 'pointer'
    }
};

export const governmentTheme: Theme = {
    version: THEME_VERSION,
    slug: 'government',
    name: 'Government',
    description:
        'Square corners, flat hairline surfaces, near-zero motion, and a single amber accent.',
    brand: '#fbb724',
    neutral: 'cool',
    radius: 'sharp',
    density: 'compact',
    motion: 'none',
    fontSans: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontHeader: 'var(--font-sans)',
    publisher: 'Sivir UI',
    foundation: {
        light: {
            base: '#ffffff',
            border: '#d5d9de',
            background: '#f1f3f5',
            secondary: '#e6e9ed',
            foreground: '#14171a',
            foregroundMuted: '#5b6570',
            onPrimary: '#14171a',
            buttonForeground: '#14171a'
        },
        dark: {
            base: '#14171a',
            border: '#2b3036',
            background: '#0b0d0f',
            secondary: '#1d2125',
            foreground: '#e3e6e9',
            foregroundMuted: '#8b949e',
            onPrimary: '#14171a',
            buttonForeground: '#e3e6e9'
        }
    },
    tokens: {
        shared: {
            '--radius-sm': '0px',
            '--radius-md': '0px',
            '--radius-lg': '0px',
            '--radius-xl': '0px',
            '--motion-duration-hover': '0ms',
            '--motion-duration-menu': '0ms',
            '--motion-duration-panel': '0ms',
            '--motion-duration-sheet': '0ms',
            '--motion-duration-overlay': '0ms',
            '--motion-duration-panel-in': '0ms',
            '--motion-duration-panel-out': '0ms',
            '--motion-duration-modal-in': '0ms',
            '--motion-duration-modal-out': '0ms',
            '--motion-duration-step-in': '0ms',
            '--motion-duration-step-out': '0ms',
            '--motion-duration-toast-in': '60ms',
            '--motion-duration-toast-out': '0ms',
            '--motion-duration-sheet-out': '0ms',
            '--motion-menu-x': '0px',
            '--motion-menu-y': '0px',
            '--motion-menu-scale-start': '1',
            '--motion-menu-blur': '0px',
            '--motion-modal-x': '0px',
            '--motion-modal-y': '0px',
            '--motion-modal-scale-start': '1',
            '--motion-modal-blur': '0px',
            '--motion-panel-y': '0px',
            '--motion-panel-scale-start': '1',
            '--motion-step-x': '0px',
            '--motion-step-blur': '0px',
            '--motion-press-px': '0px'
        }
    },
    typography: {
        headerSize: 15,
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
        surfaceShadows: false,
        controlShadows: false,
        dialogShadows: false,
        travelingHighlight: false,
        primaryStroke: false,
        interactiveCursor: 'default'
    }
};

export const builtInThemePresets: readonly Theme[] = [
    DEFAULT_THEME,
    magicTheme,
    bitsyTheme,
    openTheme,
    functionalTheme,
    daydreamTheme,
    honeyTheme,
    forestTheme,
    inkTheme,
    oceanTheme,
    consoleTheme,
    emberTheme,
    lilacTheme,
    profitableTheme,
    ravenTheme,
    clawdTheme,
    inspirationTheme,
    governmentTheme
];

export const defaultTheme = DEFAULT_THEME;
