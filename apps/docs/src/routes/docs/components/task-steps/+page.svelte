<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as TaskSteps from '@mielui/svelte/components/task-steps';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Live from './examples/live.svelte';
    import LiveSrc from './examples/live.svelte?raw';
    import Retry from './examples/retry.svelte';
    import RetrySrc from './examples/retry.svelte?raw';
    import {
        code as playgroundCode,
        controls as playgroundControls,
        plainSteps as playgroundPlainSteps,
        steps as playgroundSteps
    } from './playground';

    const usageCode = `<script lang="ts">
    import { type TaskStep, TaskSteps } from '@mielui/svelte/components/task-steps';

    const steps: TaskStep[] = [
        { id: 'build', label: 'Building' },
        { id: 'test', label: 'Testing' }
    ];
</${'script'}>

<TaskSteps {steps} current={1} labels={{ list: 'Deploy progress' }} />`;

    const labelsCode = `<script lang="ts">
    import {
        type TaskStep,
        TaskSteps,
        type TaskStepsLabels
    } from '@mielui/svelte/components/task-steps';

    const steps: TaskStep[] = [
        { id: 'build', label: 'Compilation' },
        { id: 'test', label: 'Tests' }
    ];

    const labels: TaskStepsLabels = {
        list: 'Progression du déploiement',
        empty: 'Aucune étape.',
        progress: (step, position, total) => \`\${step}, étape \${position} sur \${total}.\`,
        complete: (total) => \`Les \${total} étapes sont terminées.\`,
        failed: (step) => \`Échec à l’étape \${step}.\`
    };
</${'script'}>

<TaskSteps {steps} current={1} {labels} />`;

    const compositionCode = `<script lang="ts">
    import * as TaskSteps from '@mielui/svelte/components/task-steps';

    const steps: TaskSteps.TaskStep[] = [
        { id: 'build', label: 'Building', meta: '8.1s' },
        { id: 'test', label: 'Testing' }
    ];
</${'script'}>

<TaskSteps.Root {steps} current={1}>
    {#snippet children(progress)}
        <TaskSteps.Summary class="text-sm" />
        <TaskSteps.List>
            {#each progress.rows as row (row.id)}
                <TaskSteps.Item status={row.status}>
                    <TaskSteps.Indicator />
                    <TaskSteps.Label>{row.label}</TaskSteps.Label>
                    {#if row.meta}
                        <TaskSteps.Meta>{row.meta}</TaskSteps.Meta>
                    {/if}
                </TaskSteps.Item>
            {/each}
        </TaskSteps.List>
    {/snippet}
</TaskSteps.Root>`;
</script>

<svelte:head>
    <title>Mielui · Task Steps</title>
    <meta name="description" content="Narrate ordered asynchronous work without noisy updates." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro title="Task Steps">Show the current step and completed steps in a task.</PageIntro>

    <section id="hero" class="scroll-mt-20 flex flex-col gap-4">
        <Playground controls={playgroundControls} code={playgroundCode}>
            {#snippet children(values)}
                {const root = $derived({
                    steps: values.durations ? playgroundSteps : playgroundPlainSteps,
                    current: values.current,
                    failed: values.failed,
                    labels: {
                        list: 'Deploy progress'
                    },
                    class: 'max-w-sm'
                })}
                {#if values.summary}
                    <TaskSteps.Root {...root}>
                        {#snippet children(progress)}
                            <TaskSteps.List>
                                {#each progress.rows as row (row.id)}
                                    <TaskSteps.Item status={row.status}>
                                        <TaskSteps.Indicator />
                                        <TaskSteps.Label>{row.label}</TaskSteps.Label>
                                        {#if row.meta}
                                            <TaskSteps.Meta>{row.meta}</TaskSteps.Meta>
                                        {/if}
                                    </TaskSteps.Item>
                                {/each}
                            </TaskSteps.List>
                            <TaskSteps.Summary
                                class="mt-3 block px-1 text-sm text-foreground-muted"
                            />
                        {/snippet}
                    </TaskSteps.Root>
                {:else}
                    <TaskSteps.Root {...root} />
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command="pnpm dlx @mielui/svelte add task-steps" />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Pass the steps in order and set `current` to the index of the running step. Steps before it are done. Set `current` to `steps.length` when the whole run is complete. `labels.list` names the list for screen readers, and a status line announces progress after it settles.'}
            />
        </Typography.Text>
        <CodeBlock code={usageCode} lang="svelte" copy="overlay" />
    </section>

    <section id="composition" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Composition</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Pass a `children` snippet to Root when rows need a different layout. It receives the same state the default layout uses: `rows` with a `status` each, `completed`, `total`, `complete`, `failed`, and the summary `sentence`. `Summary` renders that sentence as a live status line.'}
            />
        </Typography.Text>
        <CodeBlock code={compositionCode} lang="svelte" copy="overlay" />
    </section>

    <section id="labels" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Labels</Typography.H2>
        <Typography.Text variant="supporting">
            <InlineText
                text={'Built-in text is English. Pass `labels` to Root to name the list and translate the summary `sentence`. `progress`, `complete`, and `failed` are functions so the step name and numbers can sit anywhere in the sentence. Every key is optional and English is the fallback.'}
            />
        </Typography.Text>
        <CodeBlock code={labelsCode} lang="svelte" copy="overlay" />
    </section>

    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <div>
            <Typography.H2 class="docs-section-heading">Examples</Typography.H2>
        </div>

        <div id="live-progress" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Live progress</Typography.H3>
            <Typography.Text variant="supporting">
                Steps advance on a timer. Replay the preview to watch the run again.
            </Typography.Text>
            <ComponentPreview code={LiveSrc} refreshable>
                <Live />
            </ComponentPreview>
        </div>

        <div id="retry" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Retry a failed step</Typography.H3>
            <Typography.Text variant="supporting">
                <InlineText
                    text={'Keep `current` on the failed step and set `failed`. Clear `failed` when the retry starts, and advance `current` once it succeeds. TaskSteps only shows the state; your code runs the work.'}
                />
            </Typography.Text>
            <ComponentPreview code={RetrySrc}>
                <Retry />
            </ComponentPreview>
        </div>
    </section>
</div>
