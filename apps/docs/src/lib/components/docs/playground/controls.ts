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

export type PlaygroundValue = PlaygroundControl['value'];

export type PlaygroundValues<Controls extends PlaygroundControls> = {
    [Key in keyof Controls]: Controls[Key] extends PlaygroundSelect<infer Value>
        ? Value
        : Controls[Key] extends PlaygroundText
          ? string
          : Controls[Key] extends PlaygroundNumber
            ? number
            : boolean;
};

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
