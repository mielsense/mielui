export type PlaygroundSelect<Value extends string = string> = {
    kind: 'select';
    label: string;
    options: readonly Value[];
    value: Value;
    group?: string;
};

export type PlaygroundToggle = {
    kind: 'toggle';
    label: string;
    value: boolean;
    group?: string;
};

export type PlaygroundText = {
    kind: 'text';
    label: string;
    value: string;
    group?: string;
};

export type PlaygroundNumber = {
    kind: 'number';
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    group?: string;
};

export type PlaygroundControl =
    | PlaygroundSelect
    | PlaygroundToggle
    | PlaygroundText
    | PlaygroundNumber;

export type PlaygroundControls = Record<string, PlaygroundControl>;

export type PlaygroundValues<Controls extends PlaygroundControls> = {
    [Key in keyof Controls]: Controls[Key] extends PlaygroundSelect<infer Value>
        ? Value
        : Controls[Key] extends PlaygroundText
          ? string
          : Controls[Key] extends PlaygroundNumber
            ? number
            : boolean;
};

const UNSAFE_IN_QUOTES = /["{}&]/;

type AttributeValue = string | number | boolean | null | undefined | { expression: string };

/** A choice between named values. The first select of a playground sits in the toolbar. */
export function select<const Value extends string>(
    label: string,
    options: readonly Value[],
    value: NoInfer<Value>,
    group?: string
): PlaygroundSelect<Value> {
    return {
        kind: 'select',
        label,
        options,
        value,
        group
    };
}

/** An on or off prop, listed in the Props menu under its group. */
export function toggle(label: string, group?: string, value = false): PlaygroundToggle {
    return {
        kind: 'toggle',
        label,
        value,
        group
    };
}

/** A short string prop, edited in the Props menu. */
export function text(label: string, value: string, group?: string): PlaygroundText {
    return {
        kind: 'text',
        label,
        value,
        group
    };
}

/** A numeric prop, edited in the Props menu. Give it bounds when the prop has them. */
export function number(
    label: string,
    value: number,
    options: { min?: number; max?: number; step?: number; group?: string } = {}
): PlaygroundNumber {
    return {
        kind: 'number',
        label,
        value,
        ...options
    };
}

/** Marks an attribute value as a Svelte expression, printed as `name={source}`. */
export function expression(source: string) {
    return {
        expression: source
    };
}

/**
 * Prints attributes for generated example code, with a leading space when there are any.
 * Strings print quoted, numbers print as `name={n}`, `true` prints the bare name, and
 * `false`, `null`, `undefined`, and empty strings are left out. A string that would break a
 * quoted attribute prints as a JavaScript string expression instead.
 */
export function attributes(values: Record<string, AttributeValue>): string {
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
 * columns and stacks one attribute per line otherwise. `end` is `>` or ` />`.
 */
export function tag(
    name: string,
    values: Record<string, AttributeValue>,
    end: string,
    indent = ''
): string {
    const inline = `<${name}${attributes(values)}${end}`;

    if (indent.length + inline.length <= 100) {
        return inline;
    }

    const stacked = Object.entries(values)
        .map(([key, value]) => {
            return attributes({
                [key]: value
            }).trim();
        })
        .filter(Boolean)
        .map((attribute) => `${indent}    ${attribute}`)
        .join('\n');

    return `<${name}\n${stacked}\n${indent}${end.trim()}`;
}

const SIZE_LABELS: Record<string, string> = {
    xs: 'Extra small',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'Extra large'
};

const LOCALE = /^[a-z]{2}-[A-Z]{2}$/;

export function optionLabel(value: string): string {
    if (LOCALE.test(value)) {
        return value;
    }

    const words = SIZE_LABELS[value] ?? value.replaceAll('-', ' ');

    return words.charAt(0).toUpperCase() + words.slice(1);
}
