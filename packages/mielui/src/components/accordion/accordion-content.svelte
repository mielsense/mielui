<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import { getContext } from 'svelte';
    import type { AccordionContentProps } from '.';

    let { class: className, children, ...rest }: AccordionContentProps = $props();
    const item = getContext<{ triggerId: string; contentId: string }>('accordion-item');
</script>

<BitsAccordion.Content forceMount id={item.contentId} {...rest}>
    {#snippet child({ props, open })}
        {#if open}
            <div
                {...props}
                data-ui="accordion-content"
                role="region"
                aria-labelledby={item.triggerId}
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
