<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import { travelingHighlight } from '@mielui/svelte/utils';
    import { Combobox as ComboboxPrimitive } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { getComboboxContext } from './context.svelte';

    let { children }: { children?: Snippet } = $props();
    const context = getComboboxContext();
</script>

<ScrollArea class="min-h-0 min-w-0 max-h-[inherit] flex-1">
    <ComboboxPrimitive.Viewport id={`combobox-${context.id}-listbox`} role="listbox">
        {#snippet child({ props })}
            <div
                {...props}
                role="listbox"
                aria-labelledby={context.trigger?.id || undefined}
                aria-label={context.trigger?.id ? undefined : 'Options'}
                data-ui="combobox-results"
                use:travelingHighlight
                class="mielui-collection-surface flex flex-col gap-0 p-1"
            >
                {@render children?.()}
                {#if context.state.searchContent !== '' && context.state.results.size === 0}
                    <div class="flex w-full items-center justify-center p-3">
                        <p
                            class="[font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-foreground-muted"
                        >
                            No results found
                        </p>
                    </div>
                {/if}
            </div>
        {/snippet}
    </ComboboxPrimitive.Viewport>
</ScrollArea>
