import { chartGuides } from './chart-guides';
import {
    categoryTypes,
    components,
    componentTypeHref,
    componentTypes,
    navigationGroups,
    sanitizeComponent
} from './components';

export function guidePath(component: string, slug: string): string {
    return `/docs/components/${component}/${slug}`;
}

export const componentGuidePages = chartGuides.map((guide) => ({
    ...guide,
    href: guidePath(guide.component, guide.slug)
}));

/** A component's page followed by its guide pages. */
function pagesFor(component: string) {
    return [
        { href: `/docs/components/${component}`, label: sanitizeComponent(component) },
        ...componentGuidePages
            .filter((guide) => guide.component === component)
            .map((guide) => ({
                href: guide.href,
                label: guide.title
            }))
    ];
}

export const componentDocPages = [
    ...componentTypes.flatMap((group) => [
        { href: componentTypeHref(group.id), label: group.heading },
        ...group.items.map((component) => ({
            href: `/docs/components/${component}`,
            label: sanitizeComponent(component)
        }))
    ]),
    ...categoryTypes.flatMap((group) => [
        { href: componentTypeHref(group.id), label: group.heading },
        ...group.items.flatMap((component) => pagesFor(component))
    ]),
    ...navigationGroups
        .filter((group) => group.id === 'actions')
        .flatMap((group) => [
            { href: '/docs/actions', label: group.heading },
            ...group.items.map((action) => ({
                href: `/docs/actions/${action}`,
                label: sanitizeComponent(action)
            }))
        ])
];

export const guideDocPages = [
    { href: '/docs/introduction', label: 'Introduction' },
    { href: '/docs/installation', label: 'Installation' },
    { href: '/docs/theming', label: 'Theming' },
    { href: '/docs/agent-skill', label: 'Agent skill' },
    { href: '/docs/changelog', label: 'Changelog' },
    { href: '/docs/components', label: 'Components' }
];

export const allDocPages = [...guideDocPages, ...componentDocPages];

export const catalogSections = [
    ...componentTypes.map((type) => ({
        label: type.heading,
        value: type.description,
        href: componentTypeHref(type.id)
    })),
    ...categoryTypes
        .filter((group) => group.items.length > 0)
        .map((group) => ({
            label: group.heading,
            value: group.description,
            href: componentTypeHref(group.id)
        })),
    ...navigationGroups
        .filter((group) => group.id === 'actions')
        .map((group) => ({
            label: group.heading,
            value: `${group.items.length} entries`,
            href: '/docs/actions'
        }))
];

export function componentOwner(pathname: string): string | undefined {
    const segments = pathname.replace(/\/$/, '').split('/');
    if (segments[1] !== 'docs' || segments[2] !== 'components') {
        return undefined;
    }
    const component = segments[3];
    return components.includes(component) ? component : undefined;
}

export function componentGuide(pathname: string) {
    return componentGuidePages.find((guide) => guide.href === pathname.replace(/\/$/, ''));
}
