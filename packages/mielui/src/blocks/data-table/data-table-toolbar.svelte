<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import type { DataTableToolbarProps } from '.';
    import { type DataTableToolbarSlot, getDataTableContext } from './context.svelte';

    let { children, class: className, ...rest }: DataTableToolbarProps = $props();

    function readContext() {
        try {
            return getDataTableContext();
        } catch {
            return undefined;
        }
    }

    const dataTable = readContext();
    const lifted = $derived(dataTable?.variant === 'inset');
    const slot = $state<DataTableToolbarSlot>({
        get children() {
            return children;
        },
        get className() {
            return className;
        },
        get rest() {
            return rest;
        }
    });

    function register() {
        if (dataTable) {
            dataTable.toolbarSlot = slot;
        }
    }

    if (untrack(() => dataTable?.variant === 'inset')) {
        untrack(register);
    }

    $effect(() => {
        if (!dataTable || !lifted) {
            return;
        }
        untrack(register);

        return () => {
            untrack(() => {
                if (dataTable.toolbarSlot === slot) {
                    dataTable.toolbarSlot = undefined;
                }
            });
        };
    });
</script>

{#if !lifted}
    <div
        {...rest}
        data-ui="data-table-toolbar"
        class={cn(className, 'flex flex-wrap items-center justify-between gap-3')}
    >
        {@render children?.()}
    </div>
{/if}
