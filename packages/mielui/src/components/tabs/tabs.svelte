<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Tabs as BitsTabs } from 'bits-ui';
    import type { TabsProps } from '.';
    import { setTabsContext } from './context.svelte';

    let {
        children,
        class: className,
        value = $bindable(''),
        onValueChange,
        orientation = 'horizontal',
        activationMode = 'automatic',
        variant = 'default',
        ...rest
    }: TabsProps = $props();

    const id = $props.id();

    function updateValue(next: string) {
        value = next;
        onValueChange?.(next);
    }

    setTabsContext({
        id,
        get value() {
            return value;
        },
        get orientation() {
            return orientation;
        },
        get variant() {
            return variant;
        },
        select: updateValue
    });
</script>

<BitsTabs.Root
    {value}
    {orientation}
    {activationMode}
    loop
    onValueChange={updateValue}
    class={cn(className, orientation === 'vertical' && 'flex items-start gap-4')}
    data-ui="tabs"
    data-orientation={orientation}
    data-variant={variant}
    {...rest}
>
    {@render children?.()}
</BitsTabs.Root>
