import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    orientation: select('Orientation', ['vertical', 'horizontal'], 'vertical'),
    label: toggle('Label', 'Content', true),
    description: toggle('Description', 'Content', true),
    issues: select('Issues', ['none', 'one', 'two'], 'none', 'State'),
    invalid: toggle('Invalid', 'State'),
    required: toggle('Required', 'State'),
    disabled: toggle('Disabled', 'State')
};

export const COPY = {
    vertical: {
        label: 'Work email',
        description: 'We only use this address for account updates.',
        issues: ['Enter a valid email address.', 'Use an address on your company domain.']
    },
    horizontal: {
        label: 'Product updates',
        description: 'A short email when there is something useful to share.',
        issues: ['Turn on product updates to continue.', 'Confirm your email address first.']
    }
};

export const ISSUE_COUNT = {
    none: 0,
    one: 1,
    two: 2
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const horizontal = values.orientation === 'horizontal';
    const copy = COPY[values.orientation];
    const issues = copy.issues.slice(0, ISSUE_COUNT[values.issues]);
    const rootProps = attributes({
        orientation: horizontal && 'horizontal',
        required: values.required,
        disabled: values.disabled,
        invalid: values.invalid,
        issues: issues.length > 0 && expression('issues'),
        class: horizontal ? 'max-w-sm gap-3' : 'w-full max-w-sm'
    });
    const checkboxProps = attributes({
        name: 'updates',
        'aria-label': !values.label && copy.label,
        class: 'mt-0.5'
    });
    const input = values.label
        ? '<Input {...control} type="email" name="email" placeholder="you@company.com" />'
        : `<Input
                {...control}
                type="email"
                name="email"
                aria-label="${copy.label}"
                placeholder="you@company.com"
            />`;
    const control = `<Field.Control>
        {#snippet children(control)}
            ${horizontal ? `<Checkbox {...control}${checkboxProps} />` : input}
        {/snippet}
    </Field.Control>`;
    const label = values.label ? [`<Field.Label>${copy.label}</Field.Label>`] : [];
    const feedback = [
        values.description && `<Field.Description>${copy.description}</Field.Description>`,
        issues.length > 0 && '<Field.Error />'
    ].filter((part) => part !== false);
    const contentParts = [...label, ...feedback];
    const content =
        contentParts.length > 0
            ? [
                  `<Field.Content>
        ${contentParts.join('\n        ')}
    </Field.Content>`
              ]
            : [];
    const body = horizontal ? [control, ...content] : [...label, control, ...feedback];
    const issueList = issues
        .map((message) => `        {\n            message: '${message}'\n        }`)
        .join(',\n');
    const script =
        issues.length > 0
            ? `

    const issues = [
${issueList}
    ];`
            : '';

    const imports = [
        horizontal && "    import { Checkbox } from '@mielui/svelte/components/checkbox';",
        "    import * as Field from '@mielui/svelte/components/field';",
        !horizontal && "    import { Input } from '@mielui/svelte/components/input';"
    ].filter((line) => line !== false);

    return `<script lang="ts">
${imports.join('\n')}${script}
</script>

<Field.Root${rootProps}>
    ${body.join('\n    ')}
</Field.Root>`;
}
