<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HoverCardTitleProps } from '.';
    import { getHoverCardContext } from './context.svelte';

    let { children, class: className, ...rest }: HoverCardTitleProps = $props();
    const context = getHoverCardContext();

    $effect(() => {
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
        className,
        'm-0 [font-family:var(--font-header)] [font-size:var(--font-size-body)] [font-weight:var(--font-weight-header)] [letter-spacing:var(--tracking-header)] text-balance leading-tight text-foreground'
    )}
>
    {@render children?.()}
</h4>
