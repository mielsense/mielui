<script lang="ts">
    import * as Composer from '@mielui/svelte/components/composer';

    let value = $state('What should we work on next?');
    function send() {
        value = '';
    }
</script>

<div class="w-full max-w-2xl">
    <Composer.Root surface="glass" bind:value onSubmit={send}>
        <Composer.Input aria-label="Message" />
        <Composer.Toolbar>
            <Composer.Actions>
                <span class="text-sm text-foreground-muted">Shift + Enter for a new line</span>
            </Composer.Actions>
            <Composer.Submit />
        </Composer.Toolbar>
    </Composer.Root>
</div>
