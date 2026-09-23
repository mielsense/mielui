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
        context.state.description = true;
        return () => {
            context.state.description = false;
        };
    });
</script>

<p
    id={`${context.id}-description`}
    {...rest}
    class={cn(
        classProp,
        'm-0 [font-size:var(--font-size-body)] leading-body [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-pretty text-foreground'
    )}
>
    {@render children?.()}
</p>
