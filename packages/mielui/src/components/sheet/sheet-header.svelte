<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import OverlayClose from '../_internal/overlay-close.svelte';
    import type { SheetHeaderProps } from '.';
    import { getSheetContext } from './context.svelte';

    let { class: className, children, close = true, ...rest }: SheetHeaderProps = $props();

    const sheet = getSheetContext();
    const sheetState = sheet.state;
</script>

<div
    {...rest}
    data-ui="sheet-header"
    data-orientation="vertical"
    class={cn(className, 'flex flex-col gap-1.5')}
>
    {@render children?.()}
    {#if close}
        <OverlayClose
            aria-label={sheet.labels?.close}
            onclick={() => {
                sheetState.open = false;
            }}
        />
    {/if}
</div>
