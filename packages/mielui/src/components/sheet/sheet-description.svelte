<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import type { SheetDescriptionProps } from '.';
    import { getSheetContext } from './context.svelte';

    let { class: className, children, ...rest }: SheetDescriptionProps = $props();
    const context = getSheetContext();
    const id = `${context.id}-description`;

    $effect(() => {
        context.descriptionId = id;
        return () => {
            if (context.descriptionId === id) {
                context.descriptionId = undefined;
            }
        };
    });
</script>

<DialogPrimitive.Description
    {id}
    {...rest}
    class={cn(
        className,
        '[font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-pretty text-foreground-muted'
    )}
>
    {@render children?.()}
</DialogPrimitive.Description>
