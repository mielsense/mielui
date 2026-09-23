<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { getChartGuide } from '$lib/chart-guides';
    import { ComponentPreview } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Example0 from '../examples/area.svelte';
    import Source0 from '../examples/area.svelte?raw';
    import Example1 from '../examples/area-comparison.svelte';
    import Source1 from '../examples/area-comparison.svelte?raw';
    import Example3 from '../examples/area-live.svelte';
    import Source3 from '../examples/area-live.svelte?raw';
    import States from '../examples/area-states.svelte';
    import StatesSource from '../examples/area-states.svelte?raw';
    import Example2 from '../examples/area-updates.svelte';
    import Source2 from '../examples/area-updates.svelte?raw';

    const guide = getChartGuide('chart', 'area');
</script>
<svelte:head>
    <title>{`Mielui · ${guide.title}`}</title>
    <meta name="description" content={guide.description} />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title={guide.title}>{guide.description}</PageIntro>
    <section id="usage" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        {#each guide.usage as paragraph}
            <Typography.Text variant="supporting">{paragraph}</Typography.Text>
        {/each}
    </section>
    <section id="area" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[0].title}>
            {#snippet description()}
                {guide.examples[0].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={Source0}><Example0 /></ComponentPreview>
    </section>
    <section id="area-comparison" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[1].title}>
            {#snippet description()}
                {guide.examples[1].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={Source1}><Example1 /></ComponentPreview>
    </section>
    <section id="area-updates" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[2].title}>
            {#snippet description()}
                {guide.examples[2].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={Source2}><Example2 /></ComponentPreview>
    </section>
    <section id="area-live" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title={guide.examples[3].title}>
            {#snippet description()}
                {guide.examples[3].description}
            {/snippet}
        </SectionHeading>
        <ComponentPreview refreshable code={Source3}><Example3 /></ComponentPreview>
    </section>
    <section id="states" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title="Data and animation states">
            {#snippet description()}
                Compare ready, loading, and empty data. Switch between reveal, live, and no
                animation, or replay the entrance. Reduced motion overrides animation settings.
            {/snippet}
        </SectionHeading>
        <ComponentPreview code={StatesSource}><States /></ComponentPreview>
    </section>
    <section id="api-reference" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">API reference</Typography.H2>
        <p class="text-sm text-foreground-muted">
            See the{' '}
            <a
                class="text-foreground underline underline-offset-4"
                href="/docs/components/chart#api-reference"
            >
                shared API reference
            </a> for every part and prop.
        </p>
    </section>
</div>
