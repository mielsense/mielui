<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/chart';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import * as PieChart from '@mielui/svelte/components/pie-chart';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';

    let year = $state('2026');
    let live = $state(false);
    let revision = $state(0);
    const animation = $derived(live ? 'live' : 'reveal');
    const revenue = $derived([
        { month: 'Jan', revenue: year === '2026' ? 18200 : 12400, target: 16000 },
        { month: 'Feb', revenue: year === '2026' ? 21600 : 16800, target: 18000 },
        { month: 'Mar', revenue: year === '2026' ? 19800 : 14300, target: 20000 },
        { month: 'Apr', revenue: year === '2026' ? 28400 : 21200, target: 22000 },
        { month: 'May', revenue: year === '2026' ? 26200 : 19400, target: 24000 },
        { month: 'Jun', revenue: year === '2026' ? 34800 : 24600, target: 26000 }
    ]);
    const total = $derived(revenue.reduce((sum, row) => sum + row.revenue, 0));
    const money = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
    const revenueConfig = {
        revenue: {
            label: 'Revenue',
            color: 'var(--chart-1)',
            format: (value: number) => money.format(value)
        },
        target: {
            label: 'Target',
            color: 'var(--chart-2)',
            format: (value: number) => money.format(value)
        }
    };
    const traffic = $derived([
        { day: 'Mon', desktop: year === '2026' ? 420 : 280, mobile: 240 },
        { day: 'Tue', desktop: year === '2026' ? 580 : 420, mobile: 320 },
        { day: 'Wed', desktop: year === '2026' ? 460 : 360, mobile: 280 },
        { day: 'Thu', desktop: year === '2026' ? 720 : 510, mobile: 410 },
        { day: 'Fri', desktop: year === '2026' ? 640 : 480, mobile: 350 }
    ]);
    const trafficConfig = {
        desktop: { label: 'Desktop', color: 'var(--chart-1)' },
        mobile: { label: 'Mobile', color: 'var(--chart-2)' }
    };
    const channels = $derived([
        { key: 'direct', value: year === '2026' ? 420 : 340 },
        { key: 'search', value: year === '2026' ? 340 : 420 },
        { key: 'referral', value: 180 },
        { key: 'social', value: 40 },
        { key: 'other', value: 20 }
    ]);
    const channelConfig = {
        direct: { label: 'Direct', color: 'var(--chart-1)' },
        search: { label: 'Search', color: 'var(--chart-2)' },
        referral: { label: 'Referral', color: 'var(--chart-3)' },
        social: { label: 'Social', color: 'var(--chart-4)' },
        other: { label: 'Other', color: 'var(--chart-5)' }
    };
    const activity = Array.from({ length: 364 }, (_, index) => {
        const date = new Date(Date.UTC(2025, 8, 24 + index));
        return { date: date.toISOString().slice(0, 10), count: (index * 7 + (index % 3)) % 12 };
    });
</script>

