<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Checked from './examples/checked.svelte';
    import CheckedSrc from './examples/checked.svelte?raw';
    import Disabled from './examples/disabled.svelte';
    import DisabledSrc from './examples/disabled.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import LabelOnly from './examples/label-only.svelte';
    import LabelOnlySrc from './examples/label-only.svelte?raw';
    import Sizes from './examples/sizes.svelte';
    import SizesSrc from './examples/sizes.svelte?raw';
    import WithDescription from './examples/with-description.svelte';
    import WithDescriptionSrc from './examples/with-description.svelte?raw';

    const TITLE = 'Checkbox';
    const SLUG = 'checkbox';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="A binary option presented as a labeled box." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        A checkbox with a bindable checked state, optional label, and description.
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
            Native input attributes such as name, value, required, form, id, and aria-describedby
            are forwarded to the checkbox input. The visible label names the checkbox; description
            text is linked separately and does not become part of its name. Explicit aria-label or
            aria-labelledby naming takes priority. Description IDs are deduplicated and conditional
            descriptions are linked only while rendered.
        </Typography.Text>

        <CodeBlock
            code={`import { Checkbox } from '$lib/mielui/components/checkbox';\n\nlet checked = $state();\n\n<Checkbox bind:checked label="Accept" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="sizes" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Sizes</Typography.H3>
            <Typography.Text>
                Use size="sm", "md", or "lg" for a 14, 18, or 22px box. Medium is the default. The
                label remains clickable at every size.
            </Typography.Text>
            <ComponentPreview code={SizesSrc}><Sizes /></ComponentPreview>
        </div>
        <!-- Label only -->
        <div id="label-only" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Label only</Typography.H3>
            <ComponentPreview code={LabelOnlySrc}>
                <LabelOnly />
            </ComponentPreview>
        </div>

        <!-- With description -->
        <div id="with-description" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With description</Typography.H3>
            <ComponentPreview code={WithDescriptionSrc}>
                <WithDescription />
            </ComponentPreview>
        </div>

        <!-- Disabled -->
        <div id="disabled" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Disabled</Typography.H3>
            <ComponentPreview code={DisabledSrc}>
                <Disabled />
            </ComponentPreview>
        </div>

        <!-- Checked -->
        <div id="checked" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Checked</Typography.H3>
            <ComponentPreview code={CheckedSrc}>
                <Checked />
            </ComponentPreview>
        </div>
    </section>
</div>
