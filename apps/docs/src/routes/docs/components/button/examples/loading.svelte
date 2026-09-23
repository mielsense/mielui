<script lang="ts">
    import type { ButtonStatus } from '@mielui/svelte/components/button';
    import { Button } from '@mielui/svelte/components/button';
    import { Switch } from '@mielui/svelte/components/switch';
    import { onDestroy } from 'svelte';

    let status = $state<ButtonStatus>('idle');
    let failNext = $state(false);
    let timer: ReturnType<typeof setTimeout> | undefined;

    function publish() {
        if (status === 'loading') {
            return;
        }
        clearTimeout(timer);
        const shouldFail = failNext;
        failNext = false;
        status = 'loading';
        timer = setTimeout(() => {
            if (shouldFail) {
                status = 'error';
                return;
            }
            status = 'success';
            timer = setTimeout(() => {
                status = 'idle';
            }, 1200);
        }, 1100);
    }
    onDestroy(() => {
        clearTimeout(timer);
    });
</script>

<div class="flex flex-col items-start gap-4">
    <Switch bind:checked={failNext} disabled={status === 'loading'} label="Fail the next attempt" />
    <Button
        {status}
        loadingLabel="Publishing…"
        successLabel="Published"
        errorLabel="Retry"
        onclick={publish}
    >
        Publish
    </Button>
    <p class="text-sm text-foreground-muted">
        This preview simulates a request. It publishes nothing.
    </p>
</div>
