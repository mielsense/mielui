<script lang="ts">
    import * as Table from '@mielui/svelte/components/table';
    import type { ReferenceProperty } from '$lib/server/api-reference';

    let { properties }: { properties: ReferenceProperty[] } = $props();
</script>

<div class="@container min-w-0">
    <Table.ScrollArea>
        <Table.Root
            variant="inset"
            class="table-fixed text-start @max-xl:block @max-xl:[&>tbody]:block"
        >
            <Table.Header class="@max-xl:sr-only">
                <Table.Row class="hover:bg-transparent">
                    <Table.Head class="px-4 py-2 @xl:w-[30%]">Prop</Table.Head>
                    <Table.Head class="px-4 py-2">Type</Table.Head>
                    <Table.Head class="hidden w-1/5 px-4 py-2 @xl:table-cell">Default</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each properties as property (property.name)}
                    <Table.Row class="align-top hover:bg-transparent @max-xl:block">
                        <Table.Head
                            {...{ scope: 'row' as const }}
                            class="border-b-0 px-4 py-3 align-top font-normal @max-xl:block @max-xl:border-b-0! @max-xl:pb-1"
                        >
                            <code class="font-mono break-words text-foreground">
                                {property.name}
                            </code>
                            {#if property.required || property.bindable}
                                <span
                                    class="mt-1 flex flex-wrap gap-x-2 text-xs text-foreground-muted"
                                >
                                    {#if property.required}
                                        <span>Required</span>
                                    {/if}
                                    {#if property.bindable}
                                        <span>Bindable</span>
                                    {/if}
                                </span>
                            {/if}
                        </Table.Head>
                        <Table.Cell class="px-4 py-3 align-top @max-xl:block @max-xl:pt-0">
                            <code
                                class="font-mono text-xs leading-5 whitespace-pre-wrap break-words text-foreground-muted"
                            >
                                {property.type}
                            </code>
                            {#if property.description}
                                <p class="mt-2 text-sm leading-6 text-foreground-muted">
                                    {property.description}
                                </p>
                            {/if}
                            {#if property.default}
                                <p
                                    class="mt-2 flex min-w-0 gap-1.5 text-xs leading-5 text-foreground-muted @xl:hidden"
                                >
                                    <span>Default</span>
                                    <code class="min-w-0 font-mono break-words text-foreground">
                                        {property.default}
                                    </code>
                                </p>
                            {/if}
                        </Table.Cell>
                        <Table.Cell class="hidden px-4 py-3 align-top @xl:table-cell">
                            <code
                                class="font-mono text-xs leading-5 break-words text-foreground-muted"
                            >
                                {property.default ?? '—'}
                            </code>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </Table.ScrollArea>
</div>
