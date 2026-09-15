<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { getToastContext } from './context.svelte';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
    const context = getToastContext();
</script>

<div
    {...rest}
    data-ui="toast-content"
    class={cn('mielui-inset-surface min-w-0 px-4 py-3 text-[length:var(--font-size-body)] leading-body text-foreground-muted break-words', className)}
>
    {#if children}
        {@render children()}
    {:else}
        {context.toast.description}
    {/if}
</div>
