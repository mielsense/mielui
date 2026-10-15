import {
    attributes,
    compact,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    separator: select('Separator', ['chevron', 'slash'], 'chevron'),
    items: number('Items', 3, {
        min: 1,
        max: 4,
        step: 1,
        group: 'Content'
    }),
    homeIcon: toggle('Home icon', 'Content'),
    current: toggle('Current page', 'State', true)
};

type Values = PlaygroundValues<typeof controls>;

const trail = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Docs',
        href: '/docs'
    },
    {
        label: 'Components',
        href: '/docs/components'
    },
    {
        label: 'Breadcrumb',
        href: '/docs/components/breadcrumb'
    }
];

/** The first `count` pages of the sample trail, between one and all four. */
export function pages(count: number) {
    const length = Number.isFinite(count) ? Math.min(Math.max(Math.floor(count), 1), 4) : 3;

    return trail.slice(0, length);
}

export function code(values: Values): string {
    const shown = pages(values.items);
    const separator =
        values.separator === 'slash'
            ? '<Breadcrumb.Separator>/</Breadcrumb.Separator>'
            : '<Breadcrumb.Separator />';
    const lines = shown.flatMap((page, index) => {
        const current = index === shown.length - 1 && values.current;
        const icon = index === 0 && values.homeIcon;
        const props = attributes({
            href: !current && page.href,
            current,
            'aria-label': icon && page.label
        });
        const item = icon
            ? `<Breadcrumb.Item${props}>
        <HugeiconsIcon icon={Home} size={13} />
    </Breadcrumb.Item>`
            : `<Breadcrumb.Item${props}>${page.label}</Breadcrumb.Item>`;

        return index === 0 ? [item] : [separator, item];
    });
    const imports = compact([
        values.homeIcon && "import { Home01Icon as Home } from '@hugeicons/core-free-icons';",
        "import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';",
        values.homeIcon && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');

    return `<script lang="ts">
    ${imports}
</script>

<Breadcrumb.Root>
${lines.map((line) => `    ${line}`).join('\n')}
</Breadcrumb.Root>`;
}
