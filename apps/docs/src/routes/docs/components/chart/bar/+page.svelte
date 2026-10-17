<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { getChartGuide } from '$lib/chart-guides';
    import { ComponentPreview } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import BarNegative from '../examples/bar-negative.svelte';
    import BarNegativeSrc from '../examples/bar-negative.svelte?raw';
    import States from '../examples/bar-states.svelte';
    import StatesSrc from '../examples/bar-states.svelte?raw';
    import Grouped from '../examples/grouped.svelte';
    import GroupedSrc from '../examples/grouped.svelte?raw';
    import Horizontal from '../examples/horizontal.svelte';
    import HorizontalSrc from '../examples/horizontal.svelte?raw';
    import LiveBars from '../examples/live-bars.svelte';
    import LiveBarsSrc from '../examples/live-bars.svelte?raw';
    import Updates from '../examples/updates.svelte';
    import UpdatesSrc from '../examples/updates.svelte?raw';

    const guide = getChartGuide('chart', 'bar');
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
    <section id="grouped" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[0].title}>
            {#snippet description()}
                {guide.examples[0].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={GroupedSrc}><Grouped /></ComponentPreview>
    </section>
    <section id="horizontal" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[1].title}>
            {#snippet description()}
                {guide.examples[1].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={HorizontalSrc}><Horizontal /></ComponentPreview>
    </section>
    <section id="bar-negative" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[2].title}>
            {#snippet description()}
                {guide.examples[2].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={BarNegativeSrc}><BarNegative /></ComponentPreview>
    </section>
    <section id="updates" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[3].title}>
            {#snippet description()}
                {guide.examples[3].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={UpdatesSrc}><Updates /></ComponentPreview>
    </section>
    <section id="live-bars" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[4].title}>
            {#snippet description()}
                {guide.examples[4].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={LiveBarsSrc}><LiveBars /></ComponentPreview>
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
        <Typography.Text variant="supporting">
            <InlineText
                text={"See the [shared API reference](/docs/components/chart#api-reference) for every part and prop."}
            />
        </Typography.Text>
    </section>
</div>
