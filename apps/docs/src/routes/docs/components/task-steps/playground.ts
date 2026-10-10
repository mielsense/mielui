import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    toggle
} from '$lib/components/docs/playground';

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

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        current: expression(String(values.current)),
        failed: values.failed,
        label: 'Deploy progress',
        class: 'max-w-sm'
    });
    const steps = values.durations
        ? `        { id: 'queue', label: 'Queued', meta: '0.2s' },
        { id: 'build', label: 'Building', meta: '8.1s' },
        { id: 'checks', label: 'Running checks', meta: '3.4s' },
        { id: 'deploy', label: 'Deploying', meta: '5.0s' }`
        : `        { id: 'queue', label: 'Queued' },
        { id: 'build', label: 'Building' },
        { id: 'checks', label: 'Running checks' },
        { id: 'deploy', label: 'Deploying' }`;

    if (!values.summary) {
        return `<script lang="ts">
    import { type TaskStep, TaskSteps } from '@mielui/svelte/components/task-steps';

    const steps: TaskStep[] = [
${steps}
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
${steps}
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
