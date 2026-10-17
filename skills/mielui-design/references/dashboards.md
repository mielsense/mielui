# Dashboards and data pages

A dashboard answers one question first and a few more after. Lay it out in that order. Do not start from a grid of equal tiles and look for things to put in them.

## The order of a dashboard

1. Header: title, one muted sentence, the range control, and the page's action if it has one.
2. One strip of numbers: three to five figures that summarize the period.
3. The dominant object: the one chart or table the page exists for. It takes the most space.
4. Supporting views beside or under it: a breakdown, a ranked list, recent activity.
5. The records: a table people can search, sort, and act on.

```svelte
<div class="flex flex-col gap-10 px-5 pt-8 pb-16 sm:px-8 lg:px-10">
    <header class="flex flex-wrap items-end justify-between gap-4">
        <div class="flex flex-col gap-1">
            <h1 class="text-xl font-medium tracking-[var(--tracking-header)]">Overview</h1>
            <p class="text-sm text-foreground-muted">Traffic and conversions for acme.dev.</p>
        </div>
        <Tabs.Root bind:value={range} variant="ghost">
            <div role="group" aria-label="Range">
                <Tabs.List>
                    <Tabs.Trigger value="7d">7 days</Tabs.Trigger>
                    <Tabs.Trigger value="30d">30 days</Tabs.Trigger>
                    <Tabs.Trigger value="90d">90 days</Tabs.Trigger>
                </Tabs.List>
            </div>
        </Tabs.Root>
    </header>

    <!-- number strip -->
    <!-- chart grid -->
    <!-- table -->
</div>
```

The range control changes every number, chart, and table on the page. Wire it.

## The number strip

Numbers are text in a row, not a card each. Bound the strip with one hairline above and below, or put all of it in a single plate.

```svelte
<dl class="grid grid-cols-2 gap-x-8 gap-y-6 border-y border-border py-6 @3xl:grid-cols-4">
    {#each stats as stat (stat.label)}
        <div class="flex flex-col gap-2">
            <dt class="text-sm text-foreground-muted">{stat.label}</dt>
            <dd class="flex items-baseline gap-2">
                <span class="text-2xl font-medium tabular-nums">{stat.value}</span>
                <span class="text-xs tabular-nums {stat.up ? 'text-[var(--mielui-success-text)]' : 'text-[var(--mielui-error-text)]'}">
                    {stat.delta}
                </span>
            </dd>
        </div>
    {/each}
</dl>
```

- The label is muted 14px above the value. The value is 24px medium with `tabular-nums`.
- A delta is a small text tint beside the value with its sign: "+12.4%". It is not a pill, and it needs no arrow icon.
- Where a comparison means little, put one line of muted 12px context under the value: "$6,602 in progress", "across 8 orders".
- Tint the value itself only when it needs attention, such as a count of late orders in `text-[var(--mielui-error-text)]`.
- Say what the delta compares against once, in the page's sentence or a caption: "compared with the previous 30 days".
- Good is not always up. Color a falling churn rate as success.
- No icon per stat. Four icons in a row carry no information.
- Use `use:numberShuffle` from `@mielui/svelte/actions/number-shuffle` on a value that changes in place, such as when the range switches.

## Charts

Put a chart in a Card. The title and description go in the header, the headline figure sits above the plot, and the plot fills the width.

Which Card depends on what is behind it. When the page is a plate, as in the sidebar and rail shells, use `variant="inset"` as below. When the page sits on the stage, as in the top bar shell, drop the variant and use a plain `Card.Root`, because an inset on the stage is grey on grey.

```svelte
<div class="grid gap-4 @4xl:grid-cols-3">
    <Card.Root variant="inset" class="min-w-0 @4xl:col-span-2">
        <Card.Header>
            <Card.Title>Revenue</Card.Title>
            <Card.Description>January to June 2026</Card.Description>
        </Card.Header>
        <Card.Content class="flex min-w-0 flex-col">
            <p class="mb-5 text-3xl font-medium tabular-nums">{money.format(total)}</p>
            <Chart.Root data={revenue} config={revenueConfig} x="month" aria-label="Monthly revenue">
                <Chart.Plot class="h-64">
                    <Chart.Grid />
                    <Chart.XAxis />
                    <Chart.YAxis />
                    <Chart.Area key="revenue" />
                </Chart.Plot>
                <Chart.Tooltip />
            </Chart.Root>
        </Card.Content>
    </Card.Root>

    <Card.Root variant="inset" class="min-w-0">
        <!-- the supporting view -->
    </Card.Root>
</div>
```

