<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Drawer as Primitive } from 'vaul-svelte';
    import { button } from '../button/variants';
    import type { DrawerCloseProps } from '.';
    import { getDrawerContext } from './context';

    let {
        element = $bindable(null),
        children,
        onclick,
        class: className,
        ...rest
    }: DrawerCloseProps = $props();
    const drawer = getDrawerContext();
    function activate(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        onclick?.(event);
        if (!event.defaultPrevented) {
            drawer.close();
        }
    }
</script>
<Primitive.Close {...rest} onclick={activate} bind:ref={element}>
    {#snippet child({ props })}
        <button
            type="button"
            {...props}
            use:pressable
            data-ui="drawer-close"
            class={cn(className, button({ variant: 'secondary', size: 'md' }))}
        >
            {@render children?.()}
        </button>
    {/snippet}
</Primitive.Close>
