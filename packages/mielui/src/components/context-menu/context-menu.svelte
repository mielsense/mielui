<script lang="ts">
    import { ContextMenu as MenuPrimitive } from 'bits-ui';
    import type { ContextMenuProps } from '.';
    import { setContextMenuContext } from './context.svelte';

    let { children }: ContextMenuProps = $props();
    setContextMenuContext({
        state: { open: false, checkboxItems: new Map() },
        ancestors: []
    });
</script>

<MenuPrimitive.Root>
    {@render children?.()}
</MenuPrimitive.Root>
