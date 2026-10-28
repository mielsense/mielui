<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Progress } from '@mielui/svelte/components/progress';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '#lib/components/docs/index.js';
    import PageIntro from '#lib/components/docs/page-intro.svelte';
    import Determinate from './examples/determinate.svelte';
    import DeterminateSrc from './examples/determinate.svelte?raw';
    import Indeterminate from './examples/indeterminate.svelte';
    import IndeterminateSrc from './examples/indeterminate.svelte?raw';
    import Upload from './examples/upload.svelte';
    import UploadSrc from './examples/upload.svelte?raw';
    import WithLabel from './examples/with-label.svelte';
    import WithLabelSrc from './examples/with-label.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const usageCode = `<script lang="ts">
    import { Progress } from '@mielui/svelte/components/progress';
</${'script'}>

<Progress value={28} aria-label="Upload progress" />
<Progress indeterminate aria-label="Waiting for a response" />`;
</script>

<svelte:head>
    <title>Mielui · Progress</title>
    <meta
        name="description"
        content="Show how far along a task is. Determinate with value or indeterminate for unknown duration."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Progress">
        A progress bar. Set indeterminate for tasks with an unknown duration.
    </PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                <div class="w-full max-w-md">
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

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add progress" />
    </section>

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

        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="simulated-upload" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Simulated upload</Typography.H3>
            <Typography.Text variant="supporting">
                The bar, the percentage and the status line follow one value as a transfer runs.
            </Typography.Text>
            <ComponentPreview code={UploadSrc}>
                <Upload />
            </ComponentPreview>
        </div>

        <div id="determinate" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Determinate</Typography.H3>
            <ComponentPreview code={DeterminateSrc}>
                <Determinate />
            </ComponentPreview>
        </div>

        <div id="indeterminate" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Indeterminate</Typography.H3>
            <ComponentPreview code={IndeterminateSrc}>
                <Indeterminate />
            </ComponentPreview>
        </div>

        <div id="with-label" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">With label</Typography.H3>
            <ComponentPreview code={WithLabelSrc}>
                <WithLabel />
            </ComponentPreview>
        </div>
    </section>
</div>
