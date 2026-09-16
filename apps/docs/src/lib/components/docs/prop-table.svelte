<script lang="ts">
    import * as Table from '@mielui/svelte/components/table';
    import type { ReferenceProperty } from '$lib/server/api-reference';

    let { properties }: { properties: ReferenceProperty[] } = $props();
</script>
<Table.ScrollArea>
    <Table.Root class="min-w-[34rem] text-left">
        <Table.Header class="bg-secondary/40 text-foreground-muted">
            <Table.Row>
                <Table.Head class="w-1/5 px-4 py-3 font-medium">Prop</Table.Head>
                <Table.Head class="px-4 py-3 font-medium">Type</Table.Head>
                <Table.Head class="w-1/5 px-4 py-3 font-medium">Default</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each properties as property (property.name)}
                <Table.Row class="align-top hover:bg-transparent">
                    <Table.Head
                        {...{ scope: 'row' as const }}
                        class="px-4 py-3 text-left font-normal"
                    >
                        <code class="font-mono text-foreground">{property.name}</code>
                        {#if property.required}
                            <span class="mt-1 block text-xs text-foreground-muted">Required</span>
                        {/if}
                        {#if property.bindable}
                            <span class="mt-1 block text-xs text-primary">Bindable</span>
                        {/if}
                    </Table.Head>
                    <Table.Cell class="max-w-[30rem] px-4 py-3">
                        <code
                            class="whitespace-pre-wrap break-words font-mono text-xs leading-5 text-foreground-muted"
                        >
                            {property.type}
                        </code>
                        {#if property.description}
                            <p class="mt-2 text-sm leading-6 text-foreground-muted">
                                {property.description}
                            </p>
                        {/if}
                    </Table.Cell>
                    <Table.Cell class="max-w-[12rem] px-4 py-3">
                        <code class="break-words font-mono text-xs leading-5 text-foreground-muted">
                            {property.default ?? '—'}
                        </code>
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</Table.ScrollArea>
