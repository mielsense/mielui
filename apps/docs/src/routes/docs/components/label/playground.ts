import { attributes, type PlaygroundValues, text, toggle } from '$lib/components/docs/playground';

export const controls = {
    text: text('Text', 'Email address', 'Content'),
    required: toggle('Required', 'State'),
    disabled: toggle('Disabled control', 'State')
};

function content(value: string) {
    return /[{}<>&]/.test(value) ? `{${JSON.stringify(value)}}` : value;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const label = attributes({
        for: 'email',
        required: values.required,
        class: values.disabled && 'cursor-not-allowed opacity-[var(--opacity-disabled)]'
    });
    const input = attributes({
        id: 'email',
        type: 'email',
        placeholder: 'you@ui.miel.my',
        required: values.required,
        disabled: values.disabled
    });

    return `<script lang="ts">
    import { Input } from '@mielui/svelte/components/input';
    import { Label } from '@mielui/svelte/components/label';
</script>

<div class="flex flex-col gap-1.5">
    <Label${label}>${content(values.text)}</Label>
    <Input${input} />
</div>`;
}
