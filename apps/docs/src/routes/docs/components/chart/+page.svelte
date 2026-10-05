<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { chartGuides } from '$lib/chart-guides';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSource from './examples/hero.svelte?raw';
    import States from './examples/states.svelte';
    import StatesSource from './examples/states.svelte?raw';

    const guides = chartGuides.filter((guide) => guide.component === 'chart');
</script>
<svelte:head>
    <title>Mielui · Chart</title>
    <meta name="description" content="Bar, line, and area charts built from composable marks." />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Chart">Bar, line, and area charts built from composable marks.</PageIntro>
    <section id="hero" class="flex scroll-mt-20 flex-col gap-4">
        <ComponentPreview refreshable code={HeroSource}><Hero /></ComponentPreview>
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
                    class="rounded-lg border border-border p-4 transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"
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
</div>
