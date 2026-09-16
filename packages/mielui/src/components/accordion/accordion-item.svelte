<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import { setContext } from 'svelte';
    import type { AccordionItemProps } from '.';

    let {
        class: className,
        value,
        disabled = false,
        children,
        ...rest
    }: AccordionItemProps = $props();
    setContext('accordion-item', {
        get value() {
            return value;
        },
        get disabled() {
            return disabled;
        }
    });
</script>

<BitsAccordion.Item
    {value}
    {disabled}
    data-ui="accordion-item"
    data-value={value}
    data-disabled={disabled ? '' : undefined}
    class={cn(className, 'group')}
    {...rest}
>
    {@render children?.()}
</BitsAccordion.Item>
