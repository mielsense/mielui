import {
    Mortarboard01Icon as Agent,
    BookOpen01Icon as Book,
    PaintBrush01Icon as Brush,
    Clock01Icon as Clock,
    Download04Icon as Download,
    GithubIcon as Github,
    GridViewIcon as Grid,
    PaintBoardIcon as Palette,
    SwatchIcon as Swatch
} from '@hugeicons/core-free-icons';
import { resolve } from '$app/paths';
import {
    componentTypeHref,
    componentTypes,
    entryHref,
    navigationGroups,
    sanitizeComponent
} from '$lib/components';
import { componentGuidePages } from '$lib/docs-pages';
import { GITHUB_URL } from '$lib/github';

const PILL_PADDING = 12;

/** Guide pages at the top of the docs sidebar. */
export const guides = [
    { label: 'Introduction', href: resolve('/docs/introduction'), icon: Book },
    { label: 'Installation', href: resolve('/docs/installation'), icon: Download },
    { label: 'Theming', href: resolve('/docs/theming'), icon: Brush },
    { label: 'Agent skill', href: resolve('/docs/agent-skill'), icon: Agent },
    { label: 'Components', href: resolve('/docs/components'), icon: Grid }
];
/** Site pages the mobile sheet lists under the guides. */
export const site = [
    { label: 'Theme Studio', href: resolve('/studio'), icon: Palette },
    { label: 'Themes', href: resolve('/themes'), icon: Swatch },
    { label: 'Changelog', href: resolve('/docs/changelog'), icon: Clock },
    { label: 'GitHub', href: GITHUB_URL, icon: Github }
];
/** Component and block sections, each with its pages and nested guides. */
export const sections = [
    ...componentTypes.map((type) => ({
        id: type.id,
        label: type.heading,
        href: componentTypeHref(type.id),
        items: type.items.map((component) => ({
            href: `/docs/components/${component}`,
            label: sanitizeComponent(component),
            nested: false
        }))
    })),
    ...navigationGroups
        .filter((group) => group.id !== 'components' && group.items.length > 0)
        .map((group) => ({
            id: group.id,
            label: group.heading,
            href: group.id === 'actions' ? '/docs/actions' : componentTypeHref(group.id),
            items: group.items.flatMap((component) => [
                {
                    href: entryHref(group.id, component),
                    label: sanitizeComponent(component),
                    nested: false
                },
                ...componentGuidePages
                    .filter((guide) => guide.component === component)
                    .map((guide) => ({
                        href: guide.href,
                        label: guide.title,
                        nested: true
                    }))
            ])
        }))
];

/** The sidebar pill's box: the current row's height, as wide as its label plus padding. */
export function measurePill(container: HTMLElement) {
    const current = container.querySelector<HTMLElement>('[data-nav-row][aria-current="page"]');

    if (!current) {
        return undefined;
    }

    const label = current.querySelector<HTMLElement>('[data-nav-label]') ?? current;
    const lead = current.firstElementChild ?? label;
    const bounds = container.getBoundingClientRect();
    const row = current.getBoundingClientRect();
    const start = Math.max(row.left, lead.getBoundingClientRect().left - PILL_PADDING);
    const end = Math.min(row.right, label.getBoundingClientRect().right + PILL_PADDING);

    return {
        top: row.top - bounds.top,
        left: start - bounds.left,
        width: end - start,
        height: current.offsetHeight
    };
}

/** The nearest ancestor that scrolls vertically. */
export function scrollParent(element: HTMLElement) {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        if (parent.scrollHeight > parent.clientHeight + 1) {
            const overflow = getComputedStyle(parent).overflowY;
            if (overflow === 'auto' || overflow === 'scroll') {
                return parent;
            }
        }
    }
    return undefined;
}
