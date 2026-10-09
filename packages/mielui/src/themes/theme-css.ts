import {
    DEFAULT_THEME,
    type Density,
    type MotionFeel,
    type NeutralTemp,
    type RadiusScale,
    type Theme,
    type ThemeChrome,
    type ThemeFoundationPalette,
    type ThemeTypography
} from './theme-contract';
import { parseTheme } from './theme-parse';

type RadiusSet = {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    plate: string;
    control: string;
};

/** Plates take `plate`, floating panels `xl`, and everything pressable takes `control`. */
const RADII: Record<RadiusScale, RadiusSet> = {
    sharp: {
        sm: '2px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        plate: '10px',
        control: '6px'
    },
    default: {
        sm: '8px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        plate: '26px',
        control: '9999px'
    },
    rounded: {
        sm: '10px',
        md: '14px',
        lg: '18px',
        xl: '22px',
        plate: '30px',
        control: '9999px'
    }
};

const DENSITY_UNIT: Record<Density, string> = {
    compact: '3.2px',
    default: '3.6px',
    comfortable: '4px'
};

type MotionSet = {
    hover: string;
    menu: string;
    panel: string;
    sheet: string;
    overlay: string;
    toastIn: string;
    toastOut: string;
};

const MOTION: Record<MotionFeel, MotionSet> = {
    none: {
        hover: '0ms',
        menu: '0ms',
        panel: '0ms',
        sheet: '0ms',
        overlay: '0ms',
        toastIn: '0ms',
        toastOut: '0ms'
    },
    subtle: {
        hover: '110ms',
        menu: '40ms',
        panel: '150ms',
        sheet: '300ms',
        overlay: '110ms',
        toastIn: '280ms',
        toastOut: '140ms'
    },
    default: {
        hover: '150ms',
        menu: '60ms',
        panel: '200ms',
        sheet: '420ms',
        overlay: '150ms',
        toastIn: '390ms',
        toastOut: '180ms'
    },
    expressive: {
        hover: '200ms',
        menu: '120ms',
        panel: '280ms',
        sheet: '520ms',
        overlay: '200ms',
        toastIn: '480ms',
        toastOut: '240ms'
    }
};

const NEUTRAL_STEPS = [0, 10, 50, 100, 150, 300, 500, 900] as const;
type NeutralRamp = Record<(typeof NEUTRAL_STEPS)[number], string>;

// Immutable source values keep generated declarations acyclic in every mode.
const NEUTRALS: Record<NeutralTemp, { light: NeutralRamp; dark: NeutralRamp }> = {
    warm: {
        light: {
            0: 'hsl(0 0% 100%)',
            10: 'hsl(60 11.1% 99.2%)',
            50: 'hsl(60 11.1% 96.5%)',
            100: 'hsl(60 6.2% 93.7%)',
            150: 'hsl(60 4.2% 90.6%)',
            300: 'hsl(60 4.4% 82.4%)',
            500: 'hsl(60 3% 41.5%)',
            900: 'hsl(60 5.7% 10.4%)'
        },
        dark: {
            0: 'hsl(0 0% 5%)',
            10: 'hsl(60 11.1% 7%)',
            50: 'hsl(0 0% 10%)',
            100: 'hsl(0 0% 13%)',
            150: 'hsl(0 0% 15.7%)',
            300: 'hsl(0 0% 22.7%)',
            500: 'hsl(0 0% 65%)',
            900: 'hsl(0 0% 93%)'
        }
    },
    /** The default ramp: one ink on a grey stage, with a white plate above it. */
    true: {
        light: {
            0: '#ffffff',
            10: '#f6f6f6',
            50: '#f1f1f1',
            100: '#e9e9e9',
            150: '#e3e3e3',
            300: '#cfcfcf',
            500: '#6d6d6d',
            900: '#292929'
        },
        dark: {
            0: '#1a1a1a',
            10: '#121212',
            50: '#1e1e1e',
            100: '#272727',
            150: '#2d2d2d',
            300: '#3f3f3f',
            500: '#969696',
            900: '#ededed'
        }
    },
    cool: {
        light: {
            0: 'hsl(220 20% 100%)',
            10: 'hsl(220 20% 99%)',
            50: 'hsl(220 16% 96%)',
            100: 'hsl(220 14% 93%)',
            150: 'hsl(220 12% 90%)',
            300: 'hsl(220 10% 81%)',
            500: 'hsl(220 8% 42%)',
            900: 'hsl(220 12% 10%)'
        },
        dark: {
            0: 'hsl(220 12% 5%)',
            10: 'hsl(220 12% 7%)',
            50: 'hsl(220 11% 10%)',
            100: 'hsl(220 10% 13%)',
            150: 'hsl(220 9% 16%)',
            300: 'hsl(220 8% 23%)',
            500: 'hsl(220 7% 65%)',
            900: 'hsl(220 10% 93%)'
        }
    }
};

