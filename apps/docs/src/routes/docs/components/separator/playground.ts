import { attributes, type PlaygroundValues, select, toggle } from '$lib/components/docs/playground';

export const controls = {
    orientation: select('Orientation', ['horizontal', 'vertical'], 'horizontal'),
    decorative: toggle('Decorative', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const vertical = values.orientation === 'vertical';
    const props = attributes({
        orientation: vertical && values.orientation,
        decorative: values.decorative
    });
    const markup = vertical
        ? `<div class="flex h-5 items-center gap-4 text-sm">
    <span>Projects</span>
    <Separator${props} />
    <span>Members</span>
</div>`
        : `<div class="flex w-full max-w-xs flex-col gap-4 text-sm">
    <p class="m-0">Projects</p>
    <Separator${props} />
    <p class="m-0">Members</p>
</div>`;

    return `<script lang="ts">
    import Separator from '@mielui/svelte/components/separator';
</script>

${markup}`;
}
