<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { titleClasses } from '../typography/variants';
    import type { DialogTitleProps } from '.';
    import { getDialogContext } from './context.svelte';

    let { class: className, children, ...rest }: DialogTitleProps = $props();

    const dialog = getDialogContext();
</script>

<h1 {...rest} id={`${dialog.id}-title`} class={cn(className, titleClasses)}>
    {@render children?.()}
</h1>
