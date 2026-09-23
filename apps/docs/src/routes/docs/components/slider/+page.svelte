<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
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
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta
        name="description"
        content="Single-value and two-handle sliders with keyboard and RTL support."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        Select a value or a range with pill-shaped handles, keyboard controls and RTL support.
    </PageIntro>

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
        <Typography.Text>
            Bind<Typography.InlineCode>value</Typography.InlineCode> to a number for a single
            handle. Add a<Typography.InlineCode>label</Typography.InlineCode>
            , or use<Typography.InlineCode>
                aria-label
            </Typography.InlineCode> or<Typography.InlineCode>
                aria-labelledby
            </Typography.InlineCode> to name the control. Use<Typography.InlineCode>
                aria-describedby
            </Typography.InlineCode> for supporting instructions.
        </Typography.Text>
        <Typography.Text>
            Set<Typography.InlineCode>name</Typography.InlineCode> to include the value in form
            submissions. Range mode submits two ordered values, which you can read with<Typography.InlineCode
            >
                FormData.getAll
            </Typography.InlineCode>
            . Disabled sliders are omitted. Use<Typography.InlineCode>
                form
            </Typography.InlineCode> to target an external form. Resetting the form restores the
            initial value.
        </Typography.Text>
        <Typography.Text>
            <Typography.InlineCode>id</Typography.InlineCode> and<Typography.InlineCode>
                bind:element
            </Typography.InlineCode> refer to the wrapper. Style its rail, fill, and handles with
            the<Typography.InlineCode>data-ui="slider-track"</Typography.InlineCode>
            ,<Typography.InlineCode>data-ui="slider-range"</Typography.InlineCode>
            , and<Typography.InlineCode>data-ui="slider-thumb"</Typography.InlineCode> selectors.
        </Typography.Text>
        <CodeBlock
            code={`import { Slider } from '$lib/mielui/components/slider';\n\nlet volume = $state(50);\n\n<Slider bind:value={volume} label="Volume" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
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
