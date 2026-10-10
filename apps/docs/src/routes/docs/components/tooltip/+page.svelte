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
    import Right from './examples/right.svelte';
    import RightSrc from './examples/right.svelte?raw';
    import Top from './examples/top.svelte';
    import TopSrc from './examples/top.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const TITLE = 'Tooltip';

    import Rich from './examples/rich.svelte';
    import RichSrc from './examples/rich.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add tooltip';
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="Brief explanatory text on hover or focus." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>A short hint shown on hover or keyboard focus.</PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <Tooltip.Root
                    placement={values.placement}
                    delay={values.delay}
                    closeDelay={values.closeDelay}
                >
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

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text>
            Wrap the focusable control in Trigger and put its description in Content. Existing
            aria-describedby references are preserved. Escape dismisses visible or pending help.
        </Typography.Text>
        <Typography.Text>
            Root sets placement to top, right, bottom, or left; the bubble flips when it would leave
            the viewport. delay and closeDelay are in milliseconds, 125 and 100 by default. Moving
            between triggers while a tooltip is visible skips the delay. Set showOnClick on Trigger
            to show the tooltip briefly after a click, for example to confirm a copy.
        </Typography.Text>
        <Typography.Text>
            Tooltips share one moving bubble. Wrap a region in Tooltip.Provider for an independent
            bubble that is removed with the provider. Reduced motion disables rolling text.
        </Typography.Text>
        <Typography.Text>
            Content displays plain text by default. Set rich to retain noninteractive formatting and
            SVG icons. The bubble is a passive copy without IDs, event handlers, or form controls.
            Use Popover for links, buttons, and other interactive content.
        </Typography.Text>
        <CodeBlock
            code={`import * as Tooltip from '@mielui/svelte/components/tooltip';\n\n<Tooltip.Root>\n  <Tooltip.Trigger>\n    <button>Info</button>\n  </Tooltip.Trigger>\n  <Tooltip.Content>Helpful text here</Tooltip.Content>\n</Tooltip.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="rich" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Rich content and scoped sharing</Typography.H2>
        <ComponentPreview code={RichSrc}><Rich /></ComponentPreview>
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
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

        <!-- Top placement -->
        <div id="top" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Top placement</Typography.H3>
            <ComponentPreview code={TopSrc}>
                <Top />
            </ComponentPreview>
        </div>

        <!-- Right placement -->
        <div id="right" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Right placement</Typography.H3>
            <ComponentPreview code={RightSrc}>
                <Right />
            </ComponentPreview>
        </div>

        <!-- Bottom placement -->
        <div id="bottom" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Bottom placement</Typography.H3>
            <ComponentPreview code={BottomSrc}>
                <Bottom />
            </ComponentPreview>
        </div>
    </section>
    <section id="glass" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Glass surface</Typography.H2>
        <Typography.Text variant="supporting">
            Set surface="glass" on Tooltip.Content for a translucent background with blur. Omit
            surface to inherit --mielui-surface from your theme, or set surface="solid" to override
            it. Glass uses the matching foreground color for its surface. The glass surface keeps an
            opaque fallback when backdrop filtering is unavailable and respects reduced-transparency
            preferences.
        </Typography.Text>
        <ComponentPreview code={GlassSrc}><Glass /></ComponentPreview>
    </section>
    <section id="parts" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Parts</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Trigger wraps the element that owns the tooltip and Content holds its text. Both render their `children`. Root and Provider add no element. They only pass their `children` through, so they never change your layout."}
            />
        </Typography.Text>
    </section>
</div>
