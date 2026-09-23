<script lang="ts">
    import { MoreHorizontalIcon as MoreHorizontal } from '@hugeicons/core-free-icons';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import { Pagination } from '@mielui/svelte/components/pagination';
    import * as Select from '@mielui/svelte/components/select';
    import * as Table from '@mielui/svelte/components/table';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { Toolbar } from '@mielui/svelte/components/toolbar';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import InvoiceDialog from './invoice-dialog.svelte';
    import type { AppPreviewModel } from './model.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<Tabs.Content value="invoices" class="flex flex-col gap-6 px-6 py-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
            <Typography.Title level={2} class="text-lg">Invoices</Typography.Title>
            <Typography.Description>Review, remind, and record payment.</Typography.Description>
        </div>
        <InvoiceDialog {model} />
    </div>
    <Group.Root aria-label="Invoice filters" class="w-full max-w-lg">
        <Input
            bind:value={model.invoiceQuery}
            aria-label="Search invoices"
            placeholder="Search customer or invoice…"
            class="min-w-0 flex-1"
        />
        <Group.Separator />
        <Select.Root bind:value={model.invoiceStatus}>
            <Select.Trigger variant="outline" aria-label="Invoice status" class="w-auto shrink-0">
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
    <Table.ScrollArea class="rounded-[var(--radius-lg)] border border-border">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-10">
                        <Checkbox
                            checked={model.allVisibleSelected}
                            aria-label="Select visible invoices"
                            onCheckedChange={model.toggleSelectAll}
                        />
                    </Table.Head>
                    <Table.Head>Customer</Table.Head>
                    <Table.Head>Invoice</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head class="text-right">Amount</Table.Head>
                    <Table.Head><span class="sr-only">Actions</span></Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each model.pagedInvoices as invoice (invoice.reference)}
                    <Table.Row>
                        <Table.Cell>
                            <Checkbox
                                bind:checked={model.selectedInvoices[invoice.reference]}
                                aria-label={`Select ${invoice.reference}`}
                            />
                        </Table.Cell>
                        <Table.Cell class="whitespace-nowrap font-medium">
                            {invoice.client}
                            <p class="mt-1 text-xs font-normal text-foreground-muted">
                                Due{' '}
                                {invoice.due}
                            </p>
                        </Table.Cell>
                        <Table.Cell class="whitespace-nowrap text-foreground-muted">
                            {invoice.reference}
                        </Table.Cell>
                        <Table.Cell>
                            <Badge variant={model.invoiceBadgeVariant(invoice.status)}>
                                {invoice.status}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell class="text-right tabular-nums">
                            {invoice.amount}
                        </Table.Cell>
                        <Table.Cell>
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
                        </Table.Cell>
                    </Table.Row>
                {:else}
                    <Table.Row>
                        <Table.Cell colspan={6} class="py-12 text-center text-foreground-muted">
                            No invoices match your filters.
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </Table.ScrollArea>
    <Toolbar class="p-0">
        <Typography.Metadata>
            Showing{' '}
            {model.pagedInvoices.length} of{' '}
            {model.visibleInvoices.length}
        </Typography.Metadata>
        <Pagination bind:page={model.invoicePage} total={model.invoicePageCount} />
    </Toolbar>
</Tabs.Content>
