<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import type { DialogCloseProps } from '.';
    import { getDialogContext } from './context.svelte';

    let { class: className, children, onclick, ...rest }: DialogCloseProps = $props();

    const dialog = getDialogContext();
    let element = $state<HTMLButtonElement | HTMLAnchorElement | undefined>(undefined);
</script>

<Button
    bind:element
    data-dialog-cancel
    onclick={(event: MouseEvent) => {
        onclick?.(event);
        if (!event.defaultPrevented) {
            dialog.state.open = false;
        }
    }}
    variant="ghost"
    {...rest}
    class={cn(className, 'mr-auto flex flex-row items-center justify-center gap-2')}
>
    {@render children?.()}
</Button>
