<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import type { AccordionContentProps } from '.';

    let { class: className, children, ...rest }: AccordionContentProps = $props();
</script>

<BitsAccordion.Content forceMount {...rest}>
    {#snippet child({ props, open })}
        {#if open}
            <div
                {...props}
                data-ui="accordion-content"
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
