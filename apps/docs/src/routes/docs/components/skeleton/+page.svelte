<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Skeleton, SkeletonSwap } from '@mielui/svelte/components/skeleton';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Card from './examples/card.svelte';
    import CardSrc from './examples/card.svelte?raw';
    import Circle from './examples/circle.svelte';
    import CircleSrc from './examples/circle.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Rectangle from './examples/rectangle.svelte';
    import RectangleSrc from './examples/rectangle.svelte?raw';
    import Shimmer from './examples/shimmer.svelte';
    import ShimmerSrc from './examples/shimmer.svelte?raw';
    import TimingExample from './examples/timing.svelte';
    import TimingExampleSrc from './examples/timing.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        shapeCode,
        shapeControls
    } from './playground';

    const TITLE = 'Skeleton';

    const installCommand = 'pnpm dlx @mielui/svelte add skeleton';
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="Loading content without flicker or layout shift." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        Delay the placeholder, hold it long enough to read, then swap into reserved content.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode} refreshable>
            {#snippet children(values)}
                {#snippet content()}
                    <p class="m-0 text-sm leading-6 text-foreground-muted">
                        Your workspace has 12 active projects. Three are ready for review, and the
                        next team check-in is on Friday.
                    </p>
                {/snippet}
                <div class="w-full max-w-sm">
                    {#if values.custom}
                        <SkeletonSwap
                            ready={values.ready}
                            lines={values.lines}
                            lineHeight={values.lineHeight}
                            barHeight={values.barHeight}
                            reserve={values.reserve ? values.reserveHeight : undefined}
                            delay={values.delay}
                            minVisible={values.minVisible}
                            label={values.label || undefined}
                        >
                            {#snippet skeleton()}
                                <div class="flex flex-col gap-3 py-1.5">
                                    <Skeleton variant="shimmer" class="h-3 w-full" />
                                    <Skeleton variant="shimmer" class="h-3 w-full" />
                                    <Skeleton variant="shimmer" class="h-3 w-2/3" />
                                </div>
                            {/snippet}
                            {@render content()}
                        </SkeletonSwap>
                    {:else}
                        <SkeletonSwap
                            ready={values.ready}
                            lines={values.lines}
                            lineHeight={values.lineHeight}
                            barHeight={values.barHeight}
                            reserve={values.reserve ? values.reserveHeight : undefined}
                            delay={values.delay}
                            minVisible={values.minVisible}
                            label={values.label || undefined}
                        >
                            {@render content()}
                        </SkeletonSwap>
                    {/if}
                </div>
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
        <Typography.Text variant="supporting">
            SkeletonSwap keeps real children mounted while loading, but makes them inert until
            visible. Custom placeholder snippets are always inert and should contain no functional
            controls. Line counts are rounded down and capped at 1,000; negative counts and
            dimensions become zero, and nonfinite numbers use the defaults.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use{' '}
            <Typography.InlineCode>SkeletonSwap</Typography.InlineCode>
            around asynchronous content. Fast responses skip the placeholder; once shown, it stays
            visible long enough to avoid a flash. Its placeholder lines sweep slowly and out of
            phase, and arriving content sharpens from a slight blur. Reduced motion turns both off.
        </Typography.Text>
        <CodeBlock
            code={`import { SkeletonSwap } from '@mielui/svelte/components/skeleton';

<SkeletonSwap ready={profile !== null} lines={3} label="Profile">
  {#if profile}<p>{profile.bio}</p>{/if}
</SkeletonSwap>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Combine Skeleton shapes to match the content being loaded.
            {/snippet}
        </SectionHeading>

        <div id="reloading-content" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Reloading content</Typography.H3>
            <Typography.Text variant="supporting">
                The button starts a 1.2 second load. The placeholder holds the height of the text,
                so nothing below it moves.
            </Typography.Text>
            <ComponentPreview code={HeroSrc} refreshable>
                <Hero />
            </ComponentPreview>
        </div>

        <div id="single-shape" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Single shape</Typography.H3>
            <Typography.Text variant="supporting">
                Skeleton is one block. Size it with w, h and unit, and round it with a class.
            </Typography.Text>
            <Playground controls={shapeControls} code={shapeCode}>
                {#snippet children(values)}
                    <div
                        class="flex h-48 w-full max-w-sm items-center justify-center overflow-hidden"
                    >
                        <Skeleton
                            variant={values.variant}
                            w={values.w}
                            h={values.h}
                            unit={values.unit}
                            class={values.circle ? 'rounded-full' : undefined}
                        />
                    </div>
                {/snippet}
            </Playground>
        </div>

        <div class="flex flex-col gap-3">
            <Typography.H3>Shimmer</Typography.H3>
            <Typography.Text>
                Set variant="shimmer" for an animated highlight. The default stays still. Reduced
                motion disables the highlight.
            </Typography.Text>
            <ComponentPreview code={ShimmerSrc}><Shimmer /></ComponentPreview>
        </div>

        <!-- Rectangle -->
        <div id="rectangle" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Rectangle</Typography.H3>
            <ComponentPreview code={RectangleSrc}>
                <Rectangle />
            </ComponentPreview>
        </div>

        <!-- Circle -->
        <div id="circle" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Circle</Typography.H3>
            <ComponentPreview code={CircleSrc}>
                <Circle />
            </ComponentPreview>
        </div>

        <!-- Card composition -->
        <div id="card" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Card composition</Typography.H3>
            <ComponentPreview code={CardSrc}>
                <Card />
            </ComponentPreview>
        </div>
    </section>
    <section id="timing-and-size" class="flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Timing and size</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"SkeletonSwap avoids a flash of grey for fast loads. It waits `delay` milliseconds before showing the skeleton, 120 by default, so content that arrives sooner appears directly. Once the skeleton is showing it stays for at least `minVisible` milliseconds, 380 by default, so it never blinks."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`barHeight` is the height of each placeholder bar in pixels and defaults to 9. `reserve` holds a fixed height in pixels for the whole swap, so the page does not jump when content of a different height arrives. On Skeleton, `unit` is the CSS unit applied to `w` and `h`, `px` unless you choose another such as `rem` or `%`."}
            />
        </Typography.Text>
        <ComponentPreview code={TimingExampleSrc}>
            <TimingExample />
        </ComponentPreview>
    </section>
</div>
