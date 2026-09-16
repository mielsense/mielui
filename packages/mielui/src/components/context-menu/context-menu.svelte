<script lang="ts">
    import { ContextMenu as MenuPrimitive } from 'bits-ui';
    import type { ContextMenuProps } from '.';
    import { setContextMenuContext } from './context.svelte';

    let { children, open = $bindable(false), onOpenChange }: ContextMenuProps = $props();
    setContextMenuContext({
        state: {
            get open() {
                return open;
            },
            set open(next) {
                open = next;
            },
            checkboxItems: new Map()
        },
        ancestors: []
    });
</script>

<MenuPrimitive.Root bind:open {onOpenChange}>
    {@render children?.()}
</MenuPrimitive.Root>
