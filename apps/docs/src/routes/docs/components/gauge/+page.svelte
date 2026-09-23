<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import ContextWindow from './examples/context-window.svelte';
    import ContextWindowSrc from './examples/context-window.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Interactive from './examples/interactive.svelte';
    import InteractiveSource from './examples/interactive.svelte?raw';
    import States from './examples/states.svelte';
    import StatesSource from './examples/states.svelte?raw';
    import UsageLimit from './examples/usage-limit.svelte';
    import UsageLimitSrc from './examples/usage-limit.svelte?raw';

    const installCommand = 'pnpm dlx @mielui/svelte add gauge';
</script>

<svelte:head>
    <title>Mielui · Gauge</title>
    <meta
        name="description"
        content="A circular meter for context, usage limits, storage, seats, and other bounded quantities."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Gauge">
        A circular meter for bounded quantities such as context remaining, API usage, storage, and
        seats.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview refreshable code={HeroSrc}><Hero /></ComponentPreview>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            The default diameter is 120px. Set size explicitly for compact toolbar meters; the arc
            and center text scale with it. strokeWidth sets the track thickness, which defaults to
            9.75% of the diameter. The track and colored arc share the same thickness. Values are
            clamped between zero and max. A nonpositive or nonfinite max falls back to 100, and
            nonfinite values display zero. Entry and value changes animate unless the theme disables
            motion or the user requests reduced motion. Set animation="live" for a continuous
            highlight, or animation="none" to disable entry and update motion.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Use{' '}
            <Typography.InlineCode>value</Typography.InlineCode> and
            <Typography.InlineCode>max</Typography.InlineCode>
            for the filled portion. Provide
            <Typography.InlineCode>label</Typography.InlineCode>
            to name the meter for screen-reader users; children can replace the default numeric
            center text.
        </Typography.Text>
        <CodeBlock
            code={`import { Gauge } from '@mielui/svelte/components/gauge';

<Gauge value={85} label="Context remaining" />
<Gauge value={72} max={100} label="Monthly API usage" tone="warning">72%</Gauge>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <section id="changing-values" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Changing values</Typography.H2>
        <Typography.Text variant="supporting">
            Add files to approach the storage limit, then clear them. The meter transitions from its
            current value and changes tone near capacity. The label keeps the units explicit for
            screen readers.
        </Typography.Text>
        <ComponentPreview code={InteractiveSource}><Interactive /></ComponentPreview>
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Compare bounded quantities with explicit units and a label beside each meter.
            {/snippet}
        </SectionHeading>

        <div id="context-window" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Compact and detailed</Typography.H3>
            <ComponentPreview refreshable code={ContextWindowSrc}>
                <ContextWindow />
            </ComponentPreview>
        </div>

        <div id="usage-limit" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Usage limit</Typography.H3>
            <ComponentPreview refreshable code={UsageLimitSrc}><UsageLimit /></ComponentPreview>
        </div>
    </section>
    <section id="data-states" class="flex scroll-mt-20 flex-col gap-4">
        <SectionHeading title="Data and animation states">
            {#snippet description()}
                Compare ready, loading, unavailable, zero, and full measurements. Reveal uses the
                built-in entry animation; Live continuously highlights the arc without changing its
                value. None disables motion. The live highlight pauses offscreen, in hidden tabs,
                and when reduced motion is enabled. Loading and unavailable states keep the same
                meter footprint.
            {/snippet}
        </SectionHeading>
        <ComponentPreview code={StatesSource}><States /></ComponentPreview>
    </section>
</div>
