<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';

    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Multiple from './examples/multiple.svelte';
    import MultipleSrc from './examples/multiple.svelte?raw';
    import Single from './examples/single.svelte';
    import SingleSrc from './examples/single.svelte?raw';

    const TITLE = 'Toggle Group';
    const SLUG = 'toggle-group';

    const installCommand = `pnpm dlx @mielui/svelte add ${SLUG}`;
</script>

<svelte:head>
    <title>
        Mielui ·{' '}
        {TITLE}
    </title>
    <meta name="description" content="A row of toggles with shared selection state." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title={TITLE}>
        A row of toggles with shared selection, for single or multiple choice.
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
            Arrow keys navigate enabled items with a single tab stop. Single mode allows the active
            item to be cleared; multiple mode keeps an array of selected values.
        </Typography.Text>

        <Typography.Text variant="supporting">
            Single mode uses a string value and reports undefined when cleared. With
            type="multiple", bind a string array; clearing all selections reports an empty array.
            The value and onValueChange types follow the selected mode.
        </Typography.Text>
        <CodeBlock
            code={`import * as ToggleGroup from '$lib/mielui/components/toggle-group';\n\n<ToggleGroup.Root type="single" bind:value={alignment}>\n  <ToggleGroup.Item value="left">Left</ToggleGroup.Item>\n  <ToggleGroup.Item value="center">Center</ToggleGroup.Item>\n  <ToggleGroup.Item value="right">Right</ToggleGroup.Item>\n</ToggleGroup.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Toggle Group in single and multiple modes.
            {/snippet}
        </SectionHeading>

        <!-- Single select -->
        <div id="single" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Single select</Typography.H3>
            <ComponentPreview code={SingleSrc}>
                <Single />
            </ComponentPreview>
        </div>

        <!-- Multiple select -->
        <div id="multiple" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Multiple select</Typography.H3>
            <ComponentPreview code={MultipleSrc}>
                <Multiple />
            </ComponentPreview>
        </div>
    </section>
</div>
