<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Badge } from '@mielui/svelte/components/badge';
    import * as Chart from '@mielui/svelte/components/chart';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import { Input } from '@mielui/svelte/components/input';
    import * as PieChart from '@mielui/svelte/components/pie-chart';
    import * as Table from '@mielui/svelte/components/table';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let { slug }: { slug: string } = $props();

    const invoices = [
        {
            id: '#1001',
            status: 'Paid',
            amount: '$250'
        },
        {
            id: '#1002',
            status: 'Pending',
            amount: '$150'
        },
        {
            id: '#1003',
            status: 'Paid',
            amount: '$350'
        }
    ];
    const revenue = [
        {
            month: 'Jan',
            revenue: 186,
            target: 160
        },
        {
            month: 'Feb',
            revenue: 242,
            target: 190
        },
        {
            month: 'Mar',
            revenue: 218,
            target: 220
        },
        {
            month: 'Apr',
            revenue: 304,
            target: 250
        },
        {
            month: 'May',
            revenue: 286,
            target: 280
        },
        {
            month: 'Jun',
            revenue: 372,
            target: 310
        }
    ];
    const revenueConfig = {
        revenue: {
            label: 'Revenue',
            color: 'var(--chart-1)'
        },
        target: {
            label: 'Target',
            color: 'var(--chart-2)'
        }
    };
    const sources = [
        {
            key: 'direct',
            value: 1240
        },
        {
            key: 'search',
            value: 860
        },
        {
            key: 'referral',
            value: 420
        }
    ];
    const sourceConfig = {
        direct: {
            label: 'Direct',
            color: 'var(--chart-1)'
        },
        search: {
            label: 'Search',
            color: 'var(--chart-2)'
        },
        referral: {
            label: 'Referral',
            color: 'var(--chart-3)'
        }
    };
    const days = Array.from(
        {
            length: 112
        },
        (_, index) => {
            const date = new Date(Date.UTC(2026, 4, 26 + index));

            return {
                date: date.toISOString().slice(0, 10),
                count: index % 7 === 0 ? 0 : (index * 17 + (index % 11)) % 24
            };
        }
    );
</script>

{#if slug === 'table' || slug === 'data-table'}
    <div class="flex w-full max-w-72 flex-col gap-2">
        {#if slug === 'data-table'}
            <Input aria-label="Filter invoices" placeholder="Filter invoices…">
                {#snippet trailing()}
                    <HugeiconsIcon icon={Search} size={14} aria-hidden="true" />
                {/snippet}
            </Input>
        {/if}
        <Table.Root variant={slug === 'data-table' ? 'inset' : 'default'}>
            <Table.Header>
                <Table.Row>
                    {#if slug === 'data-table'}
                        <Table.Head class="w-8">
                            <Checkbox aria-label="Select all invoices" />
                        </Table.Head>
                    {/if}
                    <Table.Head>Invoice</Table.Head>
                    <Table.Head>Status</Table.Head>
                    {#if slug === 'table'}
                        <Table.Head class="text-end">Amount</Table.Head>
                    {/if}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each invoices.slice(0, slug === 'data-table' ? 2 : 3) as invoice (invoice.id)}
                    <Table.Row>
                        {#if slug === 'data-table'}
                            <Table.Cell>
                                <Checkbox
                                    checked={invoice.id === '#1001'}
                                    aria-label={`Select ${invoice.id}`}
                                />
                            </Table.Cell>
                        {/if}
                        <Table.Cell class="font-medium">{invoice.id}</Table.Cell>
                        <Table.Cell>
                            <Badge variant={invoice.status === 'Paid' ? 'success' : 'warning'}>
                                {invoice.status}
                            </Badge>
                        </Table.Cell>
                        {#if slug === 'table'}
                            <Table.Cell class="text-end tabular-nums">{invoice.amount}</Table.Cell>
                        {/if}
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
{:else if slug === 'chart'}
    <Chart.Root
        data={revenue}
        config={revenueConfig}
        x="month"
        aria-label="Monthly revenue and target"
        class="w-72"
    >
        <Chart.Plot class="h-36">
            <Chart.Grid />
            <Chart.XAxis />
            <Chart.Area key="revenue" />
            <Chart.Line key="target" />
        </Chart.Plot>
    </Chart.Root>
{:else if slug === 'gauge'}
    <Gauge value={72} label="Monthly API usage" animation="none">
        <span>
            72
            <span class="text-base text-foreground-muted">%</span>
        </span>
    </Gauge>
{:else if slug === 'heatmap'}
    <div class="w-72">
        <Heatmap.Root {days} weeks={16} animation="none" endDate="2026-09-14">
            {#snippet children()}
                <Heatmap.Calendar>
                    <Heatmap.MonthLabels />
                    <Heatmap.WeekdayLabels />
                    <Heatmap.Grid />
                </Heatmap.Calendar>
            {/snippet}
        </Heatmap.Root>
    </div>
{:else if slug === 'pie-chart'}
    <PieChart.Root
        data={sources}
        config={sourceConfig}
        aria-label="Sessions by acquisition channel"
        class="w-64"
    >
        <PieChart.Plot class="h-32">
            <PieChart.Arc />
        </PieChart.Plot>
        <PieChart.Legend />
    </PieChart.Root>
{/if}
