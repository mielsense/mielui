<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import type { DialogConfirmProps } from '.';
    import { getDialogContext } from './context.svelte';

    const dialog = getDialogContext();
    let { class: className, children, onclick, variant, ...rest }: DialogConfirmProps = $props();
    const confirmVariant = $derived(variant ?? (dialog.state.error ? 'destructive' : 'primary'));
</script>

<Button
    {...rest}
    variant={confirmVariant}
    onclick={(event: MouseEvent) => {
        dialog.state.open = false;
        onclick?.(event);
    }}
    class={cn(className, 'ml-auto flex flex-row items-center justify-center gap-2')}
>
    {@render children?.()}
</Button>
