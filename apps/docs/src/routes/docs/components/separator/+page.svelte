<script lang="ts">
    import Separator from '@mielui/svelte/components/separator';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Additional from './examples/sections.svelte';
    import AdditionalSrc from './examples/sections.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';
</script>
<svelte:head>
    <title>Mielui · Separator</title>
    <meta name="description" content="Semantic or decorative divider in either orientation." />
</svelte:head>
<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Separator">Semantic or decorative divider in either orientation.</PageIntro>
    <section id="hero" class="flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#if values.orientation === 'vertical'}
                    <div class="flex h-5 items-center gap-4 text-sm">
                        <span>Projects</span>
                        <Separator orientation="vertical" decorative={values.decorative} />
                        <span>Members</span>
                    </div>
                {:else}
                    <div class="flex w-full max-w-xs flex-col gap-4 text-sm">
                        <p class="m-0">Projects</p>
                        <Separator decorative={values.decorative} />
                        <p class="m-0">Members</p>
                    </div>
                {/if}
            {/snippet}
        </Playground>
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
    <section id="both-orientations" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Both orientations</Typography.H2>
        <Typography.Text variant="supporting">
            A horizontal separator splits a heading from a row, and a vertical one splits the two
            items in that row.
        </Typography.Text>
        <ComponentPreview code={HeroSrc}><Hero /></ComponentPreview>
    </section>
    <section id="sections" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Horizontal sections</Typography.H2>
        <ComponentPreview code={AdditionalSrc}><Additional /></ComponentPreview>
    </section>
    <section id="inline-styles" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Inline styles</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Separator accepts `style` next to `class`, for a one-off length or color that does not deserve a utility class."}
            />
        </Typography.Text>
    </section>
</div>
