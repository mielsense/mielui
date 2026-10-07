<script lang="ts">
    import * as Composer from '@mielui/svelte/components/composer';
    import { Switch } from '@mielui/svelte/components/switch';

    let value = $state('');
    let disabled = $state(false);
    let sent = $state(0);
</script>

<div class="flex w-full max-w-md flex-col gap-3">
    <Switch bind:checked={disabled} label="Disable the composer" />
    <Composer.Root
        bind:value
        allowEmpty
        {disabled}
        onSubmit={() => {
            sent += 1;
            value = '';
        }}
    >
        <Composer.Input aria-label="Message" placeholder="Send works with no text" />
        <Composer.Toolbar>
            <Composer.Submit />
        </Composer.Toolbar>
    </Composer.Root>
    <p class="text-sm text-foreground-muted">Sent {sent} times</p>
</div>
