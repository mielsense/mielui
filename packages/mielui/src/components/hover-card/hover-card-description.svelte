<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HoverCardDescriptionProps } from '.';
    import { getHoverCardContext } from './context.svelte';

    let { children, class: className, ...rest }: HoverCardDescriptionProps = $props();
    const context = getHoverCardContext();

    $effect(() => {
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
        className,
        'm-0 [h4+&]:mt-1 [font-size:var(--font-size-body)] leading-body [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-pretty text-foreground-muted'
    )}
>
    {@render children?.()}
</p>
