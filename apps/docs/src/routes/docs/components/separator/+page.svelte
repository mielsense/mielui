<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Separator } from '@mielui/svelte/components/separator';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import BothOrientations from './examples/both-orientations.svelte';
    import BothOrientationsSrc from './examples/both-orientations.svelte?raw';
    import Sections from './examples/sections.svelte';
    import SectionsSrc from './examples/sections.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import { Separator } from '@mielui/svelte/components/separator';
</${'script'}>

<Separator />
<Separator orientation="vertical" decorative />`;
</script>

<svelte:head>
    <title>Mielui · Separator</title>
    <meta name="description" content="Semantic or decorative divider in either orientation." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Separator">Semantic or decorative divider in either orientation.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {#if values.orientation === 'vertical'}
                    <div class="flex h-5 items-center gap-4 text-sm">
                        <span>Projects</span>
                        <Separator orientation="vertical" />
                        <span>Members</span>
                    </div>
                {:else}
                    <div class="flex w-full max-w-xs flex-col gap-4 text-sm">
                        <p class="m-0">Projects</p>
                        <Separator />
                        <p class="m-0">Members</p>
                    </div>
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add separator" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            <InlineText
                text={"Separator renders a semantic separator by default. Set `decorative` when spacing and styling already convey the grouping, so assistive technology skips it. A horizontal separator fills the available width; `orientation=\"vertical\"` needs a surrounding row with a defined height. `class`, `style`, other attributes, and `bind:element` go to the divider element."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="both-orientations" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Both orientations</Typography.H3>
            <Typography.Text variant="supporting">
                A horizontal separator splits a heading from a row, and a decorative vertical one
                splits the two items in that row.
            </Typography.Text>
            <ComponentPreview code={BothOrientationsSrc}>
                <BothOrientations />
            </ComponentPreview>
        </div>

        <div id="horizontal-sections" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Horizontal sections</Typography.H3>
            <ComponentPreview code={SectionsSrc}>
                <Sections />
            </ComponentPreview>
        </div>
    </section>
</div>
