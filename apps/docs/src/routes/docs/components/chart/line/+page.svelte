<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { getChartGuide } from '$lib/chart-guides';
    import { ComponentPreview } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Line from '../examples/line.svelte';
    import LineSrc from '../examples/line.svelte?raw';
    import LineDates from '../examples/line-dates.svelte';
    import LineDatesSrc from '../examples/line-dates.svelte?raw';
    import LineGaps from '../examples/line-gaps.svelte';
    import LineGapsSrc from '../examples/line-gaps.svelte?raw';
    import States from '../examples/line-states.svelte';
    import StatesSrc from '../examples/line-states.svelte?raw';
    import Live from '../examples/live.svelte';
    import LiveSrc from '../examples/live.svelte?raw';

    const guide = getChartGuide('chart', 'line');
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
    <section id="line" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[0].title}>
            {#snippet description()}
                {guide.examples[0].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={LineSrc}><Line /></ComponentPreview>
    </section>
    <section id="line-gaps" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[1].title}>
            {#snippet description()}
                {guide.examples[1].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={LineGapsSrc}><LineGaps /></ComponentPreview>
    </section>
    <section id="line-dates" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[2].title}>
            {#snippet description()}
                {guide.examples[2].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={LineDatesSrc}><LineDates /></ComponentPreview>
    </section>
    <section id="live" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[3].title}>
            {#snippet description()}
                {guide.examples[3].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={LiveSrc}><Live /></ComponentPreview>
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
