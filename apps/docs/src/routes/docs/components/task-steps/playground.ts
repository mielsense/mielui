import {
    attributes,
    expression,
    literal,
    number,
    type PlaygroundValues,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    durations: toggle('Durations', 'Content', true),
    summary: toggle('Summary', 'Content'),
    current: number('Current step', 2, {
        min: 0,
        max: 4,
        group: 'State'
    }),
    failed: toggle('Failed', 'State')
};

export const steps = [
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

export const plainSteps = steps.map((step) => {
    return {
        id: step.id,
        label: step.label
    };
});

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        current: values.current,
        failed: values.failed,
        labels: expression("{ list: 'Deploy progress' }"),
        class: 'max-w-sm'
    });
    const shown: Record<string, string>[] = values.durations ? steps : plainSteps;
    const rows = shown.map((step) => `        ${literal(step)}`).join(',\n');

    if (!values.summary) {
        return `<script lang="ts">
    import { type TaskStep, TaskSteps } from '@mielui/svelte/components/task-steps';

    const steps: TaskStep[] = [
${rows}
    ];
</script>

<TaskSteps {steps}${props} />`;
    }

    const meta = values.durations
        ? `
                    {#if row.meta}
                        <TaskSteps.Meta>{row.meta}</TaskSteps.Meta>
                    {/if}`
        : '';

    return `<script lang="ts">
    import type { TaskStep } from '@mielui/svelte/components/task-steps';
    import * as TaskSteps from '@mielui/svelte/components/task-steps';

    const steps: TaskStep[] = [
${rows}
    ];
</script>

<TaskSteps.Root {steps}${props}>
    {#snippet children(progress)}
        <TaskSteps.List>
            {#each progress.rows as row (row.id)}
                <TaskSteps.Item status={row.status}>
                    <TaskSteps.Indicator />
                    <TaskSteps.Label>{row.label}</TaskSteps.Label>${meta}
                </TaskSteps.Item>
            {/each}
        </TaskSteps.List>
        <TaskSteps.Summary class="mt-3 block px-1 text-sm text-foreground-muted" />
    {/snippet}
</TaskSteps.Root>`;
}
