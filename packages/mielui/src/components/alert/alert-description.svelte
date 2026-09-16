<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';

    let {
        children,
        class: classProp,
        ...rest
    }: {
        children: Snippet;
        class?: string;
    } = $props();
</script>

<p
    {...rest}
    data-ui="alert-description"
    class={cn(
        classProp,
        'mielui-inset-surface col-span-2 row-start-1 m-0 flex min-h-18 min-w-0 flex-col justify-center px-4 py-4 [font-size:var(--font-size-body)] leading-body [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] break-words text-foreground-muted'
    )}
>
    {@render children?.()}
</p>
