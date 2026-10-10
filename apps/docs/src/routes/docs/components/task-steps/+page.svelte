<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import type { TaskStep } from '@mielui/svelte/components/task-steps';
    import * as TaskSteps from '@mielui/svelte/components/task-steps';
    import * as Typography from '@mielui/svelte/components/typography';
    import { ComponentPreview, InstallCommand, Playground } from '$lib/components/docs';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import SectionHeading from '$lib/components/docs/section-heading.svelte';
    import Bare from './examples/bare.svelte';
    import BareSrc from './examples/bare.svelte?raw';
    import Hero from './examples/hero.svelte';
    import HeroSrc from './examples/hero.svelte?raw';
    import Retry from './examples/retry.svelte';
    import RetrySrc from './examples/retry.svelte?raw';
    import { code as playgroundCode, controls as playgroundControls } from './playground';

    const installCommand = 'pnpm dlx @mielui/svelte add task-steps';

    const playgroundSteps: TaskStep[] = [
        {
            id: 'queue',
            label: 'Queued',
            meta: '0.2s'
        },
        {
            id: 'build',
            label: 'Building',
            meta: '8.1s'
        },
        {
            id: 'checks',
            label: 'Running checks',
            meta: '3.4s'
        },
        {
            id: 'deploy',
            label: 'Deploying',
            meta: '5.0s'
        }
    ];
    const playgroundPlainSteps: TaskStep[] = playgroundSteps.map((step) => {
        return {
            id: step.id,
            label: step.label
        };
    });
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
                {#if values.summary}
                    <TaskSteps.Root
                        steps={values.durations ? playgroundSteps : playgroundPlainSteps}
                        current={values.current}
                        failed={values.failed}
                        label="Deploy progress"
                        class="max-w-sm"
                    >
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
                    <TaskSteps.Root
                        steps={values.durations ? playgroundSteps : playgroundPlainSteps}
                        current={values.current}
                        failed={values.failed}
                        label="Deploy progress"
                        class="max-w-sm"
                    />
                {/if}
            {/snippet}
        </Playground>
    </section>

    <section id="installation" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Installation</Typography.H2>
        <InstallCommand command={installCommand} />
    </section>

    <section id="usage" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Usage</Typography.H2>
        <Typography.Text variant="supporting">
            Set{' '}
            <Typography.InlineCode>current</Typography.InlineCode>
            to the running step. Values before it are complete; the array length means the whole run
            is complete.
        </Typography.Text>
        <Typography.Text variant="supporting">
            Completion markers use a subtle scale and opacity change; task progress remains readable
            during rapid updates.
        </Typography.Text>
        <CodeBlock
            lang="svelte"
            copy="overlay"
            code={`import { TaskSteps } from '@mielui/svelte/components/task-steps';

<TaskSteps
  steps={[{ id: 'build', label: 'Building' }, { id: 'test', label: 'Testing' }]}
  current={1}
  label="Deploy progress"
/>`}
        />
    </section>

    <section id="composable-parts" class="flex flex-col gap-4">
        <Typography.H2>Composable parts</Typography.H2>
        <Typography.Text>
            Use the named parts when rows need a different layout. Root passes the same normalized
            rows, completed count, total, and summary used by the data-driven form. Indices are
            truncated and clamped; a failure at completion marks the last row as failed. Empty lists
            announce “No steps.”
        </Typography.Text>
        <CodeBlock
            code={`import * as TaskSteps from '@mielui/svelte/components/task-steps';

<TaskSteps.Root {steps} {current}>
  {#snippet children(progress)}
    <TaskSteps.Summary class="text-sm" />
    <TaskSteps.List>
      {#each progress.rows as row (row.id)}
        <TaskSteps.Item status={row.status}>
          <TaskSteps.Meta>{row.meta}</TaskSteps.Meta>
          <TaskSteps.Label>{row.label}</TaskSteps.Label>
        </TaskSteps.Item>
      {/each}
    </TaskSteps.List>
  {/snippet}
</TaskSteps.Root>`}
            lang="svelte"
            copy="overlay"
        />
    </section>
    <section id="examples" class="scroll-mt-20 flex flex-col gap-10">
        <SectionHeading title="Examples">
            {#snippet description()}
                Render the steps without a surrounding card.
            {/snippet}
        </SectionHeading>

        <div id="deploy-card" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Deploy card</Typography.H3>
            <Typography.Text variant="supporting">
                Steps advance on a timer inside a card. Replay the preview to watch the run again.
            </Typography.Text>
            <ComponentPreview code={HeroSrc} refreshable><Hero /></ComponentPreview>
        </div>

        <div id="bare" class="scroll-mt-20 flex flex-col gap-3">
            <Typography.H3 class="docs-subsection-heading">Bare</Typography.H3>
            <ComponentPreview code={BareSrc}>
                <Bare />
            </ComponentPreview>
        </div>
    </section>
    <section id="retry" class="flex scroll-mt-20 flex-col gap-4">
        <Typography.H2>Recover a failed step</Typography.H2>
        <Typography.Text>
            Keep current at the failed step and set failed. Clear failed when retry begins, then
            advance current only after the operation succeeds. Reaching steps.length marks the
            sequence complete; the component never runs the operation itself.
        </Typography.Text>
        <ComponentPreview code={RetrySrc}><Retry /></ComponentPreview>
    </section>
</div>
