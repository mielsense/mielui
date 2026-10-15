import type { KbdLabels } from '.';

/** Maps keybinding tokens to the glyphs people recognise from native menus. */
const GLYPHS: Record<string, string> = {
    cmd: '⌘',
    command: '⌘',
    meta: '⌘',
    ctrl: '⌃',
    control: '⌃',
    shift: '⇧',
    alt: '⌥',
    option: '⌥',
    opt: '⌥',
    enter: '↵',
    return: '↵',
    esc: 'esc',
    escape: 'esc',
    tab: '⇥',
    space: 'Space',
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
    backspace: '⌫',
    delete: '⌦',
    plus: '+'
};

const MODIFIERS = {
    cmd: 'meta',
    command: 'meta',
    meta: 'meta',
    ctrl: 'ctrl',
    control: 'ctrl',
    shift: 'shift',
    alt: 'alt',
    option: 'alt',
    opt: 'alt'
} as const;

const NAMED_KEYS: Record<string, string> = {
    enter: 'enter',
    return: 'enter',
    esc: 'escape',
    escape: 'escape',
    tab: 'tab',
    space: ' ',
    up: 'arrowup',
    down: 'arrowdown',
    left: 'arrowleft',
    right: 'arrowright',
    backspace: 'backspace',
    delete: 'delete',
    plus: '+'
};

const SPOKEN_KEYS: Record<string, keyof KbdLabels> = {
    cmd: 'command',
    command: 'command',
    meta: 'command',
    ctrl: 'control',
    control: 'control',
    shift: 'shift',
    alt: 'alt',
    opt: 'option',
    option: 'option',
    enter: 'enter',
    return: 'enter',
    esc: 'escape',
    escape: 'escape',
    tab: 'tab',
    space: 'space',
    backspace: 'backspace',
    delete: 'delete',
    plus: 'plus',
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
};

const SPOKEN_NAMES: Required<KbdLabels> = {
    command: 'Command',
    control: 'Control',
    shift: 'Shift',
    alt: 'Alt',
    option: 'Option',
    enter: 'Enter',
    escape: 'Escape',
    tab: 'Tab',
    space: 'Space',
    backspace: 'Backspace',
    delete: 'Delete',
    plus: 'Plus',
    up: 'Up arrow',
    down: 'Down arrow',
    left: 'Left arrow',
    right: 'Right arrow'
};

function spokenName(token: string, labels: KbdLabels | undefined) {
    const name = SPOKEN_KEYS[token];
    if (name) {
        return labels?.[name] ?? SPOKEN_NAMES[name];
    }
    return token.toUpperCase();
}

export type ParsedShortcut = {
    meta: boolean;
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    key: string;
    caps: string[];
    label: string;
};

export function parseShortcut(value: string, labels?: KbdLabels): ParsedShortcut | undefined {
    const tokens = value
        .split('+')
        .map((token) => token.trim().toLowerCase())
        .filter(Boolean);

    if (tokens.length === 0) {
        return undefined;
    }

    const parsed: ParsedShortcut = {
        meta: false,
        ctrl: false,
        shift: false,
        alt: false,
        key: '',
        caps: [],
        label: ''
    };

    for (const token of tokens) {
        const modifier = MODIFIERS[token as keyof typeof MODIFIERS];
        if (modifier) {
            parsed[modifier] = true;
            parsed.caps.push(GLYPHS[token]);
            continue;
        }

        const key = NAMED_KEYS[token] ?? (token.length === 1 ? token : undefined);
        if (!key || parsed.key) {
            return undefined;
        }

        parsed.key = key;
        parsed.caps.push(GLYPHS[token] ?? token.toUpperCase());
    }

    parsed.label = tokens.map((token) => spokenName(token, labels)).join(' ');
    return parsed.key ? parsed : undefined;
}
