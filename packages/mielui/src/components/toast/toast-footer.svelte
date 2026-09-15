<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
    {...rest}
    data-ui="toast-footer"
    class={cn('flex flex-wrap items-center gap-2 px-2 py-1', className)}
>
    {#if children}
        {@render children()}
    {/if}
</div>
