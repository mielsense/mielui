<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';

    let plan = $state('No plan chosen yet');
</script>

<div class="flex flex-col items-center gap-3">
    <Dialog.Root>
        <Dialog.Trigger>Choose a plan</Dialog.Trigger>
        <Dialog.Content showClose={false} allowEscape={false} allowClickOutside={false}>
            <Dialog.Header>
                <Dialog.Title>Your trial has ended</Dialog.Title>
                <Dialog.Description>
                    Pick a plan to keep working. Escape and the backdrop do nothing here.
                </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
                <Dialog.Close
                    onclick={() => {
                        plan = 'Free plan';
                    }}
                >
                    Stay on Free
                </Dialog.Close>
                <Dialog.Confirm
                    onclick={() => {
                        plan = 'Team plan';
                    }}
                >
                    Upgrade to Team
                </Dialog.Confirm>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
    <p class="text-sm text-foreground-muted">{plan}</p>
</div>
