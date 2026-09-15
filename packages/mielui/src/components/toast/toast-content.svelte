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
    class={cn('mielui-inset-surface flex min-h-18 min-w-0 flex-col justify-center px-4 py-4 text-[length:var(--font-size-body)] leading-body text-foreground-muted break-words', className)}
>
    {#if children}
        {@render children()}
    {:else}
        {context.toast.description}
    {/if}
</div>
