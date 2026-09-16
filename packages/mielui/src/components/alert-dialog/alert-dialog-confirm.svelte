<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { getDialogContext } from '../dialog/context.svelte';

    import type { AlertDialogActionProps } from '.';

    const dialog = getDialogContext();
    let {
        class: className,
        children,
        onclick,
        closeOnClick = true,
        element = $bindable<HTMLButtonElement | HTMLAnchorElement>(),
        variant,
        ...rest
    }: AlertDialogActionProps = $props();
    const confirmVariant = $derived(variant ?? (dialog.state.error ? 'destructive' : 'primary'));

    function handleClick(event: MouseEvent) {
        onclick?.(event);
        if (closeOnClick && !event.defaultPrevented) {
            dialog.state.open = false;
        }
    }
</script>

<Button
    {...rest}
    bind:element
    variant={confirmVariant}
    onclick={handleClick}
    class={cn(className, 'ml-auto flex flex-row items-center justify-center gap-2')}
>
    {@render children?.()}
</Button>
