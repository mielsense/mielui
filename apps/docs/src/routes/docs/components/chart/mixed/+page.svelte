<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { getChartGuide } from '#lib/chart-guides.js';
    import { ComponentPreview } from '#lib/components/docs/index.js';
    import InlineText from '#lib/components/docs/inline-text.svelte';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import SectionHeading from '#lib/components/docs/section-heading.svelte';
    import Composition from '../examples/composition.svelte';
    import CompositionSrc from '../examples/composition.svelte?raw';
    import LiveMixed from '../examples/live-mixed.svelte';
    import LiveMixedSrc from '../examples/live-mixed.svelte?raw';
    import Mixed from '../examples/mixed.svelte';
    import MixedSrc from '../examples/mixed.svelte?raw';
    import States from '../examples/mixed-states.svelte';
    import StatesSrc from '../examples/mixed-states.svelte?raw';

    const guide = getChartGuide('chart', 'mixed');
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
    <section id="mixed" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[0].title}>
            {#snippet description()}
                {guide.examples[0].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={MixedSrc}><Mixed /></ComponentPreview>
    </section>
    <section id="live-mixed" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[1].title}>
            {#snippet description()}
                {guide.examples[1].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={LiveMixedSrc}><LiveMixed /></ComponentPreview>
    </section>
    <section id="composition" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[2].title}>
            {#snippet description()}
                {guide.examples[2].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={CompositionSrc}><Composition /></ComponentPreview>
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
