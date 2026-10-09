<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import { onDestroy, untrack } from 'svelte';
    import { disclosureSlide } from '../_internal/disclosure/slide';
    import type { AccordionContentProps } from '.';
    import { getAccordionItemContext } from './item-context';

    let { class: className, children, ...rest }: AccordionContentProps = $props();
    const item = getAccordionItemContext();
    const resolvedId = `${item.id}-content`;
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
                transition:disclosureSlide
                class={cn(
                    className,
                    'overflow-hidden [font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] leading-relaxed text-pretty text-foreground-muted'
                )}
            >
                <div class="px-2 pt-0.5 pb-3">
                    {@render children?.()}
                </div>
            </div>
        {/if}
    {/snippet}
</BitsAccordion.Content>
