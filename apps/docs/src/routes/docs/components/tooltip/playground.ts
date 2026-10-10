import {
    attributes,
    number,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    placement: select('Placement', ['top', 'right', 'bottom', 'left'], 'top'),
    glass: toggle('Glass surface', 'Appearance'),
    label: text('Text', 'Synced just now', 'Content'),
    rich: toggle('Rich content', 'Content'),
    showOnClick: toggle('Show on click', 'Behavior'),
    delay: number('Open delay', 125, {
        min: 0,
        max: 1000,
        step: 25,
        group: 'Behavior'
    }),
    closeDelay: number('Close delay', 100, {
        min: 0,
        max: 1000,
        step: 25,
        group: 'Behavior'
    })
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        placement: values.placement !== 'top' && values.placement,
        delay: values.delay !== 125 && values.delay,
        closeDelay: values.closeDelay !== 100 && values.closeDelay
    });
    const trigger = attributes({
        showOnClick: values.showOnClick
    });
    const content = attributes({
        rich: values.rich,
        surface: values.glass && 'glass'
    });
    const body = values.rich
        ? `
        <span class="flex items-center gap-2">
            <span aria-hidden="true" class="size-1.5 rounded-full bg-success"></span>
            ${values.label}
        </span>
    `
        : values.label;

    return `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
</script>

<Tooltip.Root${root}>
    <Tooltip.Trigger${trigger}>
        <Button variant="outline">Sync status</Button>
    </Tooltip.Trigger>
    <Tooltip.Content${content}>${body}</Tooltip.Content>
</Tooltip.Root>`;
}
