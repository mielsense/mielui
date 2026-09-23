<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import type { DialogConfirmProps } from '.';
    import { getDialogContext } from './context.svelte';

    const dialog = getDialogContext();
    let {
        class: className,
        children,
        element = $bindable(),
        onclick,
        variant,
        ...rest
    }: DialogConfirmProps = $props();
    const confirmVariant = $derived(variant ?? (dialog.state.error ? 'destructive' : 'primary'));
</script>

<Button
    bind:element
    {...rest}
    variant={confirmVariant}
    onclick={(event: MouseEvent) => {
        onclick?.(event);
        if (!event.defaultPrevented) {
            dialog.state.open = false;
        }
    }}
    class={cn(className, 'ml-auto flex flex-row items-center justify-center gap-2')}
>
    {@render children?.()}
</Button>
