<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import * as Popover from '@mielui/svelte/components/popover';

    let {
        modalOpen = $bindable(false),
        popoverOpen = $bindable(false)
    }: {
        modalOpen?: boolean;
        popoverOpen?: boolean;
    } = $props();
</script>

<button type="button" data-testid="open-dialog" onclick={() => (modalOpen = true)}>
    Open dialog
</button>
<button type="button" data-testid="open-popover" onclick={() => (popoverOpen = true)}>
    Open popover
</button>

<!-- Sibling layers: the lock must stack across independent overlays. -->
<Popover.Root bind:open={popoverOpen}>
    <Popover.Trigger>
        <span data-testid="popover-trigger">Popover trigger</span>
    </Popover.Trigger>
    <Popover.Content>
        <p data-testid="popover-body">Sibling popover body</p>
        <button type="button" data-testid="inside-popover">Inside popover</button>
    </Popover.Content>
</Popover.Root>

<Dialog.Root bind:open={modalOpen}>
    <Dialog.Content>
        <Dialog.Title>Sibling dialog</Dialog.Title>
        <Dialog.Body>
            <button type="button" data-testid="close-dialog" onclick={() => (modalOpen = false)}>
                Close dialog
            </button>
        </Dialog.Body>
    </Dialog.Content>
</Dialog.Root>
