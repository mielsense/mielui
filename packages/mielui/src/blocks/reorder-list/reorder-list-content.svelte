<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ReorderListContentProps } from '.';

    let { children, class: className, ...rest }: ReorderListContentProps = $props();
</script>
<div {...rest} data-ui="reorder-list-content" class={cn(className, 'min-w-0 flex-1')}>
    {@render children?.()}
</div>
