<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { chartGuides } from '$lib/chart-guides';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import States from './examples/states.svelte';
    import StatesSrc from './examples/states.svelte?raw';
    import {
        code as playgroundCode,
        config as playgroundConfig,
        controls as playgroundControls,
        revenue as playgroundRevenue
    } from './playground';

    const guides = chartGuides.filter((guide) => guide.component === 'chart');
    const noRevenue: typeof playgroundRevenue = [];

    const usage = `<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { month: 'Jan', revenue: 186, target: 160 },
        { month: 'Feb', revenue: 242, target: 190 }
    ];
    const config = {
        revenue: { label: 'Revenue' },
        target: { label: 'Target' }
    };
</${'script'}>

<Chart.Root {data} {config} x="month" aria-label="Monthly revenue and target">
    <Chart.Legend />
    <Chart.Plot>
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar key="revenue" />
        <Chart.Line key="target" />
    </Chart.Plot>
    <Chart.Tooltip />
</Chart.Root>`;
</script>

<svelte:head>
    <title>Mielui · Chart</title>
    <meta name="description" content="Bar, line, and area charts built from composable marks." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Chart">Bar, line, and area charts built from composable marks.</PageIntro>
    <section id="hero" class="flex scroll-mt-20 flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode} refreshable>
            {#snippet children(values)}
                <Chart.Root
                    data={values.state === 'empty' ? noRevenue : playgroundRevenue}
                    config={playgroundConfig}
                    x="month"
                    aria-label="Monthly revenue and target"
                    class="w-full"
                    orientation={values.orientation}
                    animation={values.animation}
                    loading={values.state === 'loading'}
                >
                    {#if values.legend}
                        <Chart.Legend />
                    {/if}
                    <Chart.Plot>
                        {#if values.grid}
                            <Chart.Grid />
                        {/if}
                        {#if values.axes}
                            <Chart.XAxis />
                            <Chart.YAxis />
                        {/if}
                        {#if values.type === 'bar'}
                            <Chart.Bar key="revenue" />
                            <Chart.Bar key="target" />
                        {:else if values.type === 'line'}
                            <Chart.Line key="revenue" />
                            <Chart.Line key="target" />
                        {:else if values.type === 'area'}
                            <Chart.Area key="revenue" />
                            <Chart.Area key="target" />
                        {:else}
                            <Chart.Area key="revenue" />
                            <Chart.Line key="target" />
                        {/if}
                    </Chart.Plot>
                    {#if values.tooltip}
                        <Chart.Tooltip />
                    {/if}
                </Chart.Root>
            {/snippet}
        </Playground>
    </section>
    <section id="installation" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add chart" />
    </section>
    <section id="usage" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root takes `data`, `config`, and `x`, the field that holds each category. Each `config` entry gives a numeric series a label, a color, and an optional value formatter. Match each mark's `key` to its data field and config entry."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            Plot sets up the scales. Put Grid, XAxis, YAxis, and the marks inside it. Place Legend
            and Tooltip directly inside Root; either can move or be left out.
        </Typography.Text>
        <Typography.Text variant="supporting">
            String categories use equal spacing. Numeric and Date categories retain their relative
            distance. Sort time-series data before rendering. Null, missing, and non-finite numeric
            values leave gaps.
        </Typography.Text>
        <CodeBlock copy="overlay" lang="svelte" code={usage} />
    </section>
    <section id="chart-types" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Chart types</Typography.H2>
        <div class="grid gap-3 @xl:grid-cols-2">
            {#each guides as guide (guide.slug)}
                <a
                    href={`/docs/components/${guide.component}/${guide.slug}`}
                    class="mielui-plate block p-4 transition-[background-color,box-shadow] [transition-duration:var(--motion-duration-hover)] hover:bg-[color-mix(in_srgb,var(--color-foreground)_3%,var(--color-card))] focus-visible:shadow-[var(--focus-ring),var(--elevation-1)] focus-visible:outline-none motion-reduce:transition-none"
                >
                    <span class="font-medium">{guide.title}</span>
                    <p class="mt-1 text-sm text-foreground-muted">{guide.description}</p>
                </a>
            {/each}
        </div>
    </section>
    <section id="states" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Loading and empty data</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Set `loading` on Root while a request is pending. The chart keeps its height and shows a neutral skeleton. An empty dataset shows an empty state; pass an `empty` snippet to Plot to replace it. Try each state below."}
            />
        </Typography.Text>
        <ComponentPreview code={StatesSrc}><States /></ComponentPreview>
    </section>
    <section id="motion" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Animation</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"The default `reveal` animation runs on entry, and data changes transition from the current display. Set `animation=\"live\"` for a highlight that travels along lines, sweeps through areas, and rises through bars, with pauses between passes. Highlights hide while you inspect values, and motion pauses offscreen or when the tab is hidden. Set `animation=\"none\"` to turn chart motion off."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            Chart motion follows reduced-motion preferences and the theme's motion setting. Every
            chart-type guide includes a live example to compare the effect on different marks.
            Tooltips share their surface with pie and heatmap tooltips, follow the theme's glass
            setting, and sit beside the pointer.
        </Typography.Text>
    </section>
    <section id="accessibility" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Accessibility</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Give Root a descriptive `aria-label`; it is required. Root includes a data table for screen readers. With Tooltip present, Tab reaches the categories once, and arrow keys, Home, and End move between them to inspect the same values a pointer shows. Escape dismisses the tooltip."}
            />
        </Typography.Text>
    </section>
    <section id="labels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Built-in text is English by default. Pass `labels` to Root to translate or reword the loading and empty messages, the data table, and the keyboard inspection controls. Every key of `ChartLabels` is optional; omitted keys keep their default."}
            />
        </Typography.Text>
        <CodeBlock
            code={`<Chart.Root
    {data}
    {config}
    x="month"
    aria-label="Revenus mensuels"
    labels={{
        loading: 'Chargement…',
        empty: 'Aucune donnée',
        inspect: (category) => \`Inspecter \${category}\`
    }}
>
    <Chart.Plot>
        <Chart.Bar key="revenue" />
    </Chart.Plot>
</Chart.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="marks-and-ticks" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Mark and tick sizes</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Line and Area take `strokeWidth`, the thickness of the line in pixels. Bar takes `radius` for the corner radius of each bar, 4 by default. Use 0 for square bars in a dense chart."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`ticks` on XAxis and YAxis is the number of ticks to aim for. Grid takes the same prop for its lines and defaults to 5."}
            />
        </Typography.Text>
    </section>
</div>
