import {
    attributes,
    changed,
    content,
    type PlaygroundValues,
    select,
    text
} from '$lib/components/docs/playground';

export const controls = {
    shape: select('Shape', ['circle', 'square'], 'circle'),
    size: select('Size', ['sm', 'md', 'lg', 'xl'], 'lg', 'Appearance'),
    image: select('Image', ['photo', 'unavailable', 'none'], 'photo', 'Content'),
    alt: text('Alt text', 'Mielsense', 'Content'),
    fallback: text('Fallback', 'MI', 'Content')
};

type Values = PlaygroundValues<typeof controls>;

export const sources: Record<Values['image'], string | undefined> = {
    photo: 'https://github.com/mielsense.png',
    unavailable: 'data:image/png;base64,',
    none: undefined
};

export function code(values: Values): string {
    const root = attributes({
        size: changed(values.size, 'md'),
        shape: changed(values.shape, 'circle')
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
