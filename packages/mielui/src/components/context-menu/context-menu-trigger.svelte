<script lang="ts">
    import { ContextMenu as MenuPrimitive } from 'bits-ui';
    import type { ContextMenuTriggerProps } from '.';

    let { class: className, children, ...rest }: ContextMenuTriggerProps = $props();
</script>

<MenuPrimitive.Trigger {...rest} class={className} tabindex={0}>
    {@render children?.()}
</MenuPrimitive.Trigger>
