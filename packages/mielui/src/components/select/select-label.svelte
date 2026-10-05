<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';

    let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div data-ui="select-label" class={cn(className, 'mielui-menu-label')}>
    {@render children?.()}
</div>
