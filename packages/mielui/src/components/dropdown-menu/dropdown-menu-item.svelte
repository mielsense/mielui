<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { closeMenuLayers, cn } from '@mielui/svelte/utils';
    import { getPopoverContext } from '../popover/context.svelte';
    import type { DropdownMenuItemProps } from '.';
    import { getDropdownMenuContext } from './context.svelte';

    const { state: popoverState } = getPopoverContext();
    const { ancestors } = getDropdownMenuContext();

    let {
        children,
        class: className,
        callback,
        onclick: userOnclick,
        element = $bindable(),
        ...rest
    }: DropdownMenuItemProps = $props();
</script>

<Button
    bind:element
    role="menuitem"
    data-collection-item
    {...rest}
    onclick={(event: MouseEvent) => {
        closeMenuLayers(popoverState, ancestors);
        callback?.();
        userOnclick?.(event);
    }}
    class={cn(className, 'mielui-menu-item flex-row gap-3 text-sm')}
    unstyled
>
    {@render children?.()}
</Button>
