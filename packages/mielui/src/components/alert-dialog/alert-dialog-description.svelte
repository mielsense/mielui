<script lang="ts">
    import { cn, type DefaultProps } from '@mielui/svelte/utils';
    import { getDialogContext } from '../dialog/context.svelte';
    import { descriptionClasses } from '../typography/variants';

    let { class: className, children, ...rest }: DefaultProps = $props();

    const dialog = getDialogContext();
    const id = `${dialog.id}-desc`;
    $effect(() => {
        dialog.descriptionId = id;
        return () => {
            if (dialog.descriptionId === id) {
                dialog.descriptionId = undefined;
            }
        };
    });
</script>

<p {...rest} {id} class={cn(className, descriptionClasses)}>
    {@render children?.()}
</p>
