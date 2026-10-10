<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Progress } from '@mielui/svelte/components/progress';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Determinate from './examples/determinate.svelte';
    import DeterminateSrc from './examples/determinate.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Indeterminate from './examples/indeterminate.svelte';
    import IndeterminateSrc from './examples/indeterminate.svelte?raw';
    import WithLabel from './examples/with-label.svelte';
    import WithLabelSrc from './examples/with-label.svelte?raw';
    import { percent, code as playgroundCode, controls as playgroundControls } from './playground';

    const installCommand = 'pnpm dlx @mielui/svelte add progress';
</script>

<svelte:head>
    <title>Mielui · Progress</title>
    <meta
        name="description"
        content="Show how far along a task is. Determinate with value or indeterminate for unknown duration."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <!-- ─── Header ────────────────────────────────────────────────── -->
    <PageIntro title="Progress">
        A progress bar. Set indeterminate for tasks with an unknown duration.
    </PageIntro>

    <!-- ─── Hero Example ──────────────────────────────────────────── -->
    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="flex w-full max-w-md flex-col gap-2">
                    {#if values.label}
                        <div
                            class="flex items-center justify-between gap-3 text-sm text-foreground-muted"
                        >
                            <span>
                                {values.indeterminate
                                    ? 'Preparing release.zip'
                                    : 'Uploading release.zip'}
                            </span>
                            {#if !values.indeterminate}
                                <span class="tabular-nums">
                                    {percent(values.value, values.max)}%
                                </span>
                            {/if}
                        </div>
                    {/if}
                    <Progress
                        value={values.value}
                        max={values.max}
                        indeterminate={values.indeterminate}
                        aria-label="Release archive upload"
                    />
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
        <Typography.Text>
            Pass{' '}
            <Typography.InlineCode>value</Typography.InlineCode>
            for completed work and{' '}
            <Typography.InlineCode>max</Typography.InlineCode>
            for the total, which defaults to 100. Use{' '}
            <Typography.InlineCode>indeterminate</Typography.InlineCode>
            when the amount remaining is unknown. Use{' '}
            <Typography.InlineCode>aria-label</Typography.InlineCode>
            or{' '}
            <Typography.InlineCode>aria-labelledby</Typography.InlineCode>
            to name the task.
        </Typography.Text>
        <Typography.Text>
            Fractional values are supported. Invalid maximums fall back to 100, and non-finite
            values display zero. Indicator transitions respect reduced motion. The indeterminate
            animation pauses when motion is disabled, the indicator leaves view, or the page is
            hidden.
        </Typography.Text>

        <CodeBlock
            code={`import { Progress } from '@mielui/svelte/components/progress';\n\n<Progress value={28} aria-label="Upload progress" />\n<Progress indeterminate aria-label="Waiting for a response" />`}
            lang="svelte"
            copy="overlay"
        />
    </section>

    <!-- ─── Examples ──────────────────────────────────────────────── -->
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="simulated-upload" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Simulated upload</Typography.H3>
            <Typography.Text variant="supporting">
                The bar, the percentage and the status line follow one value as a transfer runs.
            </Typography.Text>
            <ComponentPreview code={HeroSrc}>
                <Hero />
            </ComponentPreview>
        </div>

        <!-- Determinate -->
        <div id="determinate" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Determinate</Typography.H3>
            <ComponentPreview code={DeterminateSrc}>
                <Determinate />
            </ComponentPreview>
        </div>

        <!-- Indeterminate -->
        <div id="indeterminate" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Indeterminate</Typography.H3>
            <ComponentPreview code={IndeterminateSrc}>
                <Indeterminate />
            </ComponentPreview>
        </div>

        <!-- With label -->
        <div id="with-label" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With label</Typography.H3>
            <ComponentPreview code={WithLabelSrc}>
                <WithLabel />
            </ComponentPreview>
        </div>
    </section>
</div>
