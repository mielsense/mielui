import {
    attributes,
    changed,
    content,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    placement: select('Placement', ['top', 'right', 'bottom', 'left'], 'top'),
    glass: toggle('Glass surface', 'Appearance'),
    label: text('Label', 'Synced just now', 'Content'),
    rich: toggle('Rich content', 'Content'),
    showOnClick: toggle('Show on click', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        placement: changed(values.placement, 'top')
    });
    const trigger = attributes({
        showOnClick: values.showOnClick
    });
    const panel = attributes({
        rich: values.rich,
        surface: values.glass && 'glass'
    });
    const body = values.rich
        ? `
        <span class="flex items-center gap-2">
            <span aria-hidden="true" class="size-1.5 rounded-full bg-success"></span>
            ${content(values.label)}
        </span>
    `
        : content(values.label);

    return `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
</script>

<Tooltip.Root${root}>
    <Tooltip.Trigger${trigger}>
        <Button variant="outline">Sync status</Button>
    </Tooltip.Trigger>
    <Tooltip.Content${panel}>${body}</Tooltip.Content>
</Tooltip.Root>`;
}
