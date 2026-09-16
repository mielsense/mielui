<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { PopoverTitleProps } from '.';
    import { getPopoverContext } from './context.svelte';

    const popover = getPopoverContext();
    const key = popover.id;

    $effect(() => {
        popover.titleId = `popover-${String(key)}-title`;
        return () => {
            popover.titleId = undefined;
        };
    });

    let { children, class: classProp, ...rest }: PopoverTitleProps = $props();
</script>

<p
    id={`popover-${String(key)}-title`}
    {...rest}
    class={cn(
        classProp,
        'text-foreground [font-family:var(--font-header)] [font-size:var(--font-size-header)] [font-weight:var(--font-weight-header)] [letter-spacing:var(--tracking-header)] text-balance'
    )}
>
    {@render children?.()}
</p>
