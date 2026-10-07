<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';

    let open = $state(false);
    let deleting = $state(false);
    let log = $state('Nothing deleted yet');

    function remove(event: MouseEvent) {
        event.preventDefault();
        deleting = true;
        setTimeout(() => {
            deleting = false;
            open = false;
            log = 'Branch deleted';
        }, 1200);
    }
</script>

<div class="flex flex-col items-center gap-3">
    <AlertDialog.Root
        bind:open
        error
        onOpenChange={(next) => {
            if (next) {
                log = 'Waiting for an answer';
            }
        }}
    >
        <AlertDialog.Trigger variant="outline">Delete branch</AlertDialog.Trigger>
        <AlertDialog.Content allowEscape={false}>
            <AlertDialog.Header>
                <AlertDialog.Title>Delete feat/rate-limit?</AlertDialog.Title>
                <AlertDialog.Description>
                    Escape is off here, so the only ways out are the two buttons.
                </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Exit disabled={deleting}>Keep it</AlertDialog.Exit>
                <AlertDialog.Confirm loading={deleting} loadingLabel="Deleting" onclick={remove}>
                    Delete branch
                </AlertDialog.Confirm>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>
    <p class="text-sm text-foreground-muted">{log}</p>
</div>
