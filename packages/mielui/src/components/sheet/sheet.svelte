<script lang="ts">
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import type { SheetProps, SheetState } from '.';
    import { setSheetContext } from './context.svelte';

    let { open = $bindable(false), onOpenChange, children }: SheetProps = $props();

    const id = $props.id();
    const sheetState = $state<SheetState>({
        open,
        triggerRef: null
    });
    let syncedOpen = $state(open);
    const context = $state({
        id,
        state: sheetState,
        titleId: undefined as string | undefined,
        descriptionId: undefined as string | undefined
    });
    setSheetContext(context);

    $effect(() => {
        if (open !== syncedOpen) {
            syncedOpen = open;
            sheetState.open = open;
        }
    });

    $effect(() => {
        if (sheetState.open !== syncedOpen) {
            syncedOpen = sheetState.open;
            open = sheetState.open;
            onOpenChange?.(sheetState.open);
        }
    });
</script>

<DialogPrimitive.Root bind:open={sheetState.open}>
    {@render children?.()}
</DialogPrimitive.Root>
