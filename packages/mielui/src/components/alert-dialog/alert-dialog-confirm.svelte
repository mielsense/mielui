<script lang="ts">
    import { Button, type ButtonProps } from '@mielui/svelte/components/button';
    import { cn, type DefaultProps } from '@mielui/svelte/utils';
    import { getDialogContext } from '../dialog/context.svelte';

    type Props = {
        closeOnClick?: boolean;
        onclick?: (event: MouseEvent) => void;
    } & DefaultProps &
        ButtonProps;

    const dialog = getDialogContext();
    let {
        class: className,
        children,
        onclick,
        closeOnClick = true,
        variant,
        ...rest
    }: Props = $props();
    const confirmVariant = $derived(variant ?? (dialog.state.error ? 'destructive' : 'primary'));

    function handleClick(event: MouseEvent) {
        if (closeOnClick) {
            dialog.state.open = false;
        }
        onclick?.(event);
    }
</script>

<Button
    {...rest}
    variant={confirmVariant}
    onclick={handleClick}
    class={cn(className, 'ml-auto flex flex-row items-center justify-center gap-2')}
>
    {@render children?.()}
</Button>
