<script lang="ts">
    import { ContextMenu as MenuPrimitive } from 'bits-ui';
    import type { Snippet } from 'svelte';

    let { children }: { children?: Snippet } = $props();
</script>

<MenuPrimitive.Sub> {@render children?.()} </MenuPrimitive.Sub>
