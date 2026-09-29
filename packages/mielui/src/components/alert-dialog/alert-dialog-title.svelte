<script lang="ts">
    import { cn, type DefaultProps } from '@mielui/svelte/utils';
    import { getDialogContext } from '../dialog/context.svelte';
    import { titleClasses } from '../typography/variants';

    let { class: className, children, ...rest }: DefaultProps = $props();

    const dialog = getDialogContext();
    const id = `${dialog.id}-title`;
    $effect(() => {
        dialog.titleId = id;
        return () => {
            if (dialog.titleId === id) {
                dialog.titleId = undefined;
            }
        };
    });
</script>

<h1 {...rest} {id} class={cn(className, titleClasses)}>
    {@render children?.()}
</h1>
