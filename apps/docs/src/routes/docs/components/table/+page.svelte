<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Table from '@mielui/svelte/components/table';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Inset from './examples/inset.svelte';
    import InsetSource from './examples/inset.svelte?raw';
    import Interactive from './examples/interactive.svelte';
    import InteractiveSource from './examples/interactive.svelte?raw';

    import usage from './examples/usage.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const playgroundInvoices = [
        {
            id: 'INV-001',
            status: 'Paid',
            method: 'Card',
            amount: '$250.00'
        },
        {
            id: 'INV-002',
            status: 'Pending',
            method: 'Bank transfer',
            amount: '$150.00'
        },
        {
            id: 'INV-003',
            status: 'Paid',
            method: 'Card',
            amount: '$350.00'
        }
    ];
</script>

<svelte:head>
    <title>Mielui · Table</title>
    <meta name="description" content="Display rows and columns with native table semantics." />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Table">Display rows and columns with native table semantics.</PageIntro>

    <section id="hero" class="flex scroll-mt-20 flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Table.ScrollArea class="max-w-xl" tabindex={0} aria-label="Invoices">
                    <Table.Root variant={values.variant} class="min-w-[28rem]">
                        {#if values.caption}
                            <Table.Caption>Invoices for September.</Table.Caption>
                        {/if}
                        <Table.Header>
                            <Table.Row>
                                <Table.Head>Invoice</Table.Head>
                                <Table.Head>Status</Table.Head>
                                <Table.Head>Method</Table.Head>
                                <Table.Head class="text-end">Amount</Table.Head>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {#each playgroundInvoices as invoice (invoice.id)}
                                <Table.Row
                                    data-state={values.selected && invoice.id === 'INV-002'
                                        ? 'selected'
                                        : undefined}
                                >
                                    <Table.Cell class="font-medium">{invoice.id}</Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            variant={invoice.status === 'Paid'
                                                ? 'success'
                                                : 'warning'}
                                        >
                                            {invoice.status}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>{invoice.method}</Table.Cell>
                                    <Table.Cell class="text-end">{invoice.amount}</Table.Cell>
                                </Table.Row>
                            {/each}
                        </Table.Body>
                        {#if values.footer}
                            <Table.Footer>
                                <Table.Row>
                                    <Table.Cell colspan={3}>Total</Table.Cell>
                                    <Table.Cell class="text-end">$750.00</Table.Cell>
                                </Table.Row>
                            </Table.Footer>
                        {/if}
                    </Table.Root>
                </Table.ScrollArea>
            {/snippet}
        </Playground>
    </section>
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add table" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <CodeBlock copy="overlay" code={usage} lang="svelte" />
        <Typography.Text>
            <Typography.InlineCode>Root</Typography.InlineCode>
            renders a table. Wrap it in{' '}
            <Typography.InlineCode>ScrollArea</Typography.InlineCode>
            when columns need horizontal scrolling. Omit{' '}
            <Typography.InlineCode>Caption</Typography.InlineCode>
            or{' '}
            <Typography.InlineCode>Footer</Typography.InlineCode>
            when the data does not need them. Set{' '}
            <Typography.InlineCode>class</Typography.InlineCode>
            on each part to change alignment, wrapping, or column widths.
        </Typography.Text>
        <Typography.Text>
            <Typography.InlineCode>Head</Typography.InlineCode>
            defaults to{' '}
            <Typography.InlineCode>scope="col"</Typography.InlineCode>
            for column headings. Use{' '}
            <Typography.InlineCode>scope="row"</Typography.InlineCode>
            for row headings. Both{' '}
            <Typography.InlineCode>Head</Typography.InlineCode>
            and{' '}
            <Typography.InlineCode>Cell</Typography.InlineCode>
            accept the native colspan, rowspan, and headers attributes.
        </Typography.Text>
        <Typography.Text>
            For sorting, put a Button in the heading and update{' '}
            <Typography.InlineCode>aria-sort</Typography.InlineCode>
            when the order changes. Keep selection and pagination in your application state, using
            Checkbox and Pagination as needed.
        </Typography.Text>
    </section>
    <section id="inset" class="flex flex-col gap-4">
        <Typography.H2>Inset</Typography.H2>
        <Typography.Text>
            The default table has no frame: muted column headings, hairline row dividers, and a wash
            on the hovered row. Set variant="inset" on Root for a two-layer surface. Header and
            Footer sit on a white frame, and the body rows sit on a recessed surface inside it.
        </Typography.Text>
        <ComponentPreview code={InsetSource}><Inset /></ComponentPreview>
    </section>
    <section id="sorting-and-selection" class="flex flex-col gap-4">
        <Typography.H2>Sorting and selection</Typography.H2>
        <ComponentPreview code={InteractiveSource}><Interactive /></ComponentPreview>
    </section>
</div>
