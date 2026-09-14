<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ContextMenuSeparatorProps } from '.';

    let { children, class: className, ...rest }: ContextMenuSeparatorProps = $props();
</script>

<div {...rest} data-ui="menu-separator" class={cn(className, 'mielui-menu-separator')}>
    {@render children?.()}
</div>
