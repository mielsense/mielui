<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import { onDestroy, untrack } from 'svelte';
    import type { AccordionContentProps } from '.';
    import { getAccordionItemContext } from './item-context';

    let { class: className, children, id, ...rest }: AccordionContentProps = $props();
    const item = getAccordionItemContext();
    const resolvedId = $derived(id ?? `${item.id}-content`);
    const readId = () => {
        return resolvedId;
    };
    untrack(() => {
        item.content = readId;
    });
    onDestroy(() => {
        if (item.content === readId) {
            item.content = undefined;
        }
    });
</script>

<BitsAccordion.Content forceMount id={resolvedId} {...rest}>
    {#snippet child({ props, open })}
        {#if open}
            <div
                {...props}
                data-ui="accordion-content"
                role={item.trigger ? 'region' : undefined}
                aria-labelledby={item.trigger?.()}
                data-state="open"
                transition:themedSlide={{ durationVar: '--motion-duration-panel', fallback: 220 }}
                class={cn(
            className,
            'overflow-hidden [font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-foreground-muted'
        )}
            >
                <div class="pb-4">
                    {@render children?.()}
                </div>
            </div>
        {/if}
    {/snippet}
</BitsAccordion.Content>
