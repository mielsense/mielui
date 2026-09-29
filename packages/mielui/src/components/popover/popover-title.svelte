<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { titleClasses } from '../typography/variants';
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

<p {id} {...rest} class={cn(classProp, titleClasses)}>
    {@render children?.()}
</p>
