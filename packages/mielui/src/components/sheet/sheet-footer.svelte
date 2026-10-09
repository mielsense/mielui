<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { SheetFooterProps } from '.';
    import { getSheetContext } from './context.svelte';

    let { class: className, children, ...rest }: SheetFooterProps = $props();
    const sheet = getSheetContext();

    $effect(() => {
        sheet.footer = footer;
        return () => {
            if (sheet.footer === footer) {
                sheet.footer = undefined;
            }
        };
    });
</script>

{#snippet footer()}
    <div
        {...rest}
        data-ui="sheet-footer"
        data-orientation="vertical"
        class={cn(
            className,
            'flex w-full flex-row items-center gap-2 p-2 [&>[data-ui=sheet-close]]:me-auto'
        )}
    >
        {@render children?.()}
    </div>
{/snippet}
