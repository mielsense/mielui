<script lang="ts">
    import * as Composer from '@mielui/svelte/components/composer';
    import { Switch } from '@mielui/svelte/components/switch';

    let value = $state('Summarize the incident timeline.');
    let fail = $state(true);
    let result = $state('');

    async function submit() {
        result = '';
        if (fail) {
            throw new Error('The demo service is unavailable.');
        }
        result = `Submitted: ${value}`;
        value = '';
    }
</script>

<div class="w-full max-w-2xl space-y-4">
    <Switch bind:checked={fail} label="Simulate service failure" />
    <Composer.Root
        bind:value
        onSubmit={submit}
        errorMessage="Could not send. Turn off simulated failure, then retry."
    >
        <Composer.Input aria-label="Incident prompt" />
        <Composer.Toolbar><Composer.Submit /></Composer.Toolbar>
    </Composer.Root>
    <p class="min-h-5 text-sm text-foreground-muted" role="status">{result}</p>
</div>
