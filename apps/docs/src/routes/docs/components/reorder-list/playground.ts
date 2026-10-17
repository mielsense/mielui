import {
    expression,
    literal,
    type PlaygroundValues,
    select,
    tag,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    handle: select('Handle', ['start', 'end'], 'start'),
    disabled: toggle('Disabled', 'State')
};

export const agenda = [
    {
        id: 'opening',
        name: 'Opening remarks',
        duration: '5 min'
    },
    {
        id: 'roadmap',
        name: 'Roadmap review',
        duration: '15 min'
    },
    {
        id: 'critique',
        name: 'Design critique',
        duration: '20 min'
    },
    {
        id: 'questions',
        name: 'Open questions',
        duration: '10 min'
    }
];

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = tag(
        'ReorderList.Root',
        {
            getId: expression('(item) => item.id'),
            getLabel: expression('(item) => item.name'),
            label: 'Meeting agenda',
            disabled: values.disabled,
            class: 'w-full max-w-sm'
        },
        '>',
        '',
        ['bind:items']
    );
    const items = agenda.map((item) => `        ${literal(item)}`).join(',\n');
    const end = values.handle === 'end';
    const indent = end ? '                ' : '        ';
    const content = `${indent}<span class="flex min-w-0 items-center justify-between gap-4">
${indent}    <span class="truncate font-medium">{item.name}</span>
${indent}    <span class="shrink-0 text-xs text-foreground-muted tabular-nums">
${indent}        {item.duration}
${indent}    </span>
${indent}</span>`;
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
${items}
    ]);
</script>

${root}
${body}
</ReorderList.Root>`;
}
