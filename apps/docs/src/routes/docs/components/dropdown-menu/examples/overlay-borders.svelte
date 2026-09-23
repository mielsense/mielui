<script lang="ts">
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';

    let border = $state('double');
    let selection = $state('Choose an action');
</script>

<div class="flex min-h-72 flex-col items-center gap-5">
    <ToggleGroup.Root
        type="single"
        bind:value={
            () => border,
            (value) => {
            if (value) {
                border = value;
            }
        }
        }
        aria-label="Overlay border style"
    >
        {#each ['single', 'double'] as value (value)}
            <ToggleGroup.Item
                {value}
                onclickcapture={(event) => {
                    if (border === value) {
                        event.preventDefault();
                    }
                }}
                class="min-w-20 border border-border bg-background shadow-[var(--elevation-control-edge)] data-[state=on]:border-border-strong data-[state=on]:bg-secondary"
            >
                {value === 'single' ? 'Single' : 'Double'}
            </ToggleGroup.Item>
        {/each}
    </ToggleGroup.Root>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>Preview menu</DropdownMenu.Trigger>
        <DropdownMenu.Content
            class={border === 'single'
                ? 'min-w-56 [--mielui-border-inset-scale:0]'
                : 'min-w-56 [--mielui-border-inset-scale:1]'}
        >
            <DropdownMenu.Label>My account</DropdownMenu.Label>
            <DropdownMenu.Item callback={() => { selection = 'Profile selected'; }}>
                Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item callback={() => { selection = 'Settings selected'; }}>
                Settings
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item callback={() => { selection = 'Help selected'; }}>
                Help and feedback
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
    <p role="status" class="text-sm text-foreground-muted">{selection}</p>
</div>
