import {
    attributes,
    changed,
    content,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select(
        'Variant',
        [
            'primary',
            'secondary',
            'ghost',
            'outline',
            'destructive',
            'info',
            'success',
            'warning',
            'error'
        ],
        'secondary'
    ),
    label: text('Label', 'Draft', 'Content'),
    dot: toggle('Dot', 'Content'),
    link: toggle('Link', 'Behavior')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const props = attributes({
        variant: changed(values.variant, 'secondary'),
        dot: values.dot,
        href: values.link && '/docs/components/badge'
    });

    return `<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
</script>

<Badge${props}>${content(values.label)}</Badge>`;
}
