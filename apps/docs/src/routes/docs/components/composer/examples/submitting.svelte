<script lang="ts">
    import * as Composer from '@mielui/svelte/components/composer';
    import { onDestroy } from 'svelte';

    let value = $state('Check the deployment plan.');
    let result = $state('Send the prompt, then stop it before the demo finishes.');
    let timer: ReturnType<typeof setTimeout> | undefined;
    let status = $state<'idle' | 'submitting'>('idle');

    function stop() {
        clearTimeout(timer);
        timer = undefined;
        result = 'Stopped. Your prompt is still here.';
        status = 'idle';
    }

    function submit() {
        result = 'Checking the plan…';
        status = 'submitting';
        timer = setTimeout(() => {
            result = 'Plan checked. No blocking changes found.';
            value = '';
            timer = undefined;
            status = 'idle';
        }, 2400);
    }

    onDestroy(() => {
        clearTimeout(timer);
    });
</script>

<div class="w-full max-w-2xl space-y-3">
    <Composer.Root bind:value {status} onSubmit={submit} onStop={stop}>
        <Composer.Input aria-label="Deployment prompt" />
        <Composer.Toolbar><Composer.Submit /></Composer.Toolbar>
    </Composer.Root>
    <p class="min-h-5 text-sm text-foreground-muted" role="status">{result}</p>
</div>
