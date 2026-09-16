<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Tabs as BitsTabs } from 'bits-ui';
    import { setContext } from 'svelte';
    import type { TabsProps } from '.';

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
    setContext('tabs', {
        id,
        get value() {
            return value;
        },
        get orientation() {
            return orientation;
        },
        get variant() {
            return variant;
        }
    });

    setContext('tabs-selection', updateValue);

    function updateValue(next: string) {
        value = next;
        onValueChange?.(next);
    }
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
