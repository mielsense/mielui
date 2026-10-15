<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { getChartGuide } from '$lib/chart-guides';
    import { ComponentPreview } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import LivePie from '../examples/live-pie.svelte';
    import LivePieSrc from '../examples/live-pie.svelte?raw';
    import Pie from '../examples/pie.svelte';
    import PieSrc from '../examples/pie.svelte?raw';
    import PieSelection from '../examples/pie-selection.svelte';
    import PieSelectionSrc from '../examples/pie-selection.svelte?raw';
    import States from '../examples/pie-states.svelte';
    import StatesSrc from '../examples/pie-states.svelte?raw';

    const guide = getChartGuide('pie-chart', 'pie');
</script>

<svelte:head>
    <title>{`Mielui · ${guide.title}`}</title>
    <meta name="description" content={guide.description} />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title={guide.title}>{guide.description}</PageIntro>

    <section id="usage" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        {#each guide.usage as paragraph (paragraph)}
            <Typography.Text variant="supporting">{paragraph}</Typography.Text>
        {/each}
    </section>

    <section id="pie" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[0].title}>
            {#snippet description()}
                {guide.examples[0].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={PieSrc}><Pie /></ComponentPreview>
    </section>

    <section id="live-pie" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[1].title}>
            {#snippet description()}
                {guide.examples[1].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={LivePieSrc}><LivePie /></ComponentPreview>
    </section>

    <section id="pie-selection" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[2].title}>
            {#snippet description()}
                {guide.examples[2].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={PieSelectionSrc}><PieSelection /></ComponentPreview>
    </section>

    <section id="states" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title="Data and animation states">
            {#snippet description()}
                Compare ready, loading, and empty data. Switch between reveal, live, and no
                animation, or replay the entrance. Reduced motion overrides animation settings.
            {/snippet}
        </SectionHeading>
        <ComponentPreview code={StatesSrc}><States /></ComponentPreview>
    </section>

    <section id="api-reference" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">API reference</Typography.H2>
        <p class="text-sm text-foreground-muted">
            See the{' '}
            <a
                class="text-foreground underline underline-offset-4"
                href="/docs/components/pie-chart#api-reference"
            >
                shared API reference
            </a>
            for every part and prop.
        </p>
    </section>
</div>
