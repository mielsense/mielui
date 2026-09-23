<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import * as Select from '@mielui/svelte/components/select';

    let {
        open = $bindable(false)
    }: {
        open?: boolean;
    } = $props();
</script>

<Dialog.Root bind:open orientation="vertical">
    <Dialog.Trigger data-testid="open-dialog">Edit project</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Edit project</Dialog.Title>
            <Dialog.Description>Choose an owner for this project.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
            <Select.Root>
                <Select.Trigger>
                    <span data-testid="select-trigger">
                        <Select.Value placeholder="Select an owner" />
                    </span>
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="ada" label="Ada">
                        <span data-testid="opt-ada">Ada</span>
                    </Select.Item>
                    <Select.Item value="linus" label="Linus">
                        <span data-testid="opt-linus">Linus</span>
                    </Select.Item>
                </Select.Content>
            </Select.Root>
        </Dialog.Body>
        <Dialog.Footer>
            <Dialog.Close data-testid="dialog-cancel">Cancel</Dialog.Close>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
