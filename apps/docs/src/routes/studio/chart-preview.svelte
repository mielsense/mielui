<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import * as Chart from '@mielui/svelte/components/chart';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import * as PieChart from '@mielui/svelte/components/pie-chart';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import FadeScrollArea from '$lib/components/shell/fade-scroll-area.svelte';
    import { getThemeEditor } from './editor/context';

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

    const cardClass = 'min-w-0';
    const editor = getThemeEditor();
    const surface = $derived(editor.state.glassSurfaces ? 'glass' : 'solid');
</script>

<FadeScrollArea class="h-full" start>
    <div class="@container w-full">
        <div class="flex flex-wrap items-center justify-between gap-3 px-5 pt-16">
            <h2 class="m-0 text-[15px] leading-6 font-medium text-foreground">Analytics</h2>
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
        </div>
        {#key revision}
            <div class="grid min-w-0 gap-4 px-5 pt-4 @4xl:grid-cols-3">
                <Card.Root variant="inset" {surface} class={`${cardClass} @4xl:col-span-2`}>
                    <Card.Header>
                        <Card.Title>Revenue</Card.Title>
                        <Card.Description>{`January to June ${year}`}</Card.Description>
                    </Card.Header>
                    <Card.Content class="flex min-w-0 flex-col">
                        <p class="m-0 mb-5 text-3xl font-medium tabular-nums tracking-tight">
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
                    </Card.Content>
                </Card.Root>
                <Card.Root variant="inset" {surface} class={cardClass}>
                    <Card.Header>
                        <Card.Title>Acquisition</Card.Title>
                        <Card.Description>Where visitors found your workspace</Card.Description>
                    </Card.Header>
                    <Card.Content class="flex min-w-0 flex-col">
                        <div>
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
                    </Card.Content>
                </Card.Root>
            </div>
            <div class="grid min-w-0 gap-4 px-5 pt-4 @4xl:grid-cols-3">
                <Card.Root variant="inset" {surface} class={`${cardClass} @4xl:col-span-2`}>
                    <Card.Header>
                        <Card.Title>Visits by device</Card.Title>
                        <Card.Description>Weekday traffic, desktop and mobile</Card.Description>
                    </Card.Header>
                    <Card.Content class="flex min-w-0 flex-col">
                        <Chart.Root
                            data={traffic}
                            config={trafficConfig}
                            x="day"
                            {animation}
                            aria-label="Weekday visits by device"
                            class="mt-1"
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
                    </Card.Content>
                </Card.Root>
                <Card.Root variant="inset" {surface} class={cardClass}>
                    <Card.Header>
                        <Card.Title>Against the plan</Card.Title>
                        <Card.Description>Monthly revenue and target</Card.Description>
                    </Card.Header>
                    <Card.Content class="flex min-w-0 flex-col">
                        <Chart.Root
                            data={revenue}
                            config={revenueConfig}
                            x="month"
                            {animation}
                            aria-label="Revenue compared with target"
                            class="mt-1"
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
                    </Card.Content>
                </Card.Root>
            </div>
            <div class="px-5 pt-4 pb-5">
                <Card.Root variant="inset" {surface} class={cardClass}>
                    <Card.Header>
                        <Card.Title>A year of activity</Card.Title>
                        <Card.Description>Contributions across the workspace</Card.Description>
                    </Card.Header>
                    <Card.Content class="flex min-w-0 flex-col">
                        <div class="flex min-w-0 flex-col gap-8 @5xl:flex-row @5xl:items-center">
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
                    </Card.Content>
                </Card.Root>
            </div>
        {/key}
    </div>
</FadeScrollArea>
