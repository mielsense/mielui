<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { TableHeaderProps } from '.';

    let { children, class: className, ...rest }: TableHeaderProps = $props();
</script>

<thead {...rest} data-ui="table-header" class={cn(className, 'text-foreground-muted')}>
    {@render children?.()}
</thead>
