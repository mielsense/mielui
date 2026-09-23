<script lang="ts">
    import { ContextMenu as MenuPrimitive } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { setContextMenuContext } from './context.svelte';

    let { children }: { children?: Snippet } = $props();
    setContextMenuContext({
        state: { open: false, checkboxItems: new Map() },
        ancestors: []
    });
</script>

<MenuPrimitive.Sub>
    {@render children?.()}
</MenuPrimitive.Sub>