<ScrollArea class="h-full min-h-0" showCues={false}>
    <div class="@container w-full">
        <header
            class="flex min-h-[var(--docs-row-height)] flex-wrap items-center justify-between gap-3 border-b-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] px-6 py-2"
        >
            <h2 class="text-sm font-semibold">Revenue and acquisition</h2>
            <div class="flex flex-wrap items-center gap-4">
                <Tabs.Root bind:value={year} variant="ghost">
                    <div role="group" aria-label="Sample year">
                        <Tabs.List>
                            <Tabs.Trigger value="2025">2025</Tabs.Trigger>
                            <Tabs.Trigger value="2026">2026</Tabs.Trigger>
                        </Tabs.List>
                    </div>
                </Tabs.Root>
                <Switch bind:checked={live} label="Live motion" />
                <Button
                    variant="outline"
                    onclick={() => {
                    revision += 1;
                }}
                >
                    Replay
                </Button>
            </div>
        </header>
        {#key revision}
            <div class="grid min-w-0 gap-8 px-6 py-8 @4xl:grid-cols-3">
                <section class="min-w-0 @4xl:col-span-2">
                    <header class="flex flex-col gap-1">
                        <h3 class="text-sm font-medium">Revenue</h3>
                        <p class="text-sm text-foreground-muted">{`January to June ${year}`}</p>
                    </header>
                    <p class="mb-6 mt-4 text-3xl font-semibold tabular-nums tracking-tight">
                        <span
                            use:numberShuffle={{ value: total, format: (value) => money.format(value) }}
                        >
                            {money.format(total)}
                        </span>
                    </p>
                    <Chart.Root
                        data={revenue}
                        config={revenueConfig}
                        x="month"
                        {animation}
                        aria-label="Monthly revenue"
                    >
                        <Chart.Plot class="h-64">
                            <Chart.Grid />
                            <Chart.XAxis />
                            <Chart.YAxis />
                            <Chart.Area key="revenue" />
                        </Chart.Plot>
                        <Chart.Tooltip />
                    </Chart.Root>
                </section>
                <section class="min-w-0">
                    <header class="flex flex-col gap-1">
                        <h3 class="text-sm font-medium">Acquisition</h3>
                        <p class="text-sm text-foreground-muted">
                            Where visitors found your workspace
                        </p>
                    </header>
                    <div class="mt-6">
                        <PieChart.Root
                            data={channels}
                            config={channelConfig}
                            {animation}
                            aria-label="Visitors by acquisition channel"
                        >
                            <PieChart.Plot class="h-56">
                                <PieChart.Arc innerRadius={0.7} />
                                <PieChart.Label />
                            </PieChart.Plot>
                            <PieChart.Legend />
                            <PieChart.Tooltip />
                        </PieChart.Root>
                    </div>
                </section>
            </div>
            <h2
                class="flex h-[var(--docs-row-height)] items-center border-y-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] px-6 text-sm font-semibold"
            >
                Traffic and targets
            </h2>
            <div class="grid min-w-0 gap-8 px-6 py-8 @4xl:grid-cols-3">
                <section class="min-w-0 @4xl:col-span-2">
                    <header class="flex flex-col gap-1">
                        <h3 class="text-sm font-medium">Visits by device</h3>
                        <p class="text-sm text-foreground-muted">
                            Weekday traffic, desktop and mobile
                        </p>
                    </header>
                    <Chart.Root
                        data={traffic}
                        config={trafficConfig}
                        x="day"
                        {animation}
                        aria-label="Weekday visits by device"
                        class="mt-6"
                    >
                        <Chart.Legend />
                        <Chart.Plot class="h-60">
                            <Chart.Grid />
                            <Chart.XAxis />
                            <Chart.YAxis />
                            <Chart.Bar key="desktop" />
                            <Chart.Bar key="mobile" />
                        </Chart.Plot>
                        <Chart.Tooltip />
                    </Chart.Root>
                </section>
                <section class="min-w-0">
                    <header class="flex flex-col gap-1">
                        <h3 class="text-sm font-medium">Against the plan</h3>
                        <p class="text-sm text-foreground-muted">Monthly revenue and target</p>
                    </header>
                    <Chart.Root
                        data={revenue}
                        config={revenueConfig}
                        x="month"
                        {animation}
                        aria-label="Revenue compared with target"
                        class="mt-6"
                    >
                        <Chart.Plot class="h-60">
                            <Chart.Grid />
                            <Chart.XAxis />
                            <Chart.Bar key="revenue" />
                            <Chart.Line key="target" />
                        </Chart.Plot>
                        <Chart.Legend />
                        <Chart.Tooltip />
                    </Chart.Root>
                </section>
            </div>
            <h2
                class="flex h-[var(--docs-row-height)] items-center border-y-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] px-6 text-sm font-semibold"
            >
                Activity
            </h2>
            <div class="px-6 py-8">
                <section class="min-w-0 @4xl:col-span-3">
                    <header class="flex flex-col gap-1">
                        <h3 class="text-sm font-medium">A year of activity</h3>
                        <p class="text-sm text-foreground-muted">
                            Contributions across the workspace
                        </p>
                    </header>
                    <div class="mt-6 flex min-w-0 flex-col gap-8 @5xl:flex-row @5xl:items-center">
                        <div class="min-w-0 flex-1 overflow-x-auto">
                            <Heatmap.Root
                                days={activity}
                                weeks={52}
                                endDate="2026-09-22"
                                animation={live ? 'live' : 'columns'}
                            />
                        </div>
                        <div class="flex shrink-0 items-center justify-center gap-6">
                            <div class="flex flex-col items-center gap-2">
                                <Gauge {animation} value={72} label="Monthly usage" size={72} />
                                <span class="text-sm text-foreground-muted">Monthly usage</span>
                            </div>
                            <div class="flex flex-col items-center gap-2">
                                <Gauge
                                    {animation}
                                    value={94}
                                    label="Success rate"
                                    size={72}
                                    class="[--chart-1:var(--chart-5)]"
                                />
                                <span class="text-sm text-foreground-muted">Success rate</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        {/key}
    </div>
</ScrollArea>
