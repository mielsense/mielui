<script lang="ts">
    import { panelIn } from '@mielui/svelte/transition';
    import { prefersReducedMotion } from 'svelte/motion';

    function enter(node: Element) {
        const config = panelIn(node);
        return { ...config, duration: prefersReducedMotion.current ? 0 : config.duration };
    }

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
        {#key context.toast.title}
            <span class="block" in:enter>{context.toast.title}</span>
        {/key}
    {/if}
</p>
