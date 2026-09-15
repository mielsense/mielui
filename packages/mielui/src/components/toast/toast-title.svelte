<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { getToastContext } from './context.svelte';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLParagraphElement> = $props();
    const context = getToastContext();
</script>

<p
    {...rest}
    data-ui="toast-title"
    class={cn(className, 'min-w-0 flex-1 text-[length:var(--font-size-label)] font-[number:var(--font-weight-label)] leading-snug text-foreground break-words')}
>
    {#if children}
        {@render children()}
    {:else}
        {context.toast.title}
    {/if}
</p>
