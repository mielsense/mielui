<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import { getContext, onDestroy, untrack } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import {
        DISCLOSURE_ICON_SIZE,
        disclosureChevron,
        disclosureTrigger
    } from '../_internal/disclosure/variants';
    import type { AccordionContext, AccordionTriggerProps } from '.';
    import { getAccordionItemContext } from './item-context';

    let { class: className, children, ...rest }: AccordionTriggerProps = $props();

    const ctx = getContext<AccordionContext>('accordion');
    const item = getAccordionItemContext();
    const resolvedId = `${item.id}-trigger`;
    const readId = () => {
        return resolvedId;
    };
    untrack(() => {
        item.trigger = readId;
    });
    onDestroy(() => {
        if (item.trigger === readId) {
            item.trigger = undefined;
        }
    });
    const open = $derived(ctx.isOpen(item.value));
</script>

<BitsAccordion.Header>
    <BitsAccordion.Trigger id={resolvedId} {...rest}>
        {#snippet child({ props })}
            <button
                {...props}
                type="button"
                aria-controls={open ? item.content?.() : undefined}
                use:pressable
                data-ui="accordion-trigger"
                data-state={open ? 'open' : 'closed'}
                class={cn(
                    className,
                    'min-h-[var(--size-control-md)] justify-between gap-3 py-1.5 text-[length:var(--font-size-header)] font-medium [letter-spacing:var(--tracking-header)] leading-snug text-foreground',
                    disclosureTrigger({ layout: 'row' })
                )}
            >
                {@render children?.()}
                <HugeiconsIcon
                    icon={ChevronDown}
                    size={DISCLOSURE_ICON_SIZE}
                    aria-hidden="true"
                    class={disclosureChevron({ open })}
                />
            </button>
        {/snippet}
    </BitsAccordion.Trigger>
</BitsAccordion.Header>
