import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    placement: select(
        'Placement',
        [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end'
        ],
        'bottom'
    ),
    variant: select(
        'Trigger variant',
        ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'glow', 'panel', 'quiet'],
        'outline',
        'Appearance'
    ),
    size: select('Trigger size', ['sm', 'md', 'lg'], 'md', 'Appearance'),
    glass: toggle('Glass surface', 'Appearance'),
    title: toggle('Title', 'Content', true),
    disabled: toggle('Disabled trigger', 'State'),
    hoverable: toggle('Open on hover', 'Behavior'),
    delay: number('Hover delay', 0, {
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
        placement: values.placement !== 'bottom' && values.placement,
        hoverable: values.hoverable,
        delay: values.delay !== 0 && values.delay,
        closeDelay: values.closeDelay !== 150 && values.closeDelay,
        inert: values.inert ? undefined : expression('false')
    });
    const trigger = attributes({
        variant: values.variant !== 'primary' && values.variant,
        size: values.size !== 'md' && values.size,
        disabled: values.disabled
    });
    const content = attributes({
        class: 'w-64',
        'aria-label': !values.title && 'Notifications',
        surface: values.glass && 'glass',
        allowClickOutside: values.allowClickOutside ? undefined : expression('false'),
        dismissLayer: values.dismissLayer ? undefined : expression('false'),
        focusTrap: values.focusTrap ? undefined : expression('false'),
        lockScroll: values.lockScroll ? undefined : expression('false'),
        portal: values.portal ? undefined : expression('false')
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
