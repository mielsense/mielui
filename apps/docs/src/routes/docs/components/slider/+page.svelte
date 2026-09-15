<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import Basic from './examples/basic.svelte';
    import BasicSrc from './examples/basic.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Range from './examples/range.svelte';
    import RangeSrc from './examples/range.svelte?raw';
    import Rtl from './examples/rtl.svelte';
    import RtlSrc from './examples/rtl.svelte?raw';
    import Stepped from './examples/stepped.svelte';
    import SteppedSrc from './examples/stepped.svelte?raw';

    const TITLE = 'Slider';
    const SLUG = 'slider';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>Mielui · {TITLE}</title>
    <meta
        name="description"
        content="Single-value and two-handle sliders with keyboard and RTL support."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <header class="flex items-start justify-between gap-4">
        <div>
            <Typography.H1>{TITLE}</Typography.H1>
            <Typography.Text variant="lead" class="mt-2 max-w-2xl">
                Select a value or a range with pill-shaped handles, keyboard controls and RTL
                support.
            </Typography.Text>
        </div>
        <DocsPager />
    </header>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <ComponentPreview code={HeroSrc}>
            <Hero />
        </ComponentPreview>
    </section>

    <!-- ─── Installation ──────────────────────────────────────────── -->
    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <!-- ─── Usage ─────────────────────────────────────────────────── -->
    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">Import Slider and bind its value:</Typography.Text>
        <CodeBlock
            code={`import { Slider } from '$lib/mielui/components/slider';\n\n<Slider bind:value={volume} label="Volume" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
            <Typography.Text variant="supporting" class="mt-2">
                Slider with different configurations.
            </Typography.Text>
        </div>

        <!-- Basic -->
        <div id="basic" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Basic</Typography.H3>
            <ComponentPreview code={BasicSrc}>
                <Basic />
            </ComponentPreview>
        </div>

        <!-- With step -->
        <div id="stepped" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With step</Typography.H3>
            <ComponentPreview code={SteppedSrc}>
                <Stepped />
            </ComponentPreview>
        </div>

        <div id="range" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Range</Typography.H3>
            <Typography.Text variant="supporting">
                Set range and bind a [minimum, maximum] pair. Handles stop at each other.
                thumbLabels names each handle for assistive technology. onValueChange receives a
                pair in range mode and a number in single-value mode.
            </Typography.Text>
            <ComponentPreview code={RangeSrc}><Range /></ComponentPreview>
        </div>

        <div id="rtl" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Right to left</Typography.H3>
            <Typography.Text variant="supporting">
                Set dir="rtl" or inherit direction from a parent. The minimum sits on the right.
                Values remain ordered from minimum to maximum in either direction.
            </Typography.Text>
            <ComponentPreview code={RtlSrc}><Rtl /></ComponentPreview>
        </div>

        <!-- Disabled -->
        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>
    </section>
</div>
