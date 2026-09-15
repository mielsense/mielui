<script lang="ts">
    import Button from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { getToastContext } from './context.svelte';
    import type { ToastAction } from './lib.svelte';

    let {
        action,
        children,
        class: className,
        onclick,
        ...rest
    }: HTMLButtonAttributes & { action: ToastAction } = $props();
    const context = getToastContext();
</script>

<Button
    {...rest}
    type="button"
    variant={action.variant ?? 'outline'}
    size="sm"
    data-ui="toast-action"
    class={cn('shrink-0', className)}
    onclick={(event) => {
        onclick?.(event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
        if (event.defaultPrevented) {
            return;
        }
        action.callback();
        context.toast.exit?.();
    }}
>
    {#if children}
        {@render children()}
    {:else}
        {action.label}
    {/if}
</Button>
