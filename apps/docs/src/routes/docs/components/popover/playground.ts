import {
    attributes,
    BUTTON_VARIANTS,
    CONTROL_SIZES,
    changed,
    PLACEMENTS,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    placement: select('Placement', PLACEMENTS, 'bottom'),
    variant: select('Trigger variant', BUTTON_VARIANTS, 'primary', 'Appearance'),
    size: select('Trigger size', CONTROL_SIZES, 'md', 'Appearance'),
    icon: toggle('Chevron', 'Appearance'),
    glass: toggle('Glass surface', 'Appearance'),
    title: toggle('Title', 'Content', true),
    disabled: toggle('Disabled trigger', 'State'),
    hoverable: toggle('Open on hover', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        placement: changed(values.placement, 'bottom'),
        hoverable: values.hoverable
    });
    const trigger = attributes({
        variant: changed(values.variant, 'primary'),
        size: changed(values.size, 'md'),
        icon: values.icon,
        disabled: values.disabled
    });
    const content = attributes({
        class: 'w-64',
        'aria-label': !values.title && 'Notifications',
        surface: values.glass && 'glass'
    });
    const title = values.title
        ? `
                <Popover.Title>Watching this project</Popover.Title>`
        : '';

    return `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Popover from '@mielui/svelte/components/popover';
</script>

<Popover.Root${root}>
    <Popover.Trigger${trigger}>Notifications</Popover.Trigger>
    <Popover.Content${content}>
        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">${title}
                <p class="m-0 text-sm text-foreground-muted">
                    We email you when a new release ships.
                </p>
            </div>
            <Button variant="secondary" size="sm">Stop watching</Button>
        </div>
    </Popover.Content>
</Popover.Root>`;
}
