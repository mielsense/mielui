<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { type TaskStep, TaskSteps } from '@mielui/svelte/components/task-steps';

    const steps: TaskStep[] = [
        {
            id: 'upload',
            label: 'Upload files'
        },
        {
            id: 'validate',
            label: 'Validate records'
        },
        {
            id: 'publish',
            label: 'Publish report'
        }
    ];

    let current = $state(1);
    let failed = $state(true);

    const complete = $derived(current === steps.length);
    const message = $derived.by(() => {
        if (failed) {
            return 'Validation failed. Correct the source file, then retry this step.';
        }

        return complete ? 'Report published.' : 'Validation can continue.';
    });

    function advance() {
        if (failed) {
            failed = false;
        } else {
            current = Math.min(current + 1, steps.length);
        }
    }

    function reset() {
        current = 1;
        failed = true;
    }
</script>

<div class="w-full max-w-sm space-y-4">
    <TaskSteps {steps} {current} {failed} labels={{ list: 'Report import' }} />
    <p role="status" class="text-sm text-foreground-muted">{message}</p>
    <div class="flex gap-2">
        <Button onclick={advance} disabled={complete}>
            {failed ? 'Retry validation' : 'Complete step'}
        </Button>
        <Button variant="secondary" onclick={reset}>Reset</Button>
    </div>
</div>