function block(selector: string, declarations: string[]): string {
    return `${selector} {\n${declarations.map((declaration) => `\t${declaration}`).join('\n')}\n}\n`;
}

function neutralDeclarations(ramp: NeutralRamp) {
    return NEUTRAL_STEPS.map((step) => `--mielui-neutral-${step}: ${ramp[step]};`);
}

function brandDeclarations(brand: string, mode: 'light' | 'dark') {
    const isDefault = brand.toLowerCase() === DEFAULT_THEME.brand;
    return [
        `--color-primary: ${brand};`,
        `--color-primary-hover: color-mix(in srgb, ${brand} ${isDefault ? '88%, white' : '78%, black'});`,
        `--color-on-primary: ${isDefault ? '#21151e' : '#ffffff'};`,
        `--color-ring: color-mix(in srgb, ${brand} 50%, transparent);`,
        `--mielui-blue-500: ${brand};`,
        `--mielui-blue-50: color-mix(in srgb, ${brand} 12%, ${mode === 'light' ? 'white' : 'black'});`
    ];
}

/** Scales a `Nms` motion token (keeps `0ms` as-is). */
function scaleMotionMs(value: string, factor: number): string {
    const n = Number.parseFloat(value);
    if (!Number.isFinite(n) || n === 0) {
        return value;
    }
    return `${Math.round(n * factor)}ms`;
}

const FOUNDATION_TOKEN_MAP = {
    base: ['--color-card', '--color-panel'],
    border: ['--color-border', '--color-input'],
    background: ['--color-background'],
    secondary: ['--color-secondary'],
    foreground: ['--color-foreground'],
    foregroundMuted: ['--color-foreground-muted'],
    onPrimary: ['--color-on-primary'],
    buttonForeground: ['--color-button-foreground']
} as const;

type FoundationPaletteKey = keyof typeof FOUNDATION_TOKEN_MAP;

function foundationDeclarations(palette: ThemeFoundationPalette): string[] {
    const declarations: string[] = [];
    const keys = Object.keys(FOUNDATION_TOKEN_MAP).sort() as FoundationPaletteKey[];
    for (const key of keys) {
        const value = palette[key];
        if (typeof value !== 'string' || value.trim() === '') {
            continue;
        }
        for (const token of FOUNDATION_TOKEN_MAP[key]) {
            declarations.push(`${token}: ${value.trim()};`);
        }
    }
    return declarations;
}

function tokenMapDeclarations(map: Record<string, string> | undefined): string[] {
    if (!map) {
        return [];
    }
    return Object.keys(map)
        .sort()
        .map((name) => `${name}: ${map[name].trim()};`);
}

function typographyDeclarations(typography: ThemeTypography | undefined): string[] {
    if (!typography) {
        return [];
    }
    const declarations: string[] = [];
    if (typeof typography.headerSize === 'number') {
        declarations.push(`--font-size-header: ${typography.headerSize}px;`);
    }
    if (typeof typography.headerWeight === 'string') {
        declarations.push(`--font-weight-header: ${typography.headerWeight};`);
    }
    const roles = typography.roleWeights;
    if (roles) {
        const roleKeys = ['body', 'label', 'button', 'badge', 'description'] as const;
        for (const role of roleKeys) {
            const weight = roles[role];
            if (typeof weight === 'string') {
                declarations.push(`--font-weight-${role}: ${weight};`);
            }
        }
    }
    return declarations;
}

