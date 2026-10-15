<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Skeleton, SkeletonSwap } from '@mielui/svelte/components/skeleton';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Card from './examples/card.svelte';
    import CardSrc from './examples/card.svelte?raw';
    import Circle from './examples/circle.svelte';
    import CircleSrc from './examples/circle.svelte?raw';
    import Rectangle from './examples/rectangle.svelte';
    import RectangleSrc from './examples/rectangle.svelte?raw';
    import Reloading from './examples/reloading.svelte';
    import ReloadingSrc from './examples/reloading.svelte?raw';
    import Shimmer from './examples/shimmer.svelte';
    import ShimmerSrc from './examples/shimmer.svelte?raw';
    import TimingExample from './examples/timing.svelte';
    import TimingExampleSrc from './examples/timing.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import { SkeletonSwap } from '@mielui/svelte/components/skeleton';

    let { profile }: { profile: { bio: string } | null } = $props();
</${'script'}>

<SkeletonSwap ready={profile !== null} lines={3} label="Profile">
    {#if profile}
        <p>{profile.bio}</p>
    {/if}
</SkeletonSwap>`;

    const labelsCode = `<script lang="ts">
    import { SkeletonSwap, type SkeletonSwapLabels } from '@mielui/svelte/components/skeleton';

    let { profile }: { profile: { bio: string } | null } = $props();

    const labels: SkeletonSwapLabels = {
        loaded: (label) => \`\${label} chargé\`
    };
</${'script'}>

<SkeletonSwap ready={profile !== null} label="Profil" {labels}>
    {#if profile}
        <p>{profile.bio}</p>
    {/if}
</SkeletonSwap>`;
</script>

<svelte:head>
    <title>Mielui · Skeleton</title>
    <meta name="description" content="Loading content without flicker or layout shift." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Skeleton">
        Delay the placeholder, hold it long enough to read, then swap into reserved content.
    </PageIntro>

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
                            lineHeight={24}
                            label="Workspace summary"
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
                            lineHeight={24}
                            label="Workspace summary"
                        >
                            {@render content()}
                        </SkeletonSwap>
                    {/if}
                </div>
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add skeleton" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Wrap asynchronous content in `SkeletonSwap` and set `ready` when it arrives. Fast responses skip the placeholder; once shown, it stays long enough to avoid a flash. The placeholder lines sweep slowly and out of phase, and arriving content sharpens from a slight blur. Reduced motion turns both off. `label` names the region, and once the content arrives it is announced as `Profile loaded`."}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
        <Typography.Text variant="supporting">
            <InlineText
                text={"SkeletonSwap keeps its children mounted while loading but makes them inert until they show. Pass a `skeleton` snippet to replace the default lines; it is always inert and should contain no working controls. `Skeleton` is a single block for building your own placeholder: size it with `w`, `h`, and `unit`, round it with a class, and set `variant=\"shimmer\"` for a moving highlight."}
            />
        </Typography.Text>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="reloading-content" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Reloading content</Typography.H3>
            <Typography.Text variant="supporting">
                The button starts a 1.2 second load. The placeholder holds the height of the text,
                so nothing below it moves.
            </Typography.Text>
            <ComponentPreview code={ReloadingSrc} refreshable>
                <Reloading />
            </ComponentPreview>
        </div>

        <div id="timing" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Timing</Typography.H3>
            <Typography.Text variant="supporting">
                The 100 ms load finishes before the placeholder appears. The 1.5 s load shows it
                after 200 ms.
            </Typography.Text>
            <ComponentPreview code={TimingExampleSrc}>
                <TimingExample />
            </ComponentPreview>
        </div>

        <div id="shimmer" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Shimmer</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={"`variant=\"shimmer\"` adds a moving highlight; the default stays still. Reduced motion turns the highlight off."}
                />
            </Typography.Text>
            <ComponentPreview code={ShimmerSrc}>
                <Shimmer />
            </ComponentPreview>
        </div>

        <div id="rectangle" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Rectangle</Typography.H3>
            <ComponentPreview code={RectangleSrc}>
                <Rectangle />
            </ComponentPreview>
        </div>

        <div id="circle" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Circle</Typography.H3>
            <ComponentPreview code={CircleSrc}>
                <Circle />
            </ComponentPreview>
        </div>

        <div id="card" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Card composition</Typography.H3>
            <ComponentPreview code={CardSrc}>
                <Card />
            </ComponentPreview>
        </div>
    </section>

    <section id="timing-and-size" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Timing and size</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"SkeletonSwap waits `delay` milliseconds before showing the placeholder, 120 by default, so content that arrives sooner appears directly. Once shown, the placeholder stays for at least `minVisible` milliseconds, 380 by default."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"`lines` sets the number of placeholder lines, 3 by default, and `lineHeight` the height of each text line in pixels, 21 by default; match it to your text so the swap does not shift. `barHeight` is the height of each bar, 9 by default. `reserve` holds a fixed height in pixels for the whole swap when content of a different height arrives. Line counts are rounded down and capped at 1,000; negative counts and sizes become zero."}
            />
        </Typography.Text>
        <Typography.Text variant="supporting">
            <InlineText
                text={"On Skeleton, `unit` is the CSS unit for `w` and `h`, `px` unless you choose another such as `rem` or `%`."}
            />
        </Typography.Text>
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={"Pass `labels` to translate the announcement SkeletonSwap makes when the content arrives. `loaded` is a function that receives `label`. Every key of `SkeletonSwapLabels` is optional; omitted keys keep the English text."}
            />
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>
</div>
