<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Select from '@mielui/svelte/components/select';

    let open = $state(false);
    let role = $state('editor');

    const roles = [
        { value: 'viewer', label: 'Viewer' },
        { value: 'editor', label: 'Editor' },
        { value: 'admin', label: 'Admin' }
    ];

    const selected = $derived(roles.find((option) => option.value === role));
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger>Invite member</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Invite member</Dialog.Title>
            <Dialog.Description>Choose a role for the new member.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
            <div class="flex flex-col gap-2">
                <span class="text-sm [font-weight:var(--font-weight-label,500)] text-foreground">
                    Role
                </span>
                <Select.Root value={role}>
                    <Select.Trigger class="w-full" variant="outline" size="md">
                        {selected?.label ?? 'Select role'}
                    </Select.Trigger>
                    <Select.Content>
                        {#each roles as option (option.value)}
                            <Select.Item value={option.value} onclick={() => (role = option.value)}>
                                {option.label}
                            </Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
        </Dialog.Body>
        <Dialog.Footer>
            <Dialog.Close>
                Cancel
                <Kbd shortcut="esc" />
            </Dialog.Close>
            <Dialog.Confirm>
                Invite
                <Kbd shortcut="enter" />
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