function elevationDeclarations(mode: 'light' | 'dark'): string[] {
    return mode === 'light'
        ? [
              '--elevation-control-edge: inset 0 1px 0 0 rgb(255 255 255 / calc(0.7 * var(--mielui-edge-highlight))), inset 0 -1px 0 0 rgb(0 0 0 / 0.05);',
              '--mielui-toolbar-face: linear-gradient(to bottom, rgb(255 255 255 / calc(0.045 * var(--mielui-edge-highlight))), rgb(0 0 0 / 0.04));',
              '--mielui-toolbar-raised: var(--elevation-control-edge), inset 0 0 0 var(--border-size) var(--color-border), 0 1px 0 var(--color-border), 0 2px 2px rgb(0 0 0 / 0.08);',
              '--mielui-toolbar-pressed: inset 0 0 0 var(--border-size) var(--color-border), inset 0 1px 2px rgb(0 0 0 / 0.1);',
              '--elevation-surface-edge: inset 0 1px 0 0 rgb(255 255 255 / 0);',
              '--elevation-1: 0 1px 2px rgb(0 0 0 / 0.06);',
              '--elevation-float: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 24px rgb(0 0 0 / 0.08);',
              '--elevation-modal: 0 1px 2px rgb(0 0 0 / 0.08), 0 16px 48px -8px rgb(0 0 0 / 0.16);',
              '--elevation-control: inset 0 0 0 var(--border-size) var(--color-input);',
              '--elevation-button-outline: inset 0 0 0 var(--border-size) var(--color-input), inset 0 1px 0 0 rgb(255 255 255 / calc(0.9 * var(--mielui-edge-highlight))), 0 1px 2px rgb(0 0 0 / 0.05);'
          ]
        : [
              '--elevation-control-edge: inset 0 1px 0 0 rgb(255 255 255 / calc(0.14 * var(--mielui-edge-highlight))), inset 0 -1px 0 0 rgb(0 0 0 / 0.2);',
              '--mielui-toolbar-face: linear-gradient(to bottom, rgb(255 255 255 / calc(0.045 * var(--mielui-edge-highlight))), rgb(0 0 0 / 0.04));',
              '--mielui-toolbar-raised: inset 0 1px 0 rgb(255 255 255 / calc(0.18 * var(--mielui-edge-highlight))), inset 0 -1px 0 rgb(0 0 0 / 0.2), 0 0 0 var(--border-size) rgb(0 0 0 / 0.6), 0 1px 0 1px rgb(0 0 0 / 0.45), 0 2px 3px rgb(0 0 0 / 0.2);',
              '--mielui-toolbar-pressed: inset 0 0 0 var(--border-size) rgb(0 0 0 / 0.35), inset 0 1px 2px rgb(0 0 0 / 0.3);',
              '--elevation-surface-edge: inset 0 1px 0 0 rgb(255 255 255 / calc(0.08 * var(--mielui-edge-highlight)));',
              '--elevation-1: var(--elevation-surface-edge), 0 1px 2px rgb(0 0 0 / 0.3);',
              '--elevation-float: var(--elevation-surface-edge), 0 1px 2px rgb(0 0 0 / 0.4), 0 12px 32px rgb(0 0 0 / 0.45);',
              '--elevation-modal: var(--elevation-surface-edge), 0 1px 2px rgb(0 0 0 / 0.4), 0 24px 56px -8px rgb(0 0 0 / 0.6);',
              '--elevation-control: inset 0 0 0 var(--border-size) var(--color-input);',
              '--elevation-button-outline: inset 0 0 0 var(--border-size) var(--color-input), inset 0 1px 0 0 rgb(255 255 255 / calc(0.1 * var(--mielui-edge-highlight))), 0 1px 2px rgb(0 0 0 / 0.3);'
          ];
}

function chromeBlocks(chrome: ThemeChrome): string {
    const masterShadows = chrome.shadows !== false;
    const surfaceShadows = masterShadows && chrome.surfaceShadows !== false;
    const controlShadows = masterShadows && chrome.controlShadows !== false;
    const dialogShadows = masterShadows && chrome.dialogShadows !== false;
    const elevationOff: string[] = [];
    if (!surfaceShadows) {
        elevationOff.push(
            '--elevation-1: 0 0 0 0 transparent;',
            '--elevation-float: 0 0 0 0 transparent;'
        );
    }
    if (!dialogShadows) {
        elevationOff.push('--elevation-modal: 0 0 0 0 transparent;');
    }
    if (!controlShadows) {
        elevationOff.push(
            '--mielui-toolbar-face: none;',
            '--mielui-toolbar-raised: inset 0 0 0 var(--border-size) var(--color-border);',
            '--mielui-toolbar-pressed: inset 0 0 0 var(--border-size) var(--color-border);',
            '--elevation-control-edge: 0 0 0 0 transparent;',
            '--elevation-control: inset 0 0 0 var(--border-size) var(--color-input);',
            '--elevation-button-outline: inset 0 0 0 var(--border-size) var(--color-input);'
        );
    }
    const shared = [`--ui-cursor-interactive: ${chrome.interactiveCursor ?? 'default'};`];
    if (chrome.travelingHighlight === false) {
        shared.push('--mielui-traveling-highlight: none;');
    }
    const withElevations = (declarations: string[]) =>
        elevationOff.length > 0 ? [...declarations, ...elevationOff] : declarations;
    const light = withElevations([
        `--color-primary-stroke: ${
            chrome.primaryStroke ? 'color-mix(in srgb, black 14%, transparent)' : 'transparent'
        };`,
        ...shared
    ]);
    const dark = withElevations([
        `--color-primary-stroke: ${
            chrome.primaryStroke ? 'color-mix(in srgb, white 24%, transparent)' : 'transparent'
        };`,
        ...shared
    ]);
    return block(':root:not(.dark)', light) + block('.dark', dark);
}

