<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import * as Table from '@mielui/svelte/components/table';

    let { variant = 'default' }: { variant?: 'default' | 'inset' } = $props();
    const invoices = [
        { id: 'INV-001', status: 'Paid', method: 'Card', amount: '$250.00' },
        { id: 'INV-002', status: 'Pending', method: 'Bank transfer', amount: '$150.00' },
        { id: 'INV-003', status: 'Paid', method: 'Card', amount: '$350.00' }
    ];
</script>

<Table.ScrollArea class="max-w-2xl" tabindex={0} aria-label="Invoices">
    <Table.Root {variant} class="min-w-[30rem]">
        <Table.Caption>Invoices for September.</Table.Caption>
        <Table.Header>
            <Table.Row>
                <Table.Head>Invoice</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Method</Table.Head>
                <Table.Head class="text-end">Amount</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each invoices as invoice (invoice.id)}
                <Table.Row>
                    <Table.Head
                        {...{ scope: 'row' as const }}
                        class="border-0 font-medium text-foreground"
                    >
                        {invoice.id}
                    </Table.Head>
                    <Table.Cell>
                        <Badge
                            class="w-fit"
                            variant={invoice.status === 'Paid' ? 'success' : 'warning'}
                        >
                            {invoice.status}
                        </Badge>
                    </Table.Cell>
                    <Table.Cell>{invoice.method}</Table.Cell>
                    <Table.Cell class="text-end tabular-nums">{invoice.amount}</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
        <Table.Footer>
            <Table.Row>
                <Table.Cell colspan={3}>Total</Table.Cell>
                <Table.Cell class="text-end tabular-nums">$750.00</Table.Cell>
            </Table.Row>
        </Table.Footer>
    </Table.Root>
</Table.ScrollArea>
