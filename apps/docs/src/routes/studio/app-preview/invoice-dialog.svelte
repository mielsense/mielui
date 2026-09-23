<script lang="ts">
    import { Add01Icon as Plus } from '@hugeicons/core-free-icons';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { Input } from '@mielui/svelte/components/input';
    import Kbd from '@mielui/svelte/components/kbd';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { AppPreviewModel } from './model.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<Dialog.Root bind:open={model.invoiceModalOpen}>
    <Dialog.Trigger>
        <HugeiconsIcon icon={Plus} size={15} />
        New invoice
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>New invoice</Dialog.Title>
            <Dialog.Description>
                Draft a customer invoice. You can add line items later.
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body class="gap-4">
            <Input
                bind:value={model.newInvoiceCustomer}
                label="Customer"
                placeholder="Studio name"
            />
            <Textarea
                bind:value={model.newInvoiceNotes}
                label="Notes"
                placeholder="Optional context for the draft"
                autoresize
            />
        </Dialog.Body>
        <Dialog.Footer>
            <Dialog.Close>
                Cancel
                <Kbd shortcut="esc" />
            </Dialog.Close>
            <Dialog.Confirm onclick={model.createInvoice}>
                Create draft
                <Kbd shortcut="enter" />
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
