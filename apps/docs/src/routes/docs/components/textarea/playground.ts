import {
    attributes,
    changed,
    compact,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    variant: select('Variant', ['outline', 'secondary'], 'outline'),
    label: toggle('Label', 'Content', true),
    description: toggle('Description', 'Content'),
    placeholder: text('Placeholder', 'Write a message…', 'Content'),
    footer: toggle('Footer', 'Content'),
    invalid: toggle('Invalid', 'State'),
    disabled: toggle('Disabled', 'State'),
    autoresize: toggle('Autoresize', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        variant: changed(values.variant, 'outline'),
        label: values.label && 'Message',
        'aria-label': !values.label && 'Message',
        description: values.description && 'Sent to everyone on the project.',
        placeholder: values.placeholder,
        autoresize: values.autoresize,
        disabled: values.disabled,
        'aria-invalid': values.invalid && 'true'
    });
    const imports = compact([
        values.footer && "import { Button } from '@mielui/svelte/components/button';",
        "import { Textarea } from '@mielui/svelte/components/textarea';"
    ]).join('\n    ');
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
