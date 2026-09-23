<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import { descriptionClasses } from '../typography/variants';
    import type { DialogDescriptionProps } from '.';
    import { getDialogContext } from './context.svelte';

    let { class: className, children, ...rest }: DialogDescriptionProps = $props();
    const context = getDialogContext();
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

<DialogPrimitive.Description {id} {...rest} class={cn(className, descriptionClasses)}>
    {@render children?.()}
</DialogPrimitive.Description>
