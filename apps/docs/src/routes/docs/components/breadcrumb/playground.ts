import {
    attributes,
    number,
    type PlaygroundValues,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    items: number('Items', 3, {
        min: 1,
        max: 4,
        step: 1,
        group: 'Content'
    }),
    homeIcon: toggle('Home icon', 'Content'),
    slash: toggle('Slash separator', 'Content'),
    label: text('Label', 'Breadcrumb', 'Content'),
    current: toggle('Current page', 'State', true),
    currentLink: toggle('Link the current page', 'Behavior')
};

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

export function code(values: PlaygroundValues<typeof controls>): string {
    const shown = pages(values.items);
    const root = attributes({
        'aria-label': values.label !== 'Breadcrumb' && values.label
    });
    const separator = values.slash
        ? '<Breadcrumb.Separator>/</Breadcrumb.Separator>'
        : '<Breadcrumb.Separator />';
    const lines = shown.flatMap((page, index) => {
        const last = index === shown.length - 1;
        const current = last && values.current;
        const icon = index === 0 && values.homeIcon;
        const props = attributes({
            href: !(current && !values.currentLink) && page.href,
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
    const iconImport = values.homeIcon
        ? `
    import { Home01Icon as Home } from '@hugeicons/core-free-icons';`
        : '';
    const iconComponent = values.homeIcon
        ? `
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
        : '';

    return `<script lang="ts">${iconImport}
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';${iconComponent}
</script>

<Breadcrumb.Root${root}>
${lines.map((line) => `    ${line}`).join('\n')}
</Breadcrumb.Root>`;
}
