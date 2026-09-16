<script lang="ts">
    import { Cancel01Icon as X } from '@hugeicons/core-free-icons';
    import Button from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { SheetHeaderProps } from '.';
    import { getSheetContext } from './context.svelte';

    let { class: className, children, ...rest }: SheetHeaderProps = $props();

    const { state: sheetState } = getSheetContext();
</script>

<div
    {...rest}
    data-ui="sheet-header"
    data-orientation="vertical"
    class={cn(className, 'flex flex-col gap-1.5')}
>
    {@render children?.()}
    <Button
        onclick={() => {
            sheetState.open = false;
        }}
        class="absolute top-1.5 right-1.5 size-[var(--size-touch)] text-foreground-muted md:top-3 md:right-3 md:size-8"
        variant="ghost"
        aria-label="Close"
    >
        <HugeiconsIcon icon={X} />
    </Button>
</div>