`config` maps each series key to a label, a color, and a formatter:

```ts
const revenueConfig = {
    revenue: {
        label: 'Revenue',
        color: 'var(--chart-1)',
        format: (value: number) => money.format(value)
    }
};
```

Choosing the chart:

| The data is | Use |
| --- | --- |
| A value over time | `Chart.Area` for one series, `Chart.Line` for two to four |
| A few categories compared | `Chart.Bar` |
| Many categories ranked | A ranked list, shown below. It beats a bar chart with twelve tilted labels |
| Parts of a whole, five or fewer | `PieChart`, or a ranked list with percentages |
| One measured value against a limit | `Gauge` |
| Activity by day | `Heatmap` |
| One exact number | Text. Not every number needs a chart |

Rules:

- One dominant chart per page, spanning two of three columns. Supporting charts are smaller and fewer.
- Series colors are `var(--chart-1)` to `var(--chart-5)` in order. The first series is the one that matters most.
- Give every plot a fixed height (`h-56` to `h-72`) and every chart an `aria-label`.
- Every card in a grid row gets `min-w-0`, or a chart will push the grid wider than the page.
- Use `@container` variants for the grid, so it follows the panel and not the window.
- Do not add a chart because a space is empty. Reflow the grid.
- The tooltip lists every key in `config`. When a toggle switches the plotted series, pass a config with only the series on screen.
- A sentence beside the headline figure does more than a second chart: "a day on average, peaking at 6,928 on Sep 22".

## Ranked lists

A ranked list shows a name, a value, and a bar for the proportion. Use it for top pages, sources, countries, plans, and anything with long labels.

```svelte
<ul class="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-4 gap-y-1 text-sm">
    {#each pages as row (row.path)}
        <li class="col-span-3 grid h-8 grid-cols-subgrid items-center">
            <span class="relative flex h-full min-w-0 items-center">
                <span
                    aria-hidden="true"
                    class="absolute inset-y-0 start-0 rounded-[var(--radius-md)] bg-[var(--color-wash)]"
                    style:width={`${(row.views / max) * 100}%`}
                ></span>
                <span class="relative truncate px-2.5 font-mono text-xs">{row.path}</span>
            </span>
            <span class="text-end tabular-nums">{row.views.toLocaleString('en-US')}</span>
            <span class="text-end text-xs tabular-nums text-foreground-muted">{row.share}</span>
        </li>
    {/each}
</ul>
```

- The bar lives in the label's column only, so its rounded end never runs under the numbers.
- The bar is the wash, not a chart color, so the text stays readable over it.
- Sort by value and show eight rows at most. A ghost "View all 15" button under them opens a `Dialog` with the full list.
- Variants of one list, such as top, entry, and exit pages, are ghost `Tabs` at the end of the card's title row.

## Activity

Recent events are rows: a small status dot, one line of text, and a muted timestamp at the end.

```svelte
<ul class="flex flex-col">
    {#each events as event (event.id)}
        <li class="flex items-center gap-3 border-b border-border py-3 text-sm last:border-b-0">
            <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-success"></span>
            <span class="min-w-0 flex-1 truncate">{event.text}</span>
            <time class="shrink-0 font-mono text-xs text-foreground-muted">{event.at}</time>
        </li>
    {/each}
</ul>
```

Pair a status dot with words that say the status. Color alone is not enough.

## Tables

Use `Table` for rows you already have in order. Use `DataTable` when people sort, filter, select, or page. Read the Data Table page before writing one. It presents a TanStack Table instance from `@tanstack/svelte-table` version 9, where features and row models are registered once and passed to `createTable`:

