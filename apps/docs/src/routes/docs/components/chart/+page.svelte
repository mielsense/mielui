<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { chartGuides } from '$lib/chart-guides';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import States from './examples/states.svelte';
    import StatesSource from './examples/states.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    type Revenue = {
        month: string;
        revenue: number;
        target: number;
    };

    const guides = chartGuides.filter((guide) => guide.component === 'chart');
    const revenue: Revenue[] = [
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
    const noRevenue: Revenue[] = [];
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
                    data={values.empty ? noRevenue : revenue}
                    config={revenueConfig}
                    x="month"
                    aria-label="Monthly revenue and target"
                    class="w-full"
                    orientation={values.orientation}
                    stacked={values.type === 'bar' && values.stacked}
                    animation={values.animation}
                    loading={values.loading}
                >
                    {#if values.legend}
                        <Chart.Legend />
                    {/if}
                    <Chart.Plot>
                        {#if values.grid}
                            <Chart.Grid ticks={values.ticks} />
                        {/if}
                        {#if values.xAxis}
                            <Chart.XAxis ticks={values.ticks} />
                        {/if}
                        {#if values.yAxis}
                            <Chart.YAxis ticks={values.ticks} />
                        {/if}
                        {#if values.type === 'bar'}
                            <Chart.Bar key="revenue" radius={values.radius} />
                            <Chart.Bar key="target" radius={values.radius} />
                        {:else if values.type === 'line'}
                            <Chart.Line key="revenue" strokeWidth={values.strokeWidth} />
                            <Chart.Line key="target" strokeWidth={values.strokeWidth} />
                        {:else if values.type === 'area'}
                            <Chart.Area key="revenue" strokeWidth={values.strokeWidth} />
                            <Chart.Area key="target" strokeWidth={values.strokeWidth} />
                        {:else}
                            <Chart.Area key="revenue" strokeWidth={values.strokeWidth} />
                            <Chart.Line key="target" strokeWidth={values.strokeWidth} />
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
            Root owns data, config, and the category field x. Each config entry gives a numeric
            series a label, a color, and an optional value formatter. Match each mark key to its
            data field and config entry.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Plot establishes the scales. Put Grid, XAxis, YAxis, and marks inside it. Place Legend
            and Tooltip directly inside Root; either can move or be omitted.
        </Typography.Text>
        <Typography.Text variant="supporting">
            String categories use equal spacing. Numeric and Date categories retain their relative
            distance. Sort time-series data before rendering. Null, missing, and non-finite numeric
            values leave gaps.
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            lang="svelte"
            code={`import * as Chart from '@mielui/svelte/components/chart';

const data = [
  { month: 'Jan', revenue: 186, target: 160 },
  { month: 'Feb', revenue: 242, target: 190 }
];
const config = {
  revenue: { label: 'Revenue' },
  target: { label: 'Target' }
};

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
</Chart.Root>`}
        />
    </section>
    <section id="chart-types" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Chart types</Typography.H2>
        <div class="grid gap-3 @xl:grid-cols-2">
            {#each guides as guide}
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
            Set loading on Root while a request is pending. The chart keeps its height and displays
            a neutral skeleton. An empty dataset shows an empty state instead of fabricated values.
            Try each state below.
        </Typography.Text>
        <ComponentPreview code={StatesSource}><States /></ComponentPreview>
    </section>
    <section id="motion" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Animation</Typography.H2>
        <Typography.Text variant="supporting">
            The default reveal runs on entry. Data changes transition from the current display. Set
            animation="live" for a traveling line highlight, a sweep through the area fill, or
            subtle staggered highlights rising through the bars, with quiet intervals between
            passes. Highlights disappear while inspecting values. Motion pauses offscreen or when
            the tab is hidden. Set animation="none" to disable chart motion.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Tooltips share one single-border surface with pie and heatmap tooltips, inherit the
            theme’s glass setting, and sit beside the pointer. Chart motion follows reduced-motion
            preferences and the theme motion setting. Every chart-type guide includes a live example
            so you can compare the effect on different marks.
        </Typography.Text>
    </section>
    <section id="accessibility" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Accessibility</Typography.H2>
        <Typography.Text variant="supporting">
            Give Root a descriptive aria-label. Root includes a screen-reader data table. With
            Tooltip present, Tab reaches the category controls once; arrow keys, Home, and End move
            between categories to inspect the same values available by pointer. Escape dismisses the
            tooltip.
        </Typography.Text>
    </section>

    <section id="labels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English by default. Pass labels to Chart.Root to translate or reword
            the loading and empty messages and the keyboard inspection controls. Every key is
            optional; omitted keys keep their default.
        </Typography.Text>
        <CodeBlock
            code={`<Chart.Root {data} {config} x="month" aria-label="Revenus" labels={{ loading: 'Chargement…', empty: 'Aucune donnée', inspect: (category) => \`Inspecter \${category}\` }} />`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="marks-and-ticks" class="flex flex-col gap-4">
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
