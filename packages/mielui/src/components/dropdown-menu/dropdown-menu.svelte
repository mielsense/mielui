<script lang="ts">
    import { DropdownMenu as MenuPrimitive } from 'bits-ui';
    import type { DropdownMenuProps } from '.';
    import { type DropdownMenuContext, setDropdownMenuContext } from './context.svelte';

    let { children, open = $bindable(false), onOpenChange }: DropdownMenuProps = $props();
    const menu = $state<DropdownMenuContext>({});
    setDropdownMenuContext(menu);
</script>

<MenuPrimitive.Root
    bind:open
    onOpenChange={(next) => {
    if (next) {
        menu.beforeOpen?.();
    }
    onOpenChange?.(next);
}}
>
    {@render children?.()}
</MenuPrimitive.Root>
