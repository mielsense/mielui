<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getContext, onMount, type Snippet } from 'svelte';

    let {
        children,
        class: classProp,
        ...rest
    }: {
        children: Snippet;
        class?: string;
    } = $props();
    const context = getContext<{ id: string; state: { title: boolean; description: boolean } }>(
        'mielui-hover-card'
    );
    onMount(() => {
        context.state.title = true;
        return () => {
            context.state.title = false;
        };
    });
</script>

<h4
    id={`${context.id}-title`}
    {...rest}
    class={cn(
        classProp,
        'm-0 [font-family:var(--font-header)] [font-size:var(--font-size-body)] [font-weight:var(--font-weight-header)] [letter-spacing:var(--tracking-header)] text-balance leading-tight text-foreground'
    )}
>
    {@render children?.()}
</h4>
