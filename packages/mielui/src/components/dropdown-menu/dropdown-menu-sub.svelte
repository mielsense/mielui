<script lang="ts">
    import { DropdownMenu as MenuPrimitive } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { type DropdownMenuContext, setDropdownMenuContext } from './context.svelte';

    let { children }: { children?: Snippet } = $props();
    const menu = $state<DropdownMenuContext>({});
    setDropdownMenuContext(menu);
</script>

<MenuPrimitive.Sub
    onOpenChange={(next) => {
    if (next) {
        menu.beforeOpen?.();
    }
}}
>
    {@render children?.()}
</MenuPrimitive.Sub>
