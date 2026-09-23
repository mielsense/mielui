<script lang="ts">
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import type { SheetProps, SheetState } from '.';
    import { setSheetContext } from './context.svelte';

    let { open = $bindable(false), onOpenChange, children }: SheetProps = $props();

    const id = $props.id();
    const sheetState = $state<SheetState>({
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
        triggerRef: null
    });
    const context = $state({
        id,
        state: sheetState,
        titleId: undefined as string | undefined,
        descriptionId: undefined as string | undefined
    });
    setSheetContext(context);
    let wasOpen = $state(false);

    $effect.pre(() => {
        if (
            open &&
            !wasOpen &&
            typeof document !== 'undefined' &&
            document.activeElement instanceof HTMLElement &&
            document.activeElement !== document.body
        ) {
            sheetState.triggerRef = document.activeElement;
        }
        wasOpen = open;
    });
</script>

<DialogPrimitive.Root bind:open={sheetState.open}>
    {@render children?.()}
</DialogPrimitive.Root>
