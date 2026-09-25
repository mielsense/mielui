<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import { Progress } from '@mielui/svelte/components/progress';
    import { onDestroy } from 'svelte';

    let value = $state(0);
    let running = $state(false);
    let timer: ReturnType<typeof setInterval> | undefined;
    const status = $derived(
        value === 100 ? 'Upload complete' : running ? 'Uploading release.zip' : 'Ready to upload'
    );

    function start() {
        clearInterval(timer);
        value = 0;
        running = true;
        timer = setInterval(() => {
            value = Math.min(100, value + 10);
            if (value === 100) {
                clearInterval(timer);
                running = false;
            }
        }, 240);
    }

    function cancel() {
        clearInterval(timer);
        running = false;
        value = 0;
    }

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex items-center justify-between gap-3 text-sm">
        <span role="status">{status}</span>
        <span class="tabular-nums text-foreground-muted">
            <span use:numberShuffle={{ value: value }}>{value}</span>
            %
        </span>
    </div>
    <Progress aria-label="Release archive upload" {value} />
    <div class="flex gap-2">
        <Button onclick={start} disabled={running}>
            {value === 100 ? 'Upload again' : 'Start upload'}
        </Button>
        {#if running}
            <Button variant="secondary" onclick={cancel}>Cancel</Button>
        {/if}
    </div>
    <p class="text-xs text-foreground-muted">Simulated transfer. No files leave your device.</p>
</div>
