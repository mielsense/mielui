<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Drawer as Primitive } from 'vaul-svelte';
    import { button } from '../button/variants';
    import type { DrawerTriggerProps } from '.';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: DrawerTriggerProps = $props();
</script>
<Primitive.Trigger {...rest} bind:ref={element}>
    {#snippet child({ props })}
        <button
            type="button"
            {...props}
            use:pressable
            data-ui="drawer-trigger"
            class={cn(className, button({ variant: 'primary', size: 'md' }))}
        >
            {@render children?.()}
        </button>
    {/snippet}
</Primitive.Trigger>
