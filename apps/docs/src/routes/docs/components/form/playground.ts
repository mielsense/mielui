import {
    attributes,
    CONTROL_SIZES,
    changed,
    compact,
    content,
    defaultOn,
    expression,
    type PlaygroundValues,
    quote,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    tone: select('Status tone', ['neutral', 'success', 'error'], 'neutral'),
    submitVariant: select(
        'Submit variant',
        ['primary', 'secondary', 'outline'],
        'primary',
        'Appearance'
    ),
    submitSize: select('Submit size', CONTROL_SIZES, 'md', 'Appearance'),
    status: toggle('Status', 'Content', true),
    reset: toggle('Reset button', 'Content', true),
    errorSummary: toggle('Error summary', 'Content'),
    heading: toggle('Custom summary heading', 'Content'),
    pending: toggle('Pending', 'State'),
    submitDisabled: toggle('Disabled submit', 'State'),
    focusOnError: toggle('Focus summary on error', 'Behavior', true)
};

export const STATUS = {
    neutral: 'Changes are saved when you press Save.',
    success: 'Profile saved.',
    error: 'We could not reach the server. Try again.'
};

type Values = PlaygroundValues<typeof controls>;

type Issue = {
    message: string;
    path?: string[];
};

export const issues: Issue[] = [
    {
        message: 'Enter a valid email address.',
        path: ['email']
    },
    {
        message: 'This profile cannot be saved right now.'
    }
];

function declaration(): string {
    const entries = issues.map((issue) => {
        const fields = compact([
            `message: ${quote(issue.message)}`,
            issue.path && `path: [${issue.path.map(quote).join(', ')}]`
        ]);

        return `        {
            ${fields.join(',\n            ')}
        }`;
    });

    return `

    const issues = [
${entries.join(',\n')}
    ];`;
}

export function code(values: Values): string {
    const rootProps = attributes({
        class: 'w-full max-w-sm',
        onsubmit: expression('submit'),
        pending: values.pending
    });
    const submitProps = attributes({
        variant: changed(values.submitVariant, 'primary'),
        size: changed(values.submitSize, 'md'),
        disabled: values.submitDisabled
    });
    const resetProps = attributes({
        type: 'reset',
        variant: 'ghost',
        size: changed(values.submitSize, 'md')
    });
    const summaryProps = attributes({
        issues: expression('issues'),
        focusOnError: defaultOn(values.focusOnError)
    });
    const statusProps = attributes({
        tone: changed(values.tone, 'neutral')
    });
    const summary = values.heading
        ? `
    <Form.ErrorSummary${summaryProps}>
        {#snippet heading()}
            Two details need another look
        {/snippet}
    </Form.ErrorSummary>`
        : `
    <Form.ErrorSummary${summaryProps} />`;
    const reset = values.reset
        ? `
        <Button${resetProps}>Reset</Button>`
        : '';
    const status = values.status
        ? `
    <Form.Status${statusProps}>${content(STATUS[values.tone])}</Form.Status>`
        : '';
    const script = values.errorSummary ? declaration() : '';
    const imports = compact([
        values.reset && "    import { Button } from '@mielui/svelte/components/button';",
        "    import * as Field from '@mielui/svelte/components/field';",
        "    import * as Form from '@mielui/svelte/components/form';",
        "    import { Input } from '@mielui/svelte/components/input';"
    ]);

    return `<script lang="ts">
${imports.join('\n')}${script}

    function submit(event: SubmitEvent) {
        event.preventDefault();
    }
</script>

<Form.Root${rootProps}>${values.errorSummary ? summary : ''}
    <Field.Root>
        <Field.Label>Work email</Field.Label>
        <Field.Control>
            {#snippet children(control)}
                <Input {...control} type="email" name="email" placeholder="sam@company.com" />
            {/snippet}
        </Field.Control>
    </Field.Root>
    <Form.Actions>
        <Form.Submit${submitProps}>Save profile</Form.Submit>${reset}
    </Form.Actions>${status}
</Form.Root>`;
}
