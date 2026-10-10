import {
    attributes,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    side: select('Side', ['top', 'bottom', 'left', 'right'], 'bottom'),
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

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        openDelay: values.openDelay !== 200 && values.openDelay,
        closeDelay: values.closeDelay !== 150 && values.closeDelay
    });
    const trigger = attributes({
        href: values.link && 'https://ui.miel.my'
    });
    const content = attributes({
        side: values.side !== 'bottom' && values.side,
        align: values.align !== 'center' && values.align,
        sideOffset: values.sideOffset !== 8 && values.sideOffset,
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
