<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import Kbd from '@mielui/svelte/components/kbd';
    import Label from '@mielui/svelte/components/label';
    import * as Select from '@mielui/svelte/components/select';

    let open = $state(false);
    let role = $state('editor');

    const roles = [
        {
            value: 'viewer',
            label: 'Viewer'
        },
        {
            value: 'editor',
            label: 'Editor'
        },
        {
            value: 'admin',
            label: 'Admin'
        }
    ];
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
                <Label for="invite-member-role">Role</Label>
                <Select.Root bind:value={role}>
                    <Select.Trigger id="invite-member-role" class="w-full">
                        <Select.Value placeholder="Select a role" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each roles as option (option.value)}
                            <Select.Item value={option.value}>
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
