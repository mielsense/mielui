<script lang="ts">
    import Globe from '@lucide/svelte/icons/globe';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { Input } from '@mielui/svelte/components/input';
    import Shortcut from '@mielui/svelte/components/shortcut';

    let open = $state(false);
    let domain = $state('');
</script>

<Dialog.Root bind:open orientation="vertical">
    <Dialog.Trigger>Add Domain</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <div class="flex items-center gap-2.5">
                <Globe size={18} class="text-foreground-muted" />
                <Dialog.Title>Add a domain</Dialog.Title>
            </div>
            <Dialog.Description>Add an existing domain to your mielui project.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body class="gap-4">
            <Input
                bind:value={domain}
                label="Domain"
                placeholder="example.com"
                description="We'll guide you through DNS configuration next."
            />
        </Dialog.Body>
        <Dialog.Footer>
            <Dialog.Close>
                Cancel
                <Shortcut shortcut="esc" />
            </Dialog.Close>
            <Dialog.Confirm>
                Add
                <Shortcut shortcut="enter" />
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
