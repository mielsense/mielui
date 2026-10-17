<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';

    let {
        open = $bindable(false),
        allowClickOutside = true,
        error = false,
        size = 'lg' as 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    } = $props();
</script>

<button type="button" data-testid="trigger" onclick={() => (open = true)}>Open</button>

<Dialog.Root bind:open {error}>
    <Dialog.Content {allowClickOutside} {size}>
        <Dialog.Header>
            <div class="flex flex-col gap-1.5">
                <Dialog.Title>Dialog Title</Dialog.Title>
                <Dialog.Description>Dialog Description</Dialog.Description>
            </div>
        </Dialog.Header>
        <Dialog.Body>
            <button type="button" data-testid="inside-1">Inside one</button>
            <button type="button" data-testid="inside-2">Inside two</button>
        </Dialog.Body>
        <Dialog.Footer>
            <Dialog.Close onclick={() => (open = false)}>Close</Dialog.Close>
            <Dialog.Confirm onclick={() => (open = false)}>Confirm</Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
