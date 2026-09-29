<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import { titleClasses } from '../typography/variants';
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

<DialogPrimitive.Title {id} level={1} {...rest} class={cn(className, titleClasses)}>
    {@render children?.()}
</DialogPrimitive.Title>
