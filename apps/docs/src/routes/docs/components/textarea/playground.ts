import {
    attributes,
    number,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['outline', 'secondary'], 'outline'),
    label: toggle('Label', 'Content', true),
    description: toggle('Description', 'Content'),
    placeholder: text('Placeholder', 'Write a message…', 'Content'),
    footer: toggle('Footer', 'Content'),
    disabled: toggle('Disabled', 'State'),
    readonly: toggle('Read only', 'State'),
    required: toggle('Required', 'State'),
    invalid: toggle('Invalid', 'State'),
    rows: number('Rows', 3, {
        min: 1,
        max: 12,
        group: 'Behavior'
    }),
    autoresize: toggle('Autoresize', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        variant: values.variant !== 'outline' && values.variant,
        label: values.label && 'Message',
        'aria-label': !values.label && 'Message',
        description: values.description && 'Sent to everyone on the project.',
        placeholder: values.placeholder,
        rows: values.rows !== 2 && values.rows,
        autoresize: values.autoresize,
        disabled: values.disabled,
        readonly: values.readonly,
        required: values.required,
        'aria-invalid': values.invalid && 'true'
    });
    const imports = [
        values.footer && "import { Button } from '@mielui/svelte/components/button';",
        "import { Textarea } from '@mielui/svelte/components/textarea';"
    ]
        .filter(Boolean)
        .join('\n    ');
    const element = values.footer
        ? `<Textarea bind:value={message}${props}>
    <div class="flex items-center justify-between gap-3 px-3 pb-3">
        <span class="text-xs text-foreground-muted">Markdown is supported.</span>
        <Button size="sm">Send</Button>
    </div>
</Textarea>`
        : `<Textarea bind:value={message}${props} />`;

    return `<script lang="ts">
    ${imports}

    let message = $state('');
</script>

${element}`;
}
