<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Bottom from './examples/bottom.svelte';
    import BottomSrc from './examples/bottom.svelte?raw';
    import Glass from './examples/glass.svelte';
    import GlassSrc from './examples/glass.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Rich from './examples/rich.svelte';
    import RichSrc from './examples/rich.svelte?raw';
    import Right from './examples/right.svelte';
    import RightSrc from './examples/right.svelte?raw';
    import Top from './examples/top.svelte';
    import TopSrc from './examples/top.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
</${'script'}>

<Tooltip.Root>
    <Tooltip.Trigger>
        <Button variant="outline">Info</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Helpful text here</Tooltip.Content>
</Tooltip.Root>`;
</script>

<svelte:head>
    <title>Mielui · Tooltip</title>
    <meta name="description" content="Brief explanatory text on hover or focus." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Tooltip">A short hint shown on hover or keyboard focus.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Tooltip.Root placement={values.placement}>
                    <Tooltip.Trigger showOnClick={values.showOnClick}>
                        <Button variant="outline">Sync status</Button>
                    </Tooltip.Trigger>
                    {#if values.rich}
                        <Tooltip.Content rich surface={values.glass ? 'glass' : undefined}>
                            <span class="flex items-center gap-2">
                                <span
                                    aria-hidden="true"
                                    class="size-1.5 rounded-full bg-success"
                                ></span>
                                {values.label}
                            </span>
                        </Tooltip.Content>
                    {:else}
                        <Tooltip.Content surface={values.glass ? 'glass' : undefined}>
                            {values.label}
                        </Tooltip.Content>
                    {/if}
                </Tooltip.Root>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add tooltip" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Wrap a focusable control in Trigger and put its hint in Content. The hint opens on hover or focus and Escape closes it. Root and Provider add no element, and Trigger wraps its child in an inline span.'}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={'`placement` on Root picks the side, `top` by default, and the bubble flips when it would leave the viewport. `delay` and `closeDelay` are in milliseconds, 125 and 100 by default. Moving to another trigger while a tooltip is open skips the delay. Set `showOnClick` on Trigger to also show the tooltip on click, for touch screens or to confirm a copy.'}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="toolbar-shortcuts" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Toolbar shortcuts</Typography.H3>
            <Typography.Text variant="supporting">
                Each icon button names its tool and shows the keyboard shortcut beside it.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="top" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Top placement</Typography.H3>
            <ComponentPreview code={TopSrc}>
                <Top />
            </ComponentPreview>
        </div>

        <div id="right" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Right placement</Typography.H3>
            <ComponentPreview code={RightSrc}>
                <Right />
            </ComponentPreview>
        </div>

        <div id="bottom" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Bottom placement</Typography.H3>
            <ComponentPreview code={BottomSrc}>
                <Bottom />
            </ComponentPreview>
        </div>

        <div id="rich-content" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Rich content and Provider</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Content shows plain text by default. Set `rich` to keep formatting and SVG icons. The bubble is a passive copy without ids, event handlers, or form controls, so use Popover for links and buttons. All tooltips share one moving bubble; wrap a region in `Tooltip.Provider` to give it its own bubble.'}
                />
            </Typography.Text>
            <ComponentPreview code={RichSrc}>
                <Rich />
            </ComponentPreview>
        </div>

        <div id="glass" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Glass surface</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'`surface="glass"` on Content gives the bubble a translucent, blurred background. Leave `surface` out to follow the theme, or set `surface="solid"` to override it. Glass falls back to an opaque surface when backdrop filters are unavailable or reduced transparency is on.'}
                />
            </Typography.Text>
            <ComponentPreview code={GlassSrc}>
                <Glass />
            </ComponentPreview>
        </div>
    </section>
</div>
