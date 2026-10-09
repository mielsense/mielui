<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<thead {...rest} data-ui="table-header" class={cn(className, 'text-foreground-muted')}>
    {@render children?.()}
</thead>
