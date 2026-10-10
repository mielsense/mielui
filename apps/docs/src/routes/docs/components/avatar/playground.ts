import { attributes, type PlaygroundValues, select, text } from '$lib/components/docs/playground';

export const controls = {
    shape: select('Shape', ['circle', 'square'], 'circle'),
    size: select('Size', ['sm', 'md', 'lg', 'xl'], 'lg', 'Appearance'),
    image: select('Image', ['photo', 'unavailable', 'none'], 'photo', 'Content'),
    alt: text('Alt text', 'Mielsense', 'Content'),
    fallback: text('Fallback', 'MI', 'Content')
};

export const sources: Record<PlaygroundValues<typeof controls>['image'], string | undefined> = {
    photo: 'https://github.com/mielsense.png',
    unavailable: 'data:image/png;base64,',
    none: undefined
};

function content(value: string): string {
    if (/[{}<&]/.test(value) || value !== value.trim()) {
        return `{${JSON.stringify(value)}}`;
    }

    return value;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        size: values.size !== 'md' && values.size,
        shape: values.shape !== 'circle' && values.shape
    });
    const src = sources[values.image];
    const image =
        src === undefined
            ? ''
            : `
    <Avatar.Image${attributes({
        src,
        alt: values.alt
    })} />`;
    const fallback = values.fallback
        ? `
    <Avatar.Fallback>${content(values.fallback)}</Avatar.Fallback>`
        : '';

    return `<script lang="ts">
    import * as Avatar from '@mielui/svelte/components/avatar';
</script>

<Avatar.Root${root}>${image}${fallback}
</Avatar.Root>`;
}
