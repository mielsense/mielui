<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import type { SheetTriggerProps } from '.';
    import { getSheetContext } from './context.svelte';

    let {
        class: className,
        children,
        element = $bindable(),
        onclick,
        ...rest
    }: SheetTriggerProps = $props();

    const { id, state: sheetState } = getSheetContext();
</script>

<Button
    bind:element
    aria-haspopup="dialog"
    aria-expanded={sheetState.open}
    aria-controls={`sheet-${id}`}
    onclick={(event) => {
        onclick?.(event);
        if (event.defaultPrevented) {
            return;
        }
        sheetState.triggerRef = element;
        sheetState.open = !sheetState.open;
    }}
    class={className}
    {...rest}
>
    {@render children?.()}
</Button>
