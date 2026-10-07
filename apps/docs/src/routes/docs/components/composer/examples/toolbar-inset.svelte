<script lang="ts">
    import * as Composer from '@mielui/svelte/components/composer';

    let inset = $state('Compare the two implementation options.');
    let joined = $state('Summarize the incident timeline.');
    let result = $state('');

    function sendInset() {
        result = `Submitted: ${inset}`;
        inset = '';
    }

    function sendJoined() {
        result = `Submitted: ${joined}`;
        joined = '';
    }
</script>

<div class="flex w-full max-w-2xl flex-col gap-6">
    <Composer.Root bind:value={inset} onSubmit={sendInset}>
        <Composer.Input aria-label="Inset toolbar prompt" />
        <Composer.Toolbar variant="inset">
            <Composer.Actions>
                <span class="px-2 text-xs text-foreground-muted">Mielui 3.1</span>
            </Composer.Actions>
            <Composer.Submit />
        </Composer.Toolbar>
    </Composer.Root>

    <Composer.Root bind:value={joined} onSubmit={sendJoined}>
        <Composer.Input aria-label="Default toolbar prompt" />
        <Composer.Toolbar>
            <Composer.Actions>
                <span class="px-2 text-xs text-foreground-muted">Mielui 3.1</span>
            </Composer.Actions>
            <Composer.Submit />
        </Composer.Toolbar>
    </Composer.Root>
    <p class="min-h-5 text-sm text-foreground-muted" role="status">{result}</p>
</div>
