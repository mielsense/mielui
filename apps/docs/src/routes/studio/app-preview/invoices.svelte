<script lang="ts">
    import { MoreHorizontalIcon as MoreHorizontal } from '@hugeicons/core-free-icons';
    import { Badge } from '@mielui/svelte/components/badge';
    import * as DataTable from '@mielui/svelte/components/data-table';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import * as Select from '@mielui/svelte/components/select';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { createTable, FlexRender } from '@tanstack/svelte-table';
    import InvoiceDialog from './invoice-dialog.svelte';
    import { invoiceColumns, invoiceFeatures } from './invoice-table';
    import type { AppPreviewModel } from './model.svelte';

    let { model }: { model: AppPreviewModel } = $props();
    const table = createTable({
        features: invoiceFeatures,
        columns: invoiceColumns,
        get data() {
            return model.visibleInvoices;
        },
        getRowId: (invoice) => invoice.reference,
        initialState: { pagination: { pageIndex: 0, pageSize: 10 } }
    });
</script>

<Tabs.Content value="invoices" class="flex flex-col gap-6 px-6 py-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
            <Typography.Title level={2} class="text-lg">Invoices</Typography.Title>
            <Typography.Description>Review, remind, and record payment.</Typography.Description>
        </div>
        <InvoiceDialog {model} />
    </div>
    <DataTable.Root {table}>
        {#snippet children()}
            <DataTable.Toolbar>
                <Group.Root aria-label="Invoice filters" class="w-full max-w-lg">
                    <Input
                        bind:value={model.invoiceQuery}
                        aria-label="Search invoices"
                        placeholder="Search customer or invoice…"
                        class="min-w-0 flex-1"
                    />
                    <Group.Separator />
                    <Select.Root bind:value={model.invoiceStatus}>
                        <Select.Trigger
                            variant="outline"
                            aria-label="Invoice status"
                            class="w-auto shrink-0"
                        >
                            {model.invoiceStatus === 'all' ? 'All statuses' : model.invoiceStatus.charAt(0).toUpperCase() + model.invoiceStatus.slice(1)}
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="all">All statuses</Select.Item>
                            <Select.Item value="open">Open</Select.Item>
                            <Select.Item value="paid">Paid</Select.Item>
                            <Select.Item value="overdue">Overdue</Select.Item>
                        </Select.Content>
                    </Select.Root>
                </Group.Root>
                <DataTable.Sort {table} class="ml-auto" />
            </DataTable.Toolbar>
            <DataTable.View
                {table}
                selectable
                caption="Invoices"
                rowLabel={(row) => row.original.reference}
            >
                {#snippet cell(cell)}
                    {@const invoice = cell.row.original}
                    {#if cell.column.id === 'client'}
                        <span class="font-medium">{invoice.client}</span>
                        <p class="mt-1 text-xs text-foreground-muted">Due{invoice.due}</p>
                    {:else if cell.column.id === 'status'}
                        <Badge variant={model.invoiceBadgeVariant(invoice.status)}>
                            {invoice.status}
                        </Badge>
                    {:else if cell.column.id === 'amount'}
                        <span class="tabular-nums">{invoice.amount}</span>
                    {:else if cell.column.id === 'actions'}
                        <DropdownMenu.Root>
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <DropdownMenu.Trigger
                                        variant="ghost"
                                        size="icon"
                                        aria-label={`Actions for ${invoice.reference}`}
                                    >
                                        <HugeiconsIcon icon={MoreHorizontal} size={16} />
                                    </DropdownMenu.Trigger>
                                </Tooltip.Trigger>
                                <Tooltip.Content>Invoice actions</Tooltip.Content>
                            </Tooltip.Root>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item
                                    disabled={invoice.status === 'Paid'}
                                    callback={() => {
            model.markInvoicePaid(invoice.reference);
        }}
                                >
                                    Record payment
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                    callback={() => {
            model.copyInvoiceNumber(invoice.reference);
        }}
                                >
                                    Copy invoice number
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    {:else}
                        <FlexRender {cell} />
                    {/if}
                {/snippet}
                {#snippet empty()}
                    No invoices match your filters.
                {/snippet}
            </DataTable.View>
            <div class="flex flex-wrap items-center justify-between gap-3">
                <DataTable.Summary {table} />
                <DataTable.Pagination {table} />
            </div>
        {/snippet}
    </DataTable.Root>
</Tabs.Content>
