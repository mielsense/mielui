<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import type { AccordionItemProps } from '.';
    import { setAccordionItemContext } from './context.svelte';

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
    setAccordionItemContext({
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
    class={cn(className, 'group py-1')}
    {...rest}
>
    {@render children?.()}
</BitsAccordion.Item>
