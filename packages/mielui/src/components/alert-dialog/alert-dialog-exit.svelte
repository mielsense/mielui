<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { getDialogContext } from '../dialog/context.svelte';

    import type { AlertDialogActionProps } from '.';

    let {
        class: className,
        children,
        onclick,
        closeOnClick = true,
        element = $bindable<HTMLButtonElement | HTMLAnchorElement>(),
        ...rest
    }: AlertDialogActionProps = $props();

    const dialog = getDialogContext();

    function handleClick(event: MouseEvent) {
        onclick?.(event);
        if (closeOnClick && !event.defaultPrevented) {
            dialog.state.open = false;
        }
    }
</script>

<Button
    bind:element
    data-dialog-cancel
    onclick={handleClick}
    variant="ghost"
    {...rest}
    class={cn(className, 'mr-auto flex flex-row items-center justify-center gap-2')}
>
    {@render children?.()}
</Button>
