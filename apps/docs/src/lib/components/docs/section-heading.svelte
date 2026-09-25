<script lang="ts">
    import { InformationCircleIcon } from '@hugeicons/core-free-icons';
    import * as HoverCard from '@mielui/svelte/components/hover-card';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';

    let { title, description }: { title: string; description?: Snippet } = $props();
</script>

<div class="flex items-center gap-2">
    <h2 class="docs-section-heading">{title}</h2>
    {#if description}
        <HoverCard.Root>
            <HoverCard.Trigger
                class="inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-background/70 hover:bg-background/15 hover:text-background focus-visible:outline-2 focus-visible:outline-primary"
            >
                <span class="sr-only">{`About ${title.toLowerCase()}`}</span>
                <HugeiconsIcon icon={InformationCircleIcon} size={15} aria-hidden="true" />
            </HoverCard.Trigger>
            <HoverCard.Content
                side="bottom"
                align="start"
                class="w-80 max-w-[calc(100vw-2rem)] text-sm leading-6 text-foreground-muted"
            >
                {@render description()}
            </HoverCard.Content>
        </HoverCard.Root>
    {/if}
</div>
