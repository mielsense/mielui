<script lang="ts">
    import * as Composer from '@mielui/svelte/components/composer';

    let value = $state('Compare the two implementation options.');
    let submitted = $state('');

    function submit() {
        submitted = value;
        value = '';
    }
</script>

<div class="w-full max-w-2xl space-y-3">
    <Composer.Root bind:value onSubmit={submit}>
        <Composer.Input aria-label="Prompt" />
        <Composer.Toolbar><Composer.Submit /></Composer.Toolbar>
    </Composer.Root>
    <p class="min-h-5 text-sm text-foreground-muted" role="status">
        {submitted ? `Submitted: ${submitted}` : 'Enter sends. Shift + Enter adds a line.'}
    </p>
</div>
