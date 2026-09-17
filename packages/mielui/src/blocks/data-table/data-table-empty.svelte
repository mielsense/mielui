<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import * as Table from '../../components/table';
    import type { DataTableEmptyProps } from '.';

    let { columns, loading = false, children, class: className }: DataTableEmptyProps = $props();
</script>
<Table.Row>
    <Table.Cell colspan={columns} class={cn(className, 'h-32 text-center text-foreground-muted')}>
        <div role="status">
            {#if children}
                {@render children({ loading })}
            {:else}
                {loading ? 'Loading rows…' : 'No results.'}
            {/if}
        </div>
    </Table.Cell>
</Table.Row>
