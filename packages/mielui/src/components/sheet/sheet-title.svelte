<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import type { SheetTitleProps } from '.';
    import { getSheetContext } from './context.svelte';

    let { class: className, children, id: suppliedId, ...rest }: SheetTitleProps = $props();
    const context = getSheetContext();
    const id = $derived(suppliedId ?? `${context.id}-title`);

    $effect(() => {
        const currentId = id;
        context.titleId = currentId;
        return () => {
            if (context.titleId === currentId) {
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
