import {
    attributes,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    side: select('Side', ['top', 'bottom', 'left', 'right'], 'top'),
    glass: toggle('Glass surface', 'Appearance'),
    description: toggle('Description', 'Content', true),
    actions: toggle('Actions', 'Content'),
    close: toggle('Close button', 'Content'),
    sideAction: select('Side action', ['none', 'start', 'end'], 'none', 'Content'),
    accessory: toggle('Accessory', 'Content'),
    peekLabel: toggle('Peek label', 'Content'),
    mode: select('Mode', ['triggered', 'peek'], 'triggered', 'Behavior'),
    duration: number('Duration', 5000, {
        min: 0,
        max: 20000,
        step: 500,
        group: 'Behavior'
    })
};

const ACCESSORY_CLASS =
    'rounded-[var(--radius-control)] border border-border bg-card px-2.5 py-1 text-xs tabular-nums text-foreground-muted';

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        side: values.side !== 'top' && values.side,
        mode: values.mode !== 'triggered' && values.mode,
        duration: values.duration !== 5000 && values.duration,
        surface: values.glass && 'glass'
    });
    const lateral = values.side === 'left' || values.side === 'right';
    const content = attributes({
        'aria-label': 'Sync status',
        class: lateral && 'w-44 justify-center px-5'
    });
    const hasSideAction = values.sideAction !== 'none';
    const iconImport = hasSideAction
        ? `
    import { Settings01Icon as Settings } from '@hugeicons/core-free-icons';`
        : '';
    const iconComponent = hasSideAction
        ? `
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
        : '';
    const sideActionProps = attributes({
        side: values.sideAction === 'start' && 'start',
        'aria-label': 'Sync settings'
    });
    const sideAction = hasSideAction
        ? `
    <Notch.SideAction${sideActionProps}>
        <HugeiconsIcon icon={Settings} size={16} />
    </Notch.SideAction>`
        : '';
    const description = values.description
        ? `
            <Notch.Description class="text-xs">Your files are up to date.</Notch.Description>`
        : '';
    const actions = values.actions
        ? `
        <Notch.Actions>
            <Button variant="secondary" size="sm">View files</Button>
        </Notch.Actions>`
        : '';
    const close = values.close
        ? `
        <Notch.Close />`
        : '';
    const peek = values.peekLabel
        ? `
    <Notch.Peek>Synced</Notch.Peek>`
        : '';
    const accessory = values.accessory
        ? `
    <Notch.Accessory
        class="${ACCESSORY_CLASS}"
        aria-label="3 of 3 files synced"
    >
        3 of 3
    </Notch.Accessory>`
        : '';

    return `<script lang="ts">${iconImport}
    import { Button } from '@mielui/svelte/components/button';
    import * as Notch from '@mielui/svelte/components/notch';${iconComponent}

    let open = $state(false);

    function show() {
        open = true;
    }
</script>

<Button variant="secondary" onclick={show}>Show notch</Button>
<Notch.Root bind:open${root}>${sideAction}
    <Notch.Content${content}>
        <Notch.Header>
            <Notch.Title class="text-sm">All synced</Notch.Title>${description}
        </Notch.Header>${actions}${close}
    </Notch.Content>${peek}${accessory}
</Notch.Root>`;
}
