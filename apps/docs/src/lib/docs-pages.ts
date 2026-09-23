import { chartGuides } from './chart-guides';
import {
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

const componentPages = components.flatMap((component) => [
    { href: `/docs/components/${component}`, label: sanitizeComponent(component) },
    ...componentGuidePages
        .filter((guide) => guide.component === component)
        .map((guide) => ({
            href: guide.href,
            label: guide.title
        }))
]);

export const componentDocPages = [
    ...componentTypes.flatMap((group) => [
        { href: componentTypeHref(group.id), label: group.heading },
        ...group.items.map((component) => ({
            href: `/docs/components/${component}`,
            label: sanitizeComponent(component)
        }))
    ]),
    ...componentPages.filter(
        (entry) =>
            !componentTypes.some((group) =>
                group.items.some((component) => entry.href === `/docs/components/${component}`)
            )
    ),
    ...navigationGroups
        .filter((group) => group.id === 'actions')
        .flatMap((group) =>
            group.items.map((action) => ({
                href: `/docs/actions/${action}`,
                label: sanitizeComponent(action)
            }))
        )
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
