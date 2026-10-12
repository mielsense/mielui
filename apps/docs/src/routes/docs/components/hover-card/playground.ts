import {
    attributes,
    changed,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    side: select('Side', ['bottom', 'top', 'left', 'right'], 'bottom'),
    align: select('Align', ['start', 'center', 'end'], 'center', 'Appearance'),
    sideOffset: number('Side offset', 8, {
        min: 0,
        max: 32,
        step: 1,
        group: 'Appearance'
    }),
    glass: toggle('Glass surface', 'Appearance'),
    title: toggle('Title', 'Content', true),
    description: toggle('Description', 'Content', true),
    link: toggle('Link trigger', 'Behavior', true),
    openDelay: number('Open delay', 200, {
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
    })
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const root = attributes({
        openDelay: changed(values.openDelay, 200),
        closeDelay: changed(values.closeDelay, 150)
    });
    const trigger = attributes({
        href: values.link && 'https://ui.miel.my'
    });
    const content = attributes({
        side: changed(values.side, 'bottom'),
        align: changed(values.align, 'center'),
        sideOffset: changed(values.sideOffset, 8),
        surface: values.glass && 'glass'
    });
    const title = values.title
        ? `
        <HoverCard.Title>Mielui</HoverCard.Title>`
        : '';
    const description = values.description
        ? `
        <HoverCard.Description>
            Accessible Svelte 5 components styled with Tailwind CSS.
        </HoverCard.Description>`
        : '';

    return `<script lang="ts">
    import * as HoverCard from '@mielui/svelte/components/hover-card';
</script>

<HoverCard.Root${root}>
    <HoverCard.Trigger${trigger}>Mielui</HoverCard.Trigger>
    <HoverCard.Content${content}>${title}${description}
        <p class="mt-2 text-xs text-foreground-muted">ui.miel.my</p>
    </HoverCard.Content>
</HoverCard.Root>`;
}
