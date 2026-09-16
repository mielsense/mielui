<script lang="ts">
    import { ArrowRight01Icon as Chevron } from '@hugeicons/core-free-icons';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { ComponentPart } from '$lib/component-anatomy';
    import type { ReferencePart } from '$lib/server/api-reference';
    import PropTable from './prop-table.svelte';

    let {
        parts,
        title,
        anatomy = []
    }: { parts: ReferencePart[]; title: string; anatomy?: readonly ComponentPart[] } = $props();
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
        return part.name === title || part.name === 'Toaster' ? part.name : `${title}.${part.name}`;
    }
</script>
<section id="api-reference" class="mt-12 flex min-w-0 flex-col gap-8">
    <div class="flex flex-col gap-2">
        <h2 class="docs-section-heading">API reference</h2>
        <p class="text-sm leading-6 text-foreground-muted">
            Props for every exported part. Required and bindable values are marked. A dash means no
            explicit default is set on that part.
        </p>
    </div>
    {#each ordered as part (part.name)}
        {@const own = part.properties.filter((property) => !property.inherited)}
        {@const inherited = part.properties.filter((property) => property.inherited)}
        {@const description = anatomy.find((item) => item.name === nameOf(part))?.description}
        <section class="flex min-w-0 flex-col gap-4">
            <div class="flex flex-col gap-2">
                <h3 class="font-mono text-base font-medium text-foreground">{nameOf(part)}</h3>
                {#if description}
                    <p class="text-sm text-foreground-muted">{description}</p>
                {/if}
            </div>
            {#if own.length}
                <PropTable properties={own} />
            {/if}
            {#if inherited.length}
                <Collapsible.Root>
                    <Collapsible.Trigger
                        class="group w-fit rounded-md py-2 text-sm text-foreground-muted hover:text-foreground"
                    >
                        <HugeiconsIcon
                            icon={Chevron}
                            size={14}
                            class="transition-transform duration-200 group-data-[state=open]:rotate-90 motion-reduce:transition-none"
                        />
                        <span>HTML attributes and events ({inherited.length})</span>
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        <div class="pt-3"><PropTable properties={inherited} /></div>
                    </Collapsible.Content>
                </Collapsible.Root>
            {:else if !own.length}
                <p class="text-sm text-foreground-muted">This part does not accept props.</p>
            {/if}
        </section>
    {/each}
</section>
