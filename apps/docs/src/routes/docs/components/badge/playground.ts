import {
    attributes,
    changed,
    compact,
    content,
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

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const props = attributes({
        variant: changed(values.variant, 'secondary'),
        icon: values.icon && expression('PencilIcon'),
        iconSize: values.icon && changed(values.iconSize, 13),
        dot: values.dot,
        href: values.link && '/docs/components/badge'
    });
    const imports = compact([
        "import { Badge } from '@mielui/svelte/components/badge';",
        values.icon && "import PencilIcon from './pencil-icon.svelte';"
    ]).join('\n    ');

    return `<script lang="ts">
    ${imports}
</script>

<Badge${props}>${content(values.label)}</Badge>`;
}
