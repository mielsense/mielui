<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';

    let {
        outerOpen = $bindable(false),
        innerOpen = $bindable(false)
    }: {
        outerOpen?: boolean;
        innerOpen?: boolean;
    } = $props();
</script>

<Dialog.Root bind:open={outerOpen} orientation="vertical">
    <Dialog.Trigger data-testid="open-outer">Edit project</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Edit project</Dialog.Title>
            <Dialog.Description>Change the name, or transfer this project.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
            <Dialog.Root bind:open={innerOpen} orientation="vertical">
                <Dialog.Trigger data-testid="open-inner" variant="outline">
                    Transfer ownership
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Transfer ownership</Dialog.Title>
                        <Dialog.Description>The new owner gets full control.</Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Footer>
                        <Dialog.Close data-testid="inner-cancel">Cancel</Dialog.Close>
                        <Dialog.Confirm data-testid="inner-confirm">Transfer</Dialog.Confirm>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </Dialog.Body>
        <Dialog.Footer>
            <Dialog.Close data-testid="outer-cancel">Cancel</Dialog.Close>
            <Dialog.Confirm data-testid="outer-confirm">Save</Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
