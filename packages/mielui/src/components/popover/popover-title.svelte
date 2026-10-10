<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { PopoverTitleProps } from '.';
    import { getPopoverContext } from './context.svelte';

    const popover = getPopoverContext();
    const key = popover.id;

    let { children, class: classProp, ...rest }: PopoverTitleProps = $props();
    const id = `popover-${String(key)}-title`;

    $effect(() => {
        const currentId = id;
        popover.titleId = currentId;
        return () => {
            if (popover.titleId === currentId) {
                popover.titleId = undefined;
            }
        };
    });
</script>

<p
    {id}
    {...rest}
    class={cn(
        classProp,
        'm-0 [font-family:var(--font-header)] [font-size:var(--font-size-body)] [font-weight:var(--font-weight-header)] [letter-spacing:var(--tracking-header)] text-balance leading-tight text-foreground'
    )}
>
    {@render children?.()}
</p>
