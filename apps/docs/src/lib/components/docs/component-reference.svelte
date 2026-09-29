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

    function nameOf(part: ReferencePart) {
        if (part.name === title || part.name === 'Toaster') {
            return part.name;
        }

        return `${title}.${part.name}`;
    }
</script>

<section id="api-reference" class="mt-12 flex min-w-0 flex-col gap-8">
    <SectionHeading title="API reference">
        {#snippet description()}
            Props for every exported part. Required and bindable values are marked. A dash means no
            explicit default is set on that part.
        {/snippet}
    </SectionHeading>
    {#each ordered as part (part.name)}
        {const own = $derived(part.properties.filter((property) => !property.inherited))}
        {const inherited = $derived(part.properties.filter((property) => property.inherited))}
        {const description = $derived(
            anatomy.find((item) => item.name === nameOf(part))?.description
        )}
        <section class="flex min-w-0 flex-col gap-3">
            <div class="flex flex-col gap-1">
                <h3 class="font-mono text-base font-medium text-foreground">{nameOf(part)}</h3>
                {#if description}
                    <p class="text-sm leading-6 text-foreground-muted">{description}</p>
                {/if}
            </div>
            {#if own.length}
                <PropTable properties={own} />
            {/if}
            {#if inherited.length}
                <Collapsible.Root>
                    <Collapsible.Trigger
                        class="group -ms-2 text-sm text-foreground-muted hover:text-foreground"
                    >
                        <span>HTML attributes and events</span>
                        <span class="tabular-nums">({inherited.length})</span>
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
            {:else if !own.length}
                <p class="text-sm text-foreground-muted">This part does not accept props.</p>
            {/if}
        </section>
    {/each}
</section>
