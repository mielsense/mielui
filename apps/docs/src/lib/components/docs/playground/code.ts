const UNSAFE_IN_QUOTES = /["{}&]/;
const UNSAFE_IN_TEXT = /[{}<&]/;

export type AttributeValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | {
          expression: string;
      };

export type AttributeValues = Record<string, AttributeValue>;

/** Marks an attribute value as a Svelte expression, printed as `name={source}`. */
export function expression(source: string) {
    return {
        expression: source
    };
}

/** The value when it differs from the component's default, so `attributes()` leaves defaults out. */
export function changed<Value extends string | number>(value: Value, fallback: Value) {
    return value !== fallback && value;
}

/** For a prop that defaults to true: prints `name={false}` when it is switched off. */
export function defaultOn(value: boolean) {
    return value ? undefined : expression('false');
}

/** Drops the entries a condition switched off, keeping the rest in order. */
export function compact<Item>(items: readonly (Item | false | null | undefined)[]): Item[] {
    return items.filter((item): item is Item => {
        return item !== false && item !== null && item !== undefined;
    });
}

/**
 * Prints attributes for generated example code, with a leading space when there are any.
 * Strings print quoted, numbers print as `name={n}`, `true` prints the bare name, and
 * `false`, `null`, `undefined`, and empty strings are left out. A string that would break a
 * quoted attribute prints as a JavaScript string expression instead.
 */
export function attributes(values: AttributeValues): string {
    const parts = Object.entries(values).flatMap(([name, value]) => {
        if (value === null || value === undefined || value === false || value === '') {
            return [];
        }
        if (value === true) {
            return [name];
        }
        if (typeof value === 'string') {
            return [
                UNSAFE_IN_QUOTES.test(value)
                    ? `${name}={${JSON.stringify(value)}}`
                    : `${name}="${value}"`
            ];
        }
        if (typeof value === 'number') {
            return [`${name}={${value}}`];
        }

        return [`${name}={${value.expression}}`];
    });

    return parts.length ? ` ${parts.join(' ')}` : '';
}

/**
 * Prints an opening tag for generated example code. It stays on one line when it fits in 100
 * columns and stacks one attribute per line otherwise. `end` is `>` or ` />`. `leading` holds
 * attributes printed as written, ahead of the rest: `bind:value`, `{month}`.
 */
export function tag(
    name: string,
    values: AttributeValues,
    end: string,
    indent = '',
    leading: readonly string[] = []
): string {
    const parts = [
        ...leading,
        ...Object.entries(values).map(([key, value]) => {
            return attributes({
                [key]: value
            }).trim();
        })
    ].filter(Boolean);
    const inline = `<${[name, ...parts].join(' ')}${end}`;

    if (indent.length + inline.length <= 100) {
        return inline;
    }

    const stacked = parts.map((part) => `${indent}    ${part}`).join('\n');

    return `<${name}\n${stacked}\n${indent}${end.trim()}`;
}

/** Prints text as element content, as a string expression when it would not survive as markup. */
export function content(value: string): string {
    if (UNSAFE_IN_TEXT.test(value) || value !== value.trim()) {
        return `{${JSON.stringify(value)}}`;
    }

    return value;
}

/** Prints a single-quoted JavaScript string literal. */
export function quote(value: string): string {
    return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
}

/** Prints a flat object as a one-line JavaScript object literal. */
export function literal(item: Record<string, string | number>): string {
    const entries = Object.entries(item).map(([key, value]) => {
        return `${key}: ${typeof value === 'string' ? quote(value) : value}`;
    });

    return `{ ${entries.join(', ')} }`;
}

/** Indents every non-empty line of a block by `depth` spaces. */
export function indent(source: string, depth = 4): string {
    const prefix = ' '.repeat(depth);

    return source
        .split('\n')
        .map((line) => (line ? `${prefix}${line}` : line))
        .join('\n');
}
