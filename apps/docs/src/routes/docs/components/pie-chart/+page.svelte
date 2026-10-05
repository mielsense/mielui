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

    const guides = chartGuides.filter((guide) => guide.component === 'pie-chart');
</script>
<svelte:head>
    <title>Mielui · Pie Chart</title>
    <meta
        name="description"
        content="Pie and donut charts with exact values, keyboard inspection, and composed labels."
    />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Pie Chart">
        Pie and donut charts with exact values, keyboard inspection, and composed labels.
    </PageIntro>
    <section id="hero" class="flex scroll-mt-20 flex-col gap-4">
        <ComponentPreview refreshable code={HeroSource}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add pie-chart" />
    </section>
    <section id="usage" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Root accepts data with stable key and value fields. Config supplies a label, color, and
            optional formatter for each key. Values must be finite and nonnegative; do not represent
            a negative balance as a slice.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Place Arc and an optional Label inside Plot. Legend and Tooltip belong directly inside
            Root. Tooltips share the chart tooltip surface, inherit the theme’s glass setting, and
            track the pointer outside the ring so the inspected slice stays visible. Set innerRadius
            to 0 on Arc for a solid pie. For a donut, add Label or replace its children to show a
            custom center.
        </Typography.Text>
        <Typography.Text variant="supporting">
            The total comes from the visible data. Keep category keys stable across updates so
            slices and labels stay associated with the same category.
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            lang="svelte"
            code={`import * as PieChart from '@mielui/svelte/components/pie-chart';

const data = [
  { key: 'direct', value: 1240 },
  { key: 'search', value: 860 }
];
const config = {
  direct: { label: 'Direct' },
  search: { label: 'Search' }
};

<PieChart.Root {data} {config} aria-label="Sessions by acquisition channel">
  <PieChart.Plot>
    <PieChart.Arc />
    <PieChart.Label />
  </PieChart.Plot>
  <PieChart.Tooltip />
  <PieChart.Legend />
</PieChart.Root>`}
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
            animation="live" for subtle sequential highlights with quiet intervals, without moving
            segment boundaries. The effect pauses while a segment is active, offscreen, or the tab
            is hidden. Set animation="none" to disable chart motion.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Chart motion follows reduced-motion preferences and the theme motion setting. Every
            chart-type guide includes a live example so you can compare the effect on different
            marks.
        </Typography.Text>
    </section>
    <section id="accessibility" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Accessibility</Typography.H2>
        <Typography.Text variant="supporting">
            Give Root a descriptive aria-label. Root includes a screen-reader data table. Focus a
            legend item to inspect its value. Pointer users can inspect the same values on each
            slice. Escape dismisses the tooltip.
        </Typography.Text>
    </section>

    <section id="labels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text>
            Built-in text is English by default. Pass labels to PieChart.Root to translate or reword
            the loading and empty messages and the screen-reader table headings. Every key is
            optional; omitted keys keep their default.
        </Typography.Text>
        <CodeBlock
            code={`<PieChart.Root {data} {config} aria-label="Répartition" labels={{ loading: 'Chargement…', empty: 'Aucune donnée', category: 'Catégorie', value: 'Valeur' }} />`}
            lang="svelte"
            copy="overlay"
        />
    </section>
</div>
