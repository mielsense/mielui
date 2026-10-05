<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import * as Table from '../../components/table';
    import type { DataTableEmptyProps, DataTableLabels } from '.';

    let { columns, loading = false, children, class: className }: DataTableEmptyProps = $props();
    const labels = getContext<(() => DataTableLabels | undefined) | undefined>('data-table-labels');
</script>
<Table.Row>
    <Table.Cell colspan={columns} class={cn(className, 'h-32 text-center text-foreground-muted')}>
        <div role="status">
            {#if children}
                {@render children({ loading })}
            {:else}
                {loading
                    ? (labels?.()?.loading ?? 'Loading rows…')
                    : (labels?.()?.empty ?? 'No results.')}
            {/if}
        </div>
    </Table.Cell>
</Table.Row>
