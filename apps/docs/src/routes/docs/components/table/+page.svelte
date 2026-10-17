<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Table from '@mielui/svelte/components/table';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Inset from './examples/inset.svelte';
    import InsetSrc from './examples/inset.svelte?raw';
    import Interactive from './examples/interactive.svelte';
    import InteractiveSrc from './examples/interactive.svelte?raw';
    import UsageSrc from './examples/usage.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        invoices as playgroundInvoices
    } from './playground';
</script>

<svelte:head>
    <title>Mielui · Table</title>
    <meta name="description" content="Display rows and columns with native table semantics." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Table">Display rows and columns with native table semantics.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
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

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add table" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'`Root` renders a native table. Wrap it in `ScrollArea` when the columns can be wider than the page. Leave out `Caption` or `Footer` when the data does not need them, and set `class` on any part to change alignment, wrapping, or column widths.'}
            />
        </Typography.Text>
        <CodeBlock copy="overlay" code={UsageSrc} lang="svelte" />
        <Typography.Text variant="supporting">
            <InlineText
                text={'`Head` defaults to `scope="col"`. Set `scope="row"` for row headings. `Head` and `Cell` take the native `colspan`, `rowspan`, and `headers` attributes. Set `data-state="selected"` on a `Row` to give it the selected wash.'}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="inset" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Inset</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'The default table has no frame: muted column headings, hairline row dividers, and a wash on the hovered row. `variant="inset"` puts the header and footer on an outer frame and the body rows on a recessed surface inside it.'}
                />
            </Typography.Text>
            <ComponentPreview code={InsetSrc}>
                <Inset />
            </ComponentPreview>
        </div>

        <div id="sorting-and-selection" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sorting and selection</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Table keeps no state. Put a Button in the heading to sort and update `aria-sort` when the order changes. Keep the selected rows in your own state and mark them with `data-state="selected"`.'}
                />
            </Typography.Text>
            <ComponentPreview code={InteractiveSrc}>
                <Interactive />
            </ComponentPreview>
        </div>
    </section>
</div>
