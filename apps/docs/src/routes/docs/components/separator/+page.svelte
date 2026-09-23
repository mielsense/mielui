<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Additional from './examples/sections.svelte';
    import AdditionalSrc from './examples/sections.svelte?raw';
</script>
<svelte:head>
    <title>Mielui · Separator</title>
    <meta name="description" content="Semantic or decorative divider in either orientation." />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Separator">Semantic or decorative divider in either orientation.</PageIntro>
    <section id="hero" class="flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="installation" class="flex flex-col gap-4">
        <Typography.H2>Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add separator" />
    </section>
    <section id="usage" class="flex flex-col gap-4">
        <Typography.H2>Usage</Typography.H2>
        <Typography.Text>
            Separator renders a semantic separator by default. Set decorative when spacing and
            styling already convey the grouping and no semantic divider is needed.
            orientation="vertical" needs a surrounding row with a defined height; horizontal
            dividers fill the available width. Native attributes, class, and bind:element are
            forwarded.
        </Typography.Text>
    </section>
    <section id="sections" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Horizontal sections</Typography.H2>
        <ComponentPreview code={AdditionalSrc}><Additional /></ComponentPreview>
    </section>
</div>
