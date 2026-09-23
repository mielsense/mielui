<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { ResponseStream } from '@mielui/svelte/components/response-stream';
    import { Switch } from '@mielui/svelte/components/switch';
    import { onDestroy } from 'svelte';

    const answer =
        'The release is ready for review. The migration keeps the existing API stable, adds keyboard checks, and documents the rollback steps. Start with the canary region, then compare error rates before widening the rollout.';
    let content = $state('');
    let delivery = $state<'idle' | 'streaming' | 'complete' | 'stopped' | 'error'>('idle');
    let fail = $state(false);
    let timer: ReturnType<typeof setInterval> | undefined;

    function stop() {
        clearInterval(timer);
        timer = undefined;
        delivery = 'stopped';
    }

    function start() {
        clearInterval(timer);
        content = '';
        delivery = 'streaming';
        const shouldFail = fail;
        timer = setInterval(() => {
            if (shouldFail && content.length >= 80) {
                clearInterval(timer);
                timer = undefined;
                delivery = 'error';
                return;
            }
            content = answer.slice(0, content.length + 5);
            if (content === answer) {
                clearInterval(timer);
                timer = undefined;
                delivery = 'complete';
            }
        }, 65);
    }

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<div class="w-full max-w-xl space-y-4">
    <div class="flex flex-wrap items-center gap-3">
        <Button onclick={start} disabled={delivery === 'streaming'}>
            {delivery === 'error' ? 'Retry response' : 'Start response'}
        </Button>
        <Button variant="secondary" onclick={stop} disabled={delivery !== 'streaming'}>Stop</Button>
        <Switch bind:checked={fail} label="Simulate interrupted connection" />
    </div>
    <div class="min-h-24">
        {#if delivery !== 'idle'}
            <ResponseStream textStream={content} streaming={delivery === 'streaming'} />
        {/if}
    </div>
    <p role="status" class="text-sm text-foreground-muted">
        {delivery === 'error' ? 'Connection lost. Turn off simulated failure and retry.' : delivery === 'complete' ? 'Response complete.' : delivery === 'stopped' ? 'Stopped. Partial text stays visible.' : delivery === 'streaming' ? 'Receiving response…' : 'Start a simulated response. No request leaves your browser.'}
    </p>
</div>
