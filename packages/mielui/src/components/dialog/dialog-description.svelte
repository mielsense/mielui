<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { descriptionClasses } from '../typography/variants';
    import type { DialogDescriptionProps } from '.';
    import { getDialogContext } from './context.svelte';

    let { class: className, children, ...rest }: DialogDescriptionProps = $props();

    const dialog = getDialogContext();
</script>

<p {...rest} id={`${dialog.id}-desc`} class={cn(className, descriptionClasses)}>
    {@render children?.()}
</p>
