<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Accordion as BitsAccordion } from 'bits-ui';
    import { setContext } from 'svelte';
    import type { AccordionContext, AccordionProps } from '.';

    let {
        class: className,
        type = 'single',
        value = $bindable<string | string[] | undefined>(),
        collapsible = true,
        onValueChange,
        children,
        ...rest
    }: AccordionProps = $props();

    function isOpen(itemValue: string) {
        if (type === 'multiple') {
            return Array.isArray(value) && value.includes(itemValue);
        }
        return value === itemValue;
    }

    function singleValue() {
        return typeof value === 'string' ? value : '';
    }

    function updateValue(next: string | string[]) {
        if (type === 'single' && next === '' && !collapsible) {
            return;
        }
        value = next === '' ? undefined : next;
        onValueChange?.(value);
    }

    const ctx: AccordionContext = { isOpen, toggle: updateValue };
    setContext('accordion', ctx);
</script>

{#if type === 'multiple'}
    <BitsAccordion.Root
        type="multiple"
        value={Array.isArray(value) ? value : []}
        onValueChange={updateValue}
        data-ui="accordion"
        data-type={type}
        class={cn(
        className,
        'divide-y-[length:var(--border-size)] divide-border'
    )}
        {...rest}
    >
        {@render children?.()}
    </BitsAccordion.Root>
{:else}
    <BitsAccordion.Root
        type="single"
        bind:value={singleValue, updateValue}
        data-ui="accordion"
        data-type={type}
        class={cn(
        className,
        'divide-y-[length:var(--border-size)] divide-border'
    )}
        {...rest}
    >
        {@render children?.()}
    </BitsAccordion.Root>
{/if}
