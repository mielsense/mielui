<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import Kbd from '@mielui/svelte/components/kbd';

    import { getThemeEditor } from './context';

    const editor = getThemeEditor();
</script>

<AlertDialog.Root
    bind:open={
        () => editor.sharedTheme !== null,
        (open) => {
            if (!open) {
                editor.dismissSharedTheme();
            }
        }
    }
    orientation="vertical"
>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Load the shared theme?</AlertDialog.Title>
            <AlertDialog.Description>
                This link carries a theme. Loading it replaces your current draft, including every
                changed color, type, shape, and motion value.
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Exit onclick={editor.dismissSharedTheme}>
                Keep draft
                <Kbd shortcut="esc" />
            </AlertDialog.Exit>
            <AlertDialog.Confirm onclick={editor.acceptSharedTheme}>
                Load theme
                <Kbd shortcut="enter" />
            </AlertDialog.Confirm>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
