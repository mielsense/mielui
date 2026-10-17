import {
    attributes,
    changed,
    defaultOn,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    size: select('Size', ['xs', 'sm', 'md', 'lg', 'xl'], 'xs'),
    glass: toggle('Glass surface', 'Appearance'),
    description: toggle('Description', 'Content', true),
    error: toggle('Destructive', 'State', true),
    allowEscape: toggle('Close on Escape', 'Behavior', true)
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const root = attributes({
        error: values.error
    });
    const content = attributes({
        size: changed(values.size, 'xs'),
        surface: values.glass && 'glass',
        allowEscape: defaultOn(values.allowEscape)
    });
    const description = values.description
        ? `
            <AlertDialog.Description>
                All branches, issues, and deploy history will be permanently removed.
            </AlertDialog.Description>`
        : '';

    return `<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
</script>

<AlertDialog.Root${root}>
    <AlertDialog.Trigger variant="outline">Delete project</AlertDialog.Trigger>
    <AlertDialog.Content${content}>
        <AlertDialog.Header>
            <AlertDialog.Title>Delete this project?</AlertDialog.Title>${description}
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Close>Cancel</AlertDialog.Close>
            <AlertDialog.Confirm>Delete project</AlertDialog.Confirm>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>`;
}
