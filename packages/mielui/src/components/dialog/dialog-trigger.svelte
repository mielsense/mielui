<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import type { DialogTriggerProps } from '.';
    import { getDialogContext } from './context.svelte';

    let {
        class: className,
        children,
        element = $bindable(),
        onclick,
        ...rest
    }: DialogTriggerProps = $props();

    const dialog = getDialogContext();
</script>

<Button
    bind:element
    aria-haspopup="dialog"
    aria-expanded={dialog.state.open}
    aria-controls={dialog.contentId}
    onclick={(event: MouseEvent) => {
        dialog.returnFocusEl = element;
        dialog.state.open = true;
        onclick?.(event);
    }}
    class={className}
    {...rest}
>
    {@render children?.()}
</Button>
