<script lang="ts">
    import Button from '@mielui/svelte/components/button';
    import * as Command from '@mielui/svelte/components/command';
    import Kbd from '@mielui/svelte/components/kbd';

    let {
        mode = 'button',
        shortcut = 'cmd+k',
        disabled = false,
        onactivate = () => {}
    }: {
        mode?: 'button' | 'standalone' | 'command';
        shortcut?: string;
        disabled?: boolean;
        onactivate?: () => void;
    } = $props();
</script>

{#if mode === 'command'}
    <Command.Root>
        <Command.Trigger data-testid="command-trigger">
            Open command
            <Kbd {shortcut} data-testid="shortcut" />
        </Command.Trigger>
        <Command.Content>
            <Command.Search placeholder="Search commands" />
            <Command.Results />
        </Command.Content>
    </Command.Root>
{:else if mode === 'standalone'}
    <Kbd {shortcut} ontrigger={onactivate} data-testid="shortcut" />
{:else}
    <Button onclick={onactivate} {disabled} data-testid="owner">
        Run action
        <Kbd {shortcut} data-testid="shortcut" />
    </Button>
{/if}

<input data-testid="editable" aria-label="Editable target" />
