import {
    attributes,
    expression,
    number,
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
    icon: toggle('Icon', 'Content'),
    iconSize: number('Icon size', 13, {
        min: 8,
        max: 20,
        step: 1,
        group: 'Content'
    }),
    dot: toggle('Dot', 'Content'),
    link: toggle('Link', 'Behavior')
};

function content(value: string): string {
    if (/[{}<&]/.test(value) || value !== value.trim()) {
        return `{${JSON.stringify(value)}}`;
    }

    return value;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        variant: values.variant,
        icon: values.icon && expression('PencilIcon'),
        iconSize: values.icon && values.iconSize !== 13 && values.iconSize,
        dot: values.dot,
        href: values.link && '/docs/components/badge'
    });
    const iconImport = values.icon
        ? `
    import PencilIcon from './pencil-icon.svelte';`
        : '';

    return `<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';${iconImport}
</script>

<Badge${props}>${content(values.label)}</Badge>`;
}