```ts
import {
    type ColumnDef,
    createPaginatedRowModel,
    createSortedRowModel,
    createTable,
    rowPaginationFeature,
    rowSortingFeature,
    sortFns,
    tableFeatures
} from '@tanstack/svelte-table';

const features = tableFeatures({
    rowPaginationFeature,
    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    sortFns
});

const columns: ColumnDef<typeof features, Invoice>[] = [
    { accessorKey: 'client', header: 'Customer' },
    { accessorKey: 'status', header: 'Status' },
    { id: 'amount', header: 'Amount', accessorFn: (invoice) => invoice.cents },
    { id: 'actions', header: 'Actions', enableSorting: false }
];

const table = createTable({
    features,
    columns,
    get data() {
        return visibleInvoices;
    },
    getRowId: (invoice) => invoice.reference,
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } }
});
```

Filter the rows yourself in a `$derived` and hand the result to `data`. That keeps search and the status filter as plain state.

The shape of a data table view:

```svelte
<DataTable.Root {table}>
    {#snippet children()}
        <DataTable.Toolbar>
            <Group.Root aria-label="Invoice filters" class="w-full max-w-lg">
                <Input bind:value={query} aria-label="Search invoices" placeholder="Search customer or invoice…" class="min-w-0 flex-1" />
                <Group.Separator />
                <Select.Root bind:value={status}>
                    <Select.Trigger variant="outline" aria-label="Status" class="w-auto shrink-0">{statusLabel}</Select.Trigger>
                    <Select.Content>
                        <Select.Item value="all">All statuses</Select.Item>
                        <Select.Item value="open">Open</Select.Item>
                    </Select.Content>
                </Select.Root>
            </Group.Root>
            <DataTable.Sort {table} class="ml-auto" />
        </DataTable.Toolbar>
        <DataTable.View {table} caption="Invoices">
            {#snippet cell(cell)}
                <!-- branch on cell.column.id; fall back to <FlexRender {cell} /> -->
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
```

What makes a table read well:

- The first column identifies the row. Make it medium weight in the sans face, even when it is an ID, and put one line of muted 12px detail under it when that saves a column. Mono is for IDs shown as secondary detail.
- The identifier is a link that opens the record. Do not make the whole row a click target.
- Numbers align to the end with `tabular-nums`. Align the column's header the same way, in the `header` snippet, or the label and its values will not line up. Dates use one format throughout.
- Status is a `Badge` with a status variant, and only where status matters. Other columns stay plain text.
- In a pipeline of many steps, color the states that need attention and the finished one. The steps in between are `secondary` badges. Six colors in one column say nothing.
- Row actions sit behind one ghost icon button at the end that opens a `DropdownMenu`. Menu items take `callback`, not `href`.
- Search and filters join in one `Group` at the start of the toolbar. Sort and view options go at the end.
- Five to seven columns. Move the rest into the record's detail view.
- The empty snippet says why it is empty and what to do: "No invoices match your filters."
- Search, the status filter, sorting, and pagination all work. A toolbar that does nothing is worse than no toolbar.

Open a row in a `Sheet` from the end side for a quick look, with the facts as a `dl` and the actions in `Sheet.Footer`.

## Loading and empty dashboards

- While data loads, render the same grid with `Skeleton` in place of each value, chart, and row. Keep the heights identical. For a table, render skeleton cells in the real rows' shape, not one "Loading" row.
- A new workspace with no data shows one `EmptyState` in place of the charts, with the action that produces the first data. Do not render six empty charts.
- A chart with no data for the range keeps its card and says so in one muted line.
- A failed section shows an `Alert variant="error"` in its own card with a retry. The rest of the page still works.

## Layout traps

- A grid child without `min-w-0` lets a chart or table widen the page.
- A visually hidden label (`sr-only`) inside a sideways-scrolling table can stretch the page at phone width. Give its cell `relative`.
- On a phone, drop table columns until the row identifies itself and shows one fact, or render the same rows as a `ul` under a container query: identifier and detail at the start, amount and status at the end. The rest is in the detail sheet.
- Check the last row of a table and the end of the header on a phone: a row menu must still open inside the window.
