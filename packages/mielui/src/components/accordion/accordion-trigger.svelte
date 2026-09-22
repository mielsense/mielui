<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import { getContext } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { AccordionContext, AccordionTriggerProps } from '.';

    let { class: className, children, ...rest }: AccordionTriggerProps = $props();

    const ctx = getContext<AccordionContext>('accordion');
    const item = getContext<{
        value: string;
        disabled: boolean;
        triggerId: string;
        contentId: string;
    }>('accordion-item');
    const open = $derived(ctx.isOpen(item.value));
</script>

<BitsAccordion.Header>
    <BitsAccordion.Trigger id={item.triggerId} {...rest}>
        {#snippet child({ props })}
            <button
                {...props}
                type="button"
                aria-controls={open ? item.contentId : undefined}
                use:pressable
                data-ui="accordion-trigger"
                data-state={open ? 'open' : 'closed'}
                class={cn(
        className,
        'mielui-press flex w-full items-center justify-between gap-3 py-4 text-left text-[length:var(--font-size-header)] [font-weight:var(--font-weight-button)] [letter-spacing:var(--tracking-button)] text-foreground transition-[color,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]'
    )}
            >
                {@render children?.()}
                <HugeiconsIcon
                    icon={ChevronDown}
                    size={16}
                    class={cn(
            'shrink-0 text-foreground-muted transition-transform [transition-duration:var(--motion-duration-panel)] ease-out motion-reduce:transition-none',
            open && 'rotate-180'
        )}
                />
            </button>
        {/snippet}
    </BitsAccordion.Trigger>
</BitsAccordion.Header>
