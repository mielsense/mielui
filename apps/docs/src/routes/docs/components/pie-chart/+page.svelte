<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as PieChart from '@mielui/svelte/components/pie-chart';
    import * as Typography from '@mielui/svelte/components/typography';
    import { chartGuides } from '#lib/chart-guides.js';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import States from './examples/states.svelte';
    import StatesSource from './examples/states.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        sessions,
        sessionsConfig
    } from './playground';

    const guides = chartGuides.filter((guide) => guide.component === 'pie-chart');
    const noSessions: PieChart.PieChartDatum[] = [];

    const usageSnippet = `<script lang="ts">
    import * as PieChart from '@mielui/svelte/components/pie-chart';

    const data = [
        { key: 'direct', value: 1240 },
        { key: 'search', value: 860 }
    ];
    const config = {
        direct: { label: 'Direct', color: 'var(--chart-1)' },
        search: { label: 'Search', color: 'var(--chart-2)' }
    };
<${'/'}script>

<PieChart.Root {data} {config} aria-label="Sessions by acquisition channel">
    <PieChart.Plot>
        <PieChart.Arc />
        <PieChart.Label />
    </PieChart.Plot>
    <PieChart.Tooltip />
    <PieChart.Legend />
</PieChart.Root>`;

    const labelsSnippet = `<script lang="ts">
    import * as PieChart from '@mielui/svelte/components/pie-chart';
    import type { PieChartDatum, PieChartLabels } from '@mielui/svelte/components/pie-chart';

    let { data }: { data: PieChartDatum[] } = $props();

    const config = {
        direct: { label: 'Direct' },
        search: { label: 'Recherche' }
    };
    const labels: PieChartLabels = {
        loading: 'Chargement…',
        empty: 'Aucune donnée',
        category: 'Catégorie',
        value: 'Valeur'
    };
<${'/'}script>

<PieChart.Root {data} {config} {labels} aria-label="Sessions par canal">
    <PieChart.Plot>
        <PieChart.Arc />
    </PieChart.Plot>
</PieChart.Root>`;
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
        <Playground controls={playgroundControls} code={playgroundCode} refreshable>
            {#snippet children(values)}
                <div class="w-full max-w-lg">
                    <PieChart.Root
                        data={values.empty ? noSessions : sessions}
                        config={sessionsConfig}
                        aria-label="Monthly sessions by acquisition channel"
                        animation={values.animation}
                        loading={values.loading}
                    >
                        <PieChart.Plot class="h-64">
                            <PieChart.Arc innerRadius={values.innerRadius} />
                            {#if values.label}
                                <PieChart.Label />
                            {/if}
                        </PieChart.Plot>
                        {#if values.tooltip}
                            <PieChart.Tooltip />
                        {/if}
                        {#if values.legend}
                            <PieChart.Legend />
                        {/if}
                    </PieChart.Root>
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add pie-chart" />
    </section>

    <section id="usage" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass Root `data` with a stable `key` and a `value` for each category, and a `config` entry with a `label` and an optional `color` and `format` for each key. Values must be finite and not negative; do not draw a negative balance as a slice. The total is the sum of the data, and stable keys keep slices and labels tied to the same category across updates."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Put Arc and an optional Label inside Plot, and Legend and Tooltip directly inside Root. Arc draws a donut by default; set `innerRadius={0}` for a solid pie. Label shows the total in the center; its `children` snippet receives `total` and the `active` slice for custom content. The tooltip follows the pointer outside the ring so the slice you inspect stays visible."}
            />
        </Typography.Text>
        <CodeBlock copy="overlay" lang="svelte" code={usageSnippet} />
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
                text={"Set `loading` on Root while a request is pending; the chart keeps its height and shows a neutral skeleton. An empty dataset shows an empty state rather than made-up values."}
            />
        </Typography.Text>
        <ComponentPreview code={StatesSource}><States /></ComponentPreview>
    </section>

    <section id="motion" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Animation</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`animation` defaults to `reveal`, which runs once on entry; data changes then transition from what is on screen. `live` highlights segments one after another with quiet pauses and never moves their boundaries. It pauses while a segment is active, while the chart is offscreen, and while the tab is hidden. `none` turns chart motion off. Reduced motion and the theme's motion setting are respected."}
            />
        </Typography.Text>
    </section>

    <section id="accessibility" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Accessibility</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Root requires a descriptive `aria-label` and includes a data table for screen readers. Focus a legend item to inspect its value, or point at a slice; Escape dismisses the tooltip."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `labels` to Root to translate the loading and empty messages and the column headings of the screen-reader table. Every key of `PieChartLabels` is optional; omitted keys keep the English text."}
            />
        </Typography.Text>
        <CodeBlock code={labelsSnippet} lang="svelte" copy="overlay" />
    </section>
</div>
