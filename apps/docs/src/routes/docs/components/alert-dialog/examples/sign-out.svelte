<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import Kbd from '@mielui/svelte/components/kbd';

    let signedOut = $state(false);

    function signOut() {
        signedOut = true;
    }
</script>

<div class="flex flex-col items-center gap-3">
    <div class="grid place-items-center">
        <AlertDialog.Root>
            <AlertDialog.Trigger variant="outline">Sign out</AlertDialog.Trigger>
            <AlertDialog.Content size="lg">
                <AlertDialog.Header>
                    <AlertDialog.Title>Sign out?</AlertDialog.Title>
                    <AlertDialog.Description>
                        This preview will show a signed-out state. Your actual session is unchanged.
                    </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                    <AlertDialog.Exit>
                        Stay
                        <Kbd shortcut="esc" />
                    </AlertDialog.Exit>
                    <AlertDialog.Confirm onclick={signOut}>
                        Sign out
                        <Kbd shortcut="enter" />
                    </AlertDialog.Confirm>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </div>

    {#if signedOut}
        <p role="status" class="text-sm text-foreground-muted">Signed out of the preview.</p>
    {/if}
</div>
