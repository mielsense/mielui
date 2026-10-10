import { attributes, type PlaygroundValues, select, toggle } from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'inset'], 'default'),
    caption: toggle('Caption', 'Content', true),
    footer: toggle('Footer', 'Content', true),
    selected: toggle('Selected row', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        variant: values.variant !== 'default' && values.variant,
        class: 'min-w-[28rem]'
    });
    const row = values.selected
        ? " data-state={invoice.id === 'INV-002' ? 'selected' : undefined}"
        : '';
    const caption = values.caption
        ? `
        <Table.Caption>Invoices for September.</Table.Caption>`
        : '';
    const footer = values.footer
        ? `
        <Table.Footer>
            <Table.Row>
                <Table.Cell colspan={3}>Total</Table.Cell>
                <Table.Cell class="text-end">$750.00</Table.Cell>
            </Table.Row>
        </Table.Footer>`
        : '';

    return `<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import * as Table from '@mielui/svelte/components/table';

    const invoices = [
        { id: 'INV-001', status: 'Paid', method: 'Card', amount: '$250.00' },
        { id: 'INV-002', status: 'Pending', method: 'Bank transfer', amount: '$150.00' },
        { id: 'INV-003', status: 'Paid', method: 'Card', amount: '$350.00' }
    ];
</script>

<Table.ScrollArea class="max-w-xl" tabindex={0} aria-label="Invoices">
    <Table.Root${props}>${caption}
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
                <Table.Row${row}>
                    <Table.Cell class="font-medium">{invoice.id}</Table.Cell>
                    <Table.Cell>
                        <Badge variant={invoice.status === 'Paid' ? 'success' : 'warning'}>
                            {invoice.status}
                        </Badge>
                    </Table.Cell>
                    <Table.Cell>{invoice.method}</Table.Cell>
                    <Table.Cell class="text-end">{invoice.amount}</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>${footer}
    </Table.Root>
</Table.ScrollArea>`;
}
