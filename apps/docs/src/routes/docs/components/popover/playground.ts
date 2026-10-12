import {
    attributes,
    BUTTON_VARIANTS,
    CONTROL_SIZES,
    changed,
    defaultOn,
    number,
    PLACEMENTS,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    placement: select('Placement', PLACEMENTS, 'bottom'),
    variant: select('Trigger variant', BUTTON_VARIANTS, 'outline', 'Appearance'),
    size: select('Trigger size', CONTROL_SIZES, 'md', 'Appearance'),
    glass: toggle('Glass surface', 'Appearance'),
    title: toggle('Title', 'Content', true),
    disabled: toggle('Disabled trigger', 'State'),
    hoverable: toggle('Open on hover', 'Behavior'),
    delay: number('Open delay', 0, {
        min: 0,
        max: 1000,
        step: 50,
        group: 'Behavior'
    }),
    closeDelay: number('Close delay', 150, {
        min: 0,
        max: 1000,
        step: 50,
        group: 'Behavior'
    }),
    inert: toggle('Inert page', 'Behavior', true),
    allowClickOutside: toggle('Close on outside press', 'Behavior', true),
    dismissLayer: toggle('Dismiss layer', 'Behavior', true),
    focusTrap: toggle('Trap focus', 'Behavior', true),
    lockScroll: toggle('Lock scroll', 'Behavior', true),
    portal: toggle('Portal', 'Behavior', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        placement: changed(values.placement, 'bottom'),
        hoverable: values.hoverable,
        delay: changed(values.delay, 0),
        closeDelay: changed(values.closeDelay, 150),
        inert: defaultOn(values.inert)
    });
    const trigger = attributes({
        variant: changed(values.variant, 'primary'),
        size: changed(values.size, 'md'),
        disabled: values.disabled
    });
    const content = attributes({
        class: 'w-64',
        'aria-label': !values.title && 'Notifications',
        surface: values.glass && 'glass',
        allowClickOutside: defaultOn(values.allowClickOutside),
        dismissLayer: defaultOn(values.dismissLayer),
        focusTrap: defaultOn(values.focusTrap),
        lockScroll: defaultOn(values.lockScroll),
        portal: defaultOn(values.portal)
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
