<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import { setContext } from 'svelte';
    import type { AccordionItemProps } from '.';
    import type { AccordionItemContext } from './item-context';

    let {
        class: className,
        value,
        disabled = false,
        children,
        ...rest
    }: AccordionItemProps = $props();
    const uid = $props.id();
    let trigger = $state<(() => string) | undefined>();
    let content = $state<(() => string) | undefined>();
    setContext<AccordionItemContext>('accordion-item', {
        id: uid,
        get trigger() {
            return trigger;
        },
        set trigger(value) {
            trigger = value;
        },
        get content() {
            return content;
        },
        set content(value) {
            content = value;
        },
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
