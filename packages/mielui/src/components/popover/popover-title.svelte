<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { PopoverTitleProps } from '.';
    import { getPopoverContext } from './context.svelte';

    let { children, class: className, ...rest }: PopoverTitleProps = $props();

    const popover = getPopoverContext();
    const id = `popover-${popover.id}-title`;

    $effect(() => {
        popover.titleId = id;

        return () => {
            if (popover.titleId === id) {
                popover.titleId = undefined;
            }
        };
    });
</script>

<p
    {id}
    {...rest}
    class={cn(
        className,
        'm-0 [font-family:var(--font-header)] [font-size:var(--font-size-body)] [font-weight:var(--font-weight-header)] [letter-spacing:var(--tracking-header)] text-balance leading-tight text-foreground'
    )}
>
    {@render children?.()}
</p>
