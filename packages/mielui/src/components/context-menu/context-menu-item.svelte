<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { closeMenuLayers, cn } from '@mielui/svelte/utils';
    import type { ContextMenuItemProps } from '.';
    import { getContextMenuContext } from './context.svelte';

    const { state: contextMenuState, ancestors } = getContextMenuContext();

    let {
        class: className,
        children,
        callback,
        inset = false,
        ...rest
    }: ContextMenuItemProps = $props();
</script>

<Button
    role="menuitem"
    data-collection-item
    {...rest}
    onclick={() => {
        closeMenuLayers(contextMenuState, ancestors);
        callback?.();
    }}
    class={cn(className, 'mielui-menu-item', inset && 'pl-8')}
    unstyled
>
    {@render children?.()}
</Button>
