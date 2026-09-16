<script lang="ts">
    import * as Table from '@mielui/svelte/components/table';
</script>

<Table.ScrollArea tabindex="0" aria-label="Invoices">
    <Table.Root variant="inset">
        <Table.Caption>September invoices</Table.Caption>
        <Table.Header>
            <Table.Row>
                <Table.Head>Invoice</Table.Head>
                <Table.Head>Amount</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>INV-001</Table.Cell>
                <Table.Cell>$250.00</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table.Root>
</Table.ScrollArea>
