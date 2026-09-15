<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import Kbd from '@mielui/svelte/components/kbd';
</script>

<div class="grid place-items-center">
    <AlertDialog.Root>
        <AlertDialog.Trigger variant="outline">Sign out</AlertDialog.Trigger>
        <AlertDialog.Content size="lg">
            <AlertDialog.Header>
                <AlertDialog.Title>Sign out?</AlertDialog.Title>
                <AlertDialog.Description>
                    You'll need to sign in again to resume your session.
                </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Exit>
                    Stay
                    <Kbd shortcut="esc" />
                </AlertDialog.Exit>
                <AlertDialog.Confirm>
                    Sign out
                    <Kbd shortcut="enter" />
                </AlertDialog.Confirm>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>
</div>
