<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import type { SheetCloseProps } from '.';
    import { getSheetContext } from './context.svelte';

    let {
        class: className,
        children,
        element = $bindable(),
        onclick,
        ...rest
    }: SheetCloseProps = $props();

    const { state: sheetState } = getSheetContext();
</script>

<Button
    bind:element
    variant="outline"
    onclick={(event) => {
        onclick?.(event);
        if (event.defaultPrevented) {
            return;
        }
        sheetState.open = false;
    }}
    class={className}
    {...rest}
>
    {@render children?.()}
</Button>
