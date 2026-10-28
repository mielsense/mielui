import {
    attributes,
    changed,
    compact,
    content,
    expression,
    type PlaygroundValues,
    quote,
    select,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    status: select('Status', ['neutral', 'success', 'error', 'hidden'], 'neutral'),
    errorSummary: toggle('Error summary', 'Content'),
    reset: toggle('Reset button', 'Content', true),
    pending: toggle('Pending', 'State')
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
    const summary = values.errorSummary
        ? `
    <Form.ErrorSummary {issues} />`
        : '';
    const reset = values.reset
        ? `
        <Button type="reset" variant="ghost">Reset</Button>`
        : '';
    const status =
        values.status === 'hidden'
            ? ''
            : `
    <Form.Status${attributes({
        tone: changed(values.status, 'neutral')
    })}>${content(STATUS[values.status])}</Form.Status>`;
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

<Form.Root${rootProps}>${summary}
    <Field.Root>
        <Field.Label>Work email</Field.Label>
        <Field.Control>
            {#snippet children(control)}
                <Input {...control} type="email" name="email" placeholder="sam@company.com" />
            {/snippet}
        </Field.Control>
    </Field.Root>
    <Form.Actions>
        <Form.Submit>Save profile</Form.Submit>${reset}
    </Form.Actions>${status}
</Form.Root>`;
}