/** Generates complete, acyclic overrides for every public theme axis. */
export function themeToCss(themeInput: Theme): string {
    const theme = parseTheme(themeInput);
    const radius = RADII[theme.radius];
    const motion = MOTION[theme.motion];
    const chrome = { ...DEFAULT_THEME.chrome, ...theme.chrome };
    const borderInsetScale = chrome.borders === 'double' ? 1 : 0;
    const shared = [
        '--chart-1: #b8a1f2;',
        '--chart-2: #f49d9d;',
        '--chart-3: #8bc7f5;',
        '--chart-4: #8ed8b0;',
        '--chart-5: #f2d77d;',
        `--mielui-border-inset-scale: ${borderInsetScale};`,
        `--mielui-edge-highlight: ${chrome.edgeHighlight ?? 0.5};`,
        ...tokenMapDeclarations(DEFAULT_THEME.tokens?.shared),
        `--font-sans: ${theme.fontSans};`,
        `--font-mono: ${theme.fontMono};`,
        `--font-header: ${theme.fontHeader};`,
        `--radius-sm: ${radius.sm};`,
        `--radius-md: ${radius.md};`,
        `--radius-lg: ${radius.lg};`,
        `--radius-xl: ${radius.xl};`,
        `--radius-2xl: ${radius.plate};`,
        `--radius-control: ${radius.control};`,
        `--mielui-space-unit: ${DENSITY_UNIT[theme.density]};`,
        `--motion-duration-hover: ${motion.hover};`,
        `--motion-duration-menu: ${motion.menu};`,
        `--motion-duration-panel: ${motion.panel};`,
        `--motion-duration-sheet: ${motion.sheet};`,
        `--motion-duration-sheet-out: ${scaleMotionMs(motion.sheet, 0.7)};`,
        `--motion-duration-overlay: ${motion.overlay};`,
        `--motion-duration-toast-in: ${motion.toastIn};`,
        `--motion-duration-toast-out: ${motion.toastOut};`
    ];
    if (theme.motion === 'none') {
        shared.push(
            '--motion-duration-panel-in: 0ms;',
            '--motion-duration-panel-out: 0ms;',
            '--motion-duration-modal-in: 0ms;',
            '--motion-duration-modal-out: 0ms;',
            '--motion-duration-press: 0ms;',
            '--motion-duration-item: 0ms;',
            '--motion-duration-spring: 0ms;',
            '--motion-duration-pop: 0ms;',
            '--motion-duration-flick: 0ms;'
        );
    }

    let css =
        block(':root,\n.dark', shared) +
        block(':root', [
            ...brandDeclarations(theme.brand, 'light'),
            ...neutralDeclarations(NEUTRALS[theme.neutral].light),
            ...elevationDeclarations('light')
        ]) +
        block('.dark', [
            ...brandDeclarations(theme.brand, 'dark'),
            ...neutralDeclarations(NEUTRALS[theme.neutral].dark),
            ...elevationDeclarations('dark')
        ]);

    const typography = typographyDeclarations(theme.typography);
    if (typography.length > 0) {
        css += block(':root,\n.dark', typography);
    }

    if (theme.foundation?.light) {
        const declarations = foundationDeclarations(theme.foundation.light);
        if (declarations.length > 0) {
            css += block(':root:not(.dark)', declarations);
        }
    }
    if (theme.foundation?.dark) {
        const declarations = foundationDeclarations(theme.foundation.dark);
        if (declarations.length > 0) {
            css += block('.dark', declarations);
        }
    }

    if (theme.tokens?.shared) {
        const declarations = tokenMapDeclarations(theme.tokens.shared);
        if (declarations.length > 0) {
            css += block(':root,\n.dark', declarations);
        }
    }
    if (theme.tokens?.light) {
        const declarations = tokenMapDeclarations(theme.tokens.light);
        if (declarations.length > 0) {
            css += block(':root:not(.dark)', declarations);
        }
    }
    if (theme.tokens?.dark) {
        const declarations = tokenMapDeclarations(theme.tokens.dark);
        if (declarations.length > 0) {
            css += block('.dark', declarations);
        }
    }

    css += chromeBlocks(chrome);
    return css;
}
