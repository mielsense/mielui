<script lang="ts">
    import { Popover as PopoverPrimitive } from 'bits-ui';
    import { onDestroy } from 'svelte';
    import type { PopoverProps, PopoverState } from '.';
    import { setPopoverContext } from './context.svelte';

    let {
        open = $bindable(false),
        onOpenChange,
        placement = 'bottom',
        children,
        hoverable,
        delay = 0,
        closeDelay = 150,
        inert = true
    }: PopoverProps = $props();

    const key = $props.id();
    const popoverState = $state<PopoverState>({
        get open() {
            return open;
        },
        set open(value: boolean) {
            if (open === value) {
                return;
            }
            open = value;
            onOpenChange?.(value);
        },
        buttonRef: null,
        popoverRef: undefined,
        get placement() {
            return placement;
        },
        closeTimeout: undefined,
        get hoverable() {
            return hoverable ?? false;
        },
        get delay() {
            return delay;
        },
        get closeDelay() {
            return closeDelay;
        },
        get inert() {
            return inert;
        }
    });

    const context = $state({
        id: key,
        state: popoverState,
        titleId: undefined as string | undefined
    });
    setPopoverContext(context);

    onDestroy(() => {
        if (popoverState.closeTimeout) {
            clearTimeout(popoverState.closeTimeout);
        }
        if (popoverState.hoverTimeout) {
            clearTimeout(popoverState.hoverTimeout);
        }
    });
</script>

<PopoverPrimitive.Root bind:open={popoverState.open}>
    {@render children?.()}
</PopoverPrimitive.Root>
