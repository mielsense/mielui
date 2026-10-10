import { type PlaygroundValues, select, toggle } from '$lib/components/docs/playground';

export const controls = {
    handle: select('Handle', ['start', 'end'], 'start'),
    duration: toggle('Duration', 'Content', true),
    disabled: toggle('Disabled', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const disabled = values.disabled
        ? `
    disabled`
        : '';
    const end = values.handle === 'end';
    const indent = end ? '                ' : '        ';
    const content = values.duration
        ? `${indent}<span class="flex min-w-0 items-center justify-between gap-4">
${indent}    <span class="truncate font-medium">{item.name}</span>
${indent}    <span class="shrink-0 text-xs text-foreground-muted tabular-nums">
${indent}        {item.duration}
${indent}    </span>
${indent}</span>`
        : `${indent}<span class="truncate font-medium">{item.name}</span>`;
    const body = end
        ? `    {#snippet row(item)}
        <ReorderList.Item id={item.id} label={item.name}>
            <ReorderList.Content class="ps-1.5">
${content}
            </ReorderList.Content>
            <ReorderList.Handle />
        </ReorderList.Item>
    {/snippet}`
        : `    {#snippet children(item)}
${content}
    {/snippet}`;

    return `<script lang="ts">
    import * as ReorderList from '@mielui/svelte/components/reorder-list';

    let items = $state([
        { id: 'opening', name: 'Opening remarks', duration: '5 min' },
        { id: 'roadmap', name: 'Roadmap review', duration: '15 min' },
        { id: 'critique', name: 'Design critique', duration: '20 min' },
        { id: 'questions', name: 'Open questions', duration: '10 min' }
    ]);
</script>

<ReorderList.Root
    bind:items
    getId={(item) => item.id}
    getLabel={(item) => item.name}
    label="Meeting agenda"${disabled}
    class="w-full max-w-sm"
>
${body}
</ReorderList.Root>`;
}
