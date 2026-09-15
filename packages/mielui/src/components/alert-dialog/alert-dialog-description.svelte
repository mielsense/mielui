<script lang="ts">
    import { cn, type DefaultProps } from '@mielui/svelte/utils';
    import { getDialogContext } from '../dialog/context.svelte';
    import { descriptionClasses } from '../typography/variants';

    let { class: className, children, ...rest }: DefaultProps = $props();

    const dialog = getDialogContext();
</script>

<p {...rest} id={`${dialog.id}-desc`} class={cn(className, descriptionClasses)}>
    {@render children?.()}
</p>
