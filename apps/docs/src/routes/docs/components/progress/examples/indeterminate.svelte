<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Progress } from '@mielui/svelte/components/progress';

    let pending = $state(true);
</script>

<div class="flex w-full max-w-md flex-col gap-4">
    <Progress aria-label="Sample request" indeterminate={pending} value={pending ? 0 : 100} />
    <div class="flex items-center justify-between gap-4">
        <p class="m-0 text-sm text-foreground-muted" role="status">
            {pending ? 'Waiting for a response' : 'Response received'}
        </p>
        <Button
            variant="secondary"
            onclick={() => {
            pending = !pending;
        }}
        >
            {pending ? 'Complete request' : 'Start again'}
        </Button>
    </div>
</div>
