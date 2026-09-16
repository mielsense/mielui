<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import type { SheetTitleProps } from '.';
    import { getSheetContext } from './context.svelte';

    let { class: className, children, ...rest }: SheetTitleProps = $props();
    const context = getSheetContext();
    const id = `${context.id}-title`;

    $effect(() => {
        context.titleId = id;
        return () => {
            if (context.titleId === id) {
                context.titleId = undefined;
            }
        };
    });
</script>

<DialogPrimitive.Title
    {id}
    level={1}
    {...rest}
    class={cn(
        className,
        `[font-family:var(--font-header)] [font-size:var(--font-size-header)] [font-weight:var(--font-weight-header)] [letter-spacing:var(--tracking-header)] text-balance`
    )}
>
    {@render children?.()}
</DialogPrimitive.Title>
