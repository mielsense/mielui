import { attributes, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

export const controls = {
    glass: toggle('Glass surface', 'Appearance'),
    checkbox: toggle('Checkbox item', 'Content', true),
    inset: toggle('Inset items', 'Content', true),
    submenu: toggle('Submenu', 'Content', true),
    destructive: toggle('Destructive item', 'Content', true),
    disabledItem: toggle('Disabled item', 'State')
};

const TRIGGER_CLASS =
    'grid h-32 w-72 place-items-center rounded-[var(--radius-xl)] border border-dashed border-border text-sm text-foreground-muted';

export function code(values: PlaygroundValues<typeof controls>): string {
    const surface = attributes({
        surface: values.glass && 'glass'
    });
    const inset = attributes({
        inset: values.inset
    });
    const paste = attributes({
        inset: values.inset,
        disabled: values.disabledItem
    });
    const remove = attributes({
        inset: values.inset,
        variant: values.destructive && 'destructive'
    });
    const script = values.checkbox
        ? `

    let grid = $state(true);`
        : '';
    const checkbox = values.checkbox
        ? `
        <ContextMenu.CheckboxItem value="grid" bind:checked={grid}>
            Show grid
        </ContextMenu.CheckboxItem>
        <ContextMenu.Separator />`
        : '';
    const submenu = values.submenu
        ? `
        <ContextMenu.Sub>
            <ContextMenu.SubTrigger${inset}>Arrange</ContextMenu.SubTrigger>
            <ContextMenu.SubContent${surface}>
                <ContextMenu.Item>Bring to front</ContextMenu.Item>
                <ContextMenu.Item>Send to back</ContextMenu.Item>
            </ContextMenu.SubContent>
        </ContextMenu.Sub>`
        : '';

    return `<script lang="ts">
    import * as ContextMenu from '@mielui/svelte/components/context-menu';${script}
</script>

<ContextMenu.Root>
    <ContextMenu.Trigger
        class="${TRIGGER_CLASS}"
    >
        Right-click or press and hold
    </ContextMenu.Trigger>
    <ContextMenu.Content${surface}>${checkbox}
        <ContextMenu.Item${inset}>Copy</ContextMenu.Item>
        <ContextMenu.Item${paste}>Paste</ContextMenu.Item>${submenu}
        <ContextMenu.Separator />
        <ContextMenu.Item${remove}>Delete</ContextMenu.Item>
    </ContextMenu.Content>
</ContextMenu.Root>`;
}
