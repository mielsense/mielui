<script lang="ts">
    import { Globe02Icon as Globe } from '@hugeicons/core-free-icons';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { Input } from '@mielui/svelte/components/input';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let open = $state(false);
    let domain = $state('');
    let addedDomain = $state('');

    function addDomain() {
        addedDomain = domain.trim();
        domain = '';
    }
</script>

<div class="flex flex-col items-center gap-3">
    <Dialog.Root bind:open orientation="vertical">
        <Dialog.Trigger>Add Domain</Dialog.Trigger>
        <Dialog.Content surface="glass">
            <Dialog.Header>
                <div class="flex items-center gap-2.5">
                    <HugeiconsIcon icon={Globe} size={18} class="text-foreground-muted" />
                    <Dialog.Title>Add a domain</Dialog.Title>
                </div>
                <Dialog.Description>
                    Add a domain to this local preview. No DNS settings are changed.
                </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body class="gap-4">
                <Input
                    bind:value={domain}
                    label="Domain"
                    placeholder="example.com"
                    description="Enter a domain name, such as example.com."
                />
            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.Close>
                    Cancel
                    <Kbd shortcut="esc" />
                </Dialog.Close>
                <Dialog.Confirm disabled={!domain.trim()} onclick={addDomain}>
                    Add
                    <Kbd shortcut="enter" />
                </Dialog.Confirm>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>

    {#if addedDomain}
        <p role="status" class="text-sm text-foreground-muted">
            {`${addedDomain} added to the preview.`}
        </p>
    {/if}
</div>
