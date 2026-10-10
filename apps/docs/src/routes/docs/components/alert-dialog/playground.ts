import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    size: select('Size', ['sm', 'md', 'lg', 'xl'], 'sm'),
    orientation: select('Orientation', ['vertical', 'horizontal'], 'vertical', 'Appearance'),
    trigger: select(
        'Trigger variant',
        ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'glow', 'panel', 'quiet'],
        'destructive',
        'Appearance'
    ),
    glass: toggle('Glass surface', 'Appearance'),
    description: toggle('Description', 'Content', true),
    error: toggle('Destructive', 'State', true),
    allowEscape: toggle('Close on Escape', 'Behavior', true),
    closeOnClick: toggle('Close on confirm', 'Behavior', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        error: values.error,
        orientation: values.orientation !== 'vertical' && values.orientation
    });
    const trigger = attributes({
        variant: values.trigger !== 'primary' && values.trigger
    });
    const content = attributes({
        size: values.size !== 'sm' && values.size,
        surface: values.glass && 'glass',
        allowEscape: values.allowEscape ? undefined : expression('false')
    });
    const confirm = attributes({
        closeOnClick: values.closeOnClick ? undefined : expression('false')
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
    <AlertDialog.Trigger${trigger}>Delete project</AlertDialog.Trigger>
    <AlertDialog.Content${content}>
        <AlertDialog.Header>
            <AlertDialog.Title>Delete this project?</AlertDialog.Title>${description}
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Exit>Cancel</AlertDialog.Exit>
            <AlertDialog.Confirm${confirm}>Delete project</AlertDialog.Confirm>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>`;
}
