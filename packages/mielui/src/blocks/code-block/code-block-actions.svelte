<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { CodeBlockActionsProps } from '.';
    import Copy from './code-block-copy.svelte';

    let { children, class: className, copy = true, ...rest }: CodeBlockActionsProps = $props();
</script>

<div
    data-ui="code-block-actions"
    class={cn(
        className,
        'ms-auto flex items-center gap-0.5 text-[var(--color-foreground-muted)]'
    )}
    {...rest}
>
    {@render children?.()}
    {#if copy}
        <Copy />
    {/if}
</div>
