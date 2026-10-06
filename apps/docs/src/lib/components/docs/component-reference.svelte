<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { ComponentPart } from '$lib/component-anatomy';
    import type { ReferencePart } from '$lib/server/api-reference';
    import PropTable from './prop-table.svelte';
    import SectionHeading from './section-heading.svelte';

    let {
        parts,
        title,
        anatomy = []
    }: {
        parts: ReferencePart[];
        title: string;
        anatomy?: readonly ComponentPart[];
    } = $props();

    const ordered = $derived(
        [...parts].sort((left, right) => {
            if (left.name === 'Root') {
                return -1;
            }

            if (right.name === 'Root') {
                return 1;
            }

            return 0;
        })
    );

    const withProps = $derived(
        ordered.filter((part) => part.properties.some((property) => !property.inherited))
    );
    const withoutProps = $derived(
        ordered.filter((part) => part.properties.every((property) => property.inherited))
    );

    function describe(part: ReferencePart) {
        return anatomy.find((item) => item.name === nameOf(part))?.description;
    }

    function nameOf(part: ReferencePart) {
        if (part.name === title || part.name === 'Toaster') {
            return part.name;
        }

        return `${title}.${part.name}`;
    }
</script>

<section id="api-reference" class="flex min-w-0 flex-col gap-8">
    <SectionHeading title="API reference">
        {#snippet description()}
            Props for every exported part. Required and bindable values are marked.
        {/snippet}
    </SectionHeading>
    {#each withProps as part (part.name)}
        {const own = $derived(part.properties.filter((property) => !property.inherited))}
        {const inherited = $derived(part.properties.filter((property) => property.inherited))}
        {const description = $derived(describe(part))}
        <section class="flex min-w-0 flex-col gap-3">
            <div class="flex flex-col gap-1">
                <h3>{nameOf(part)}</h3>
                {#if description}
                    <p class="m-0 text-sm leading-6 text-foreground-muted">{description}</p>
                {/if}
            </div>
            <PropTable properties={own} />
            {#if inherited.length}
                <Collapsible.Root>
                    <Collapsible.Trigger
                        class="group -ms-2 text-sm font-normal text-foreground-muted hover:text-foreground"
                    >
                        <span>
                            <span class="tabular-nums">{inherited.length}</span>
                            HTML attributes and events
                        </span>
                        <HugeiconsIcon
                            icon={ChevronDown}
                            size={14}
                            aria-hidden="true"
                            class="shrink-0 transition-transform [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                        />
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        <div class="pt-3">
                            <PropTable properties={inherited} />
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            {/if}
        </section>
    {/each}
    {#if withoutProps.length}
        <section class="flex min-w-0 flex-col gap-3">
            <div class="flex flex-col gap-1">
                <h3>{withProps.length ? 'Other parts' : 'Parts'}</h3>
                <p class="m-0 text-sm leading-6 text-foreground-muted">
                    These parts have no props of their own. They pass HTML attributes and events to
                    their element.
                </p>
            </div>
            <div class="mielui-inset-frame">
                <ul
                    class="mielui-inset-surface m-0 flex list-none flex-col divide-y-[length:var(--border-size)] divide-[var(--docs-rule,var(--color-border))] overflow-hidden p-0"
                >
                    {#each withoutProps as part (part.name)}
                        <li
                            class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3"
                        >
                            <code class="font-mono text-[13px] leading-6 text-foreground">
                                {nameOf(part)}
                            </code>
                            {#if describe(part)}
                                <span class="text-sm leading-6 text-foreground-muted">
                                    {describe(part)}
                                </span>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </div>
        </section>
    {/if}
</section>
