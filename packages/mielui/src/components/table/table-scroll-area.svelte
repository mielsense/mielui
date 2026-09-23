<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
    {...rest}
    data-ui="table-scroll-area"
    class={cn(className, 'w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain rounded-[var(--radius-lg)] focus-visible:outline-2 focus-visible:outline-primary')}
>
    {@render children?.()}
</div>
