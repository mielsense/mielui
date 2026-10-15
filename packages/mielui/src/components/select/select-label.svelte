<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { SelectLabelProps } from '.';

    let { children, class: className }: SelectLabelProps = $props();
</script>

<div data-ui="select-label" class={cn(className, 'mielui-menu-label')}>
    {@render children?.()}
</div>
