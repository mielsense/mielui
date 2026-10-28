import {
    attributes,
    compact,
    content,
    expression,
    type PlaygroundValues,
    quote,
    select,
    tag,
    toggle
} from '#lib/components/docs/playground.js';

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

type Values = PlaygroundValues<typeof controls>;

const CONTROL_INDENT = '            ';

export function code(values: Values): string {
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
    const checkbox = tag(
        'Checkbox',
        {
            name: 'updates',
            'aria-label': !values.label && copy.label,
            class: 'mt-0.5'
        },
        ' />',
        CONTROL_INDENT,
        ['{...control}']
    );
    const input = tag(
        'Input',
        {
            type: 'email',
            name: 'email',
            'aria-label': !values.label && copy.label,
            placeholder: 'you@company.com'
        },
        ' />',
        CONTROL_INDENT,
        ['{...control}']
    );
    const control = `<Field.Control>
        {#snippet children(control)}
            ${horizontal ? checkbox : input}
        {/snippet}
    </Field.Control>`;
    const label = values.label ? [`<Field.Label>${content(copy.label)}</Field.Label>`] : [];
    const feedback = compact([
        values.description && `<Field.Description>${content(copy.description)}</Field.Description>`,
        issues.length > 0 && '<Field.Error />'
    ]);
    const contentParts = [...label, ...feedback];
    const fieldContent =
        contentParts.length > 0
            ? [
                  `<Field.Content>
        ${contentParts.join('\n        ')}
    </Field.Content>`
              ]
            : [];
    const body = horizontal ? [control, ...fieldContent] : [...label, control, ...feedback];
    const issueList = issues
        .map((message) => `        {\n            message: ${quote(message)}\n        }`)
        .join(',\n');
    const script =
        issues.length > 0
            ? `

    const issues = [
${issueList}
    ];`
            : '';

    const imports = compact([
        horizontal && "    import { Checkbox } from '@mielui/svelte/components/checkbox';",
        "    import * as Field from '@mielui/svelte/components/field';",
        !horizontal && "    import { Input } from '@mielui/svelte/components/input';"
    ]);

    return `<script lang="ts">
${imports.join('\n')}${script}
</script>

<Field.Root${rootProps}>
    ${body.join('\n    ')}
</Field.Root>`;
}
