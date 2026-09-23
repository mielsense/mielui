<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { TaskSteps } from '@mielui/svelte/components/task-steps';

    const steps = [
        { id: 'upload', label: 'Upload files' },
        { id: 'validate', label: 'Validate records' },
        { id: 'publish', label: 'Publish report' }
    ];
    let current = $state(1);
    let failed = $state(true);

    function advance() {
        if (failed) {
            failed = false;
        } else {
            current = Math.min(current + 1, steps.length);
        }
    }
</script>
<div class="w-full max-w-sm space-y-4">
    <TaskSteps {steps} {current} {failed} label="Report import" />
    <p role="status" class="text-sm text-foreground-muted">
        {failed ? 'Validation failed. Correct the source file, then retry this step.' : current === steps.length ? 'Report published.' : 'Validation can continue.'}
    </p>
    <div class="flex gap-2">
        <Button onclick={advance} disabled={current === steps.length}>
            {failed ? 'Retry validation' : 'Complete step'}
        </Button>
        <Button variant="secondary" onclick={() => { current = 1; failed = true; }}>Reset</Button>
    </div>
</div>
