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

export type ParsedShortcut = {
    meta: boolean;
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    key: string;
    caps: string[];
    label: string;
};

export function parseShortcut(value: string): ParsedShortcut | undefined {
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

    parsed.label = tokens
        .map((token) => {
            const names: Record<string, string> = {
                cmd: 'Command',
                command: 'Command',
                meta: 'Command',
                ctrl: 'Control',
                control: 'Control',
                alt: 'Alt',
                opt: 'Option',
                option: 'Option',
                esc: 'Escape',
                return: 'Enter',
                up: 'Up arrow',
                down: 'Down arrow',
                left: 'Left arrow',
                right: 'Right arrow'
            };
            return names[token] ?? `${token[0].toUpperCase()}${token.slice(1)}`;
        })
        .join(' ');
    return parsed.key ? parsed : undefined;
}
