<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { ContextMenu as MenuPrimitive } from 'bits-ui';
    import type { ContextMenuSeparatorProps } from '.';

    let { children, class: className, ...rest }: ContextMenuSeparatorProps = $props();
</script>

<MenuPrimitive.Separator
    {...rest}
    data-ui="menu-separator"
    class={cn(className, 'mielui-menu-separator')}
>
    {@render children?.()}
</MenuPrimitive.Separator>
