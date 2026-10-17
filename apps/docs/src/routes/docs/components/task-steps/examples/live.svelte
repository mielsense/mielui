<script lang="ts">
    import { type TaskStep, TaskSteps } from '@mielui/svelte/components/task-steps';
    import { onMount } from 'svelte';

    const steps: TaskStep[] = [
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

    let current = $state(0);

    onMount(() => {
        const timer = setInterval(() => {
            current += 1;

            if (current >= steps.length) {
                clearInterval(timer);
            }
        }, 900);

        return () => {
            clearInterval(timer);
        };
    });
</script>

<div class="w-full max-w-sm">
    <TaskSteps {steps} {current} labels={{ list: 'Deploy progress' }} />
</div>
