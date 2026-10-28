import {
    Analytics01Icon,
    Calendar03Icon,
    Clock01Icon,
    CompassIcon,
    CursorPointer01Icon,
    GridViewIcon,
    InformationCircleIcon,
    Layers01Icon,
    Layout01Icon,
    MagicWand01Icon,
    NoteEditIcon,
    PackageIcon,
    PaintBoardIcon,
    Rocket01Icon,
    SparklesIcon,
    SwatchIcon,
    ToggleOnIcon
} from '@hugeicons/core-free-icons';
import { catalogPages } from '$lib/components';
import type { ShellIcon } from './page-icon';

/** Soft color meshes. Each pairs with the `grain` class. */
export const mesh = {
    violet: 'radial-gradient(circle at 20% 15%, #e9d5ff 0, transparent 55%), radial-gradient(circle at 85% 85%, #7c3aed 0, transparent 60%), #a78bfa',
    teal: 'radial-gradient(circle at 20% 15%, #ccfbf1 0, transparent 55%), radial-gradient(circle at 85% 85%, #0891b2 0, transparent 60%), #2dd4bf',
    coral: 'radial-gradient(circle at 20% 15%, #ffe4e1 0, transparent 55%), radial-gradient(circle at 85% 85%, #e11d48 0, transparent 60%), #fb7185',
    sun: 'radial-gradient(circle at 20% 15%, #fef9c3 0, transparent 55%), radial-gradient(circle at 85% 85%, #eab308 0, transparent 60%), #fde047',
    indigo: 'radial-gradient(circle at 20% 15%, #e0e7ff 0, transparent 55%), radial-gradient(circle at 85% 85%, #3730a3 0, transparent 60%), #6366f1',
    sky: 'radial-gradient(circle at 20% 25%, #e0f2fe 0, transparent 55%), radial-gradient(circle at 85% 80%, #0ea5e9 0, transparent 55%), #7dd3fc',
    orange: 'radial-gradient(circle at 15% 30%, #f9731a 0, transparent 55%), radial-gradient(circle at 90% 10%, #fff3e0 0, transparent 50%), #f8b46b',
    pink: 'radial-gradient(circle at 85% 15%, #e450c8 0, transparent 50%), radial-gradient(circle at 15% 85%, #ffc2d6 0, transparent 55%), #f08fc0',
    lime: 'radial-gradient(circle at 20% 20%, #d9f99d 0, transparent 55%), radial-gradient(circle at 85% 80%, #22b07d 0, transparent 55%), #7bd6a3',
    mauve: 'radial-gradient(circle at 20% 15%, #fbe4f3 0, transparent 55%), radial-gradient(circle at 85% 85%, #8e4a78 0, transparent 60%), #ba7ca5',
    blue: 'radial-gradient(circle at 20% 15%, #dbeafe 0, transparent 55%), radial-gradient(circle at 85% 85%, #1d4ed8 0, transparent 60%), #60a5fa'
};

/** A docs group's look: a sticker glyph on a mesh, and the mesh's base color as a flat tint. */
export type Look = {
    id: string;
    title: string;
    icon: ShellIcon;
    mesh: string;
    tint: string;
    href: string;
};

export const startLook: Look = {
    id: 'start',
    title: 'Get started',
    icon: Rocket01Icon,
    mesh: mesh.orange,
    tint: '#f8b46b',
    href: '/docs/introduction'
};

/** Site pages listed as plain rows at the top of the sidebar. Each is its own group. */
const pageLooks: Look[] = [
    {
        id: 'components',
        title: 'Components',
        icon: GridViewIcon,
        mesh: mesh.mauve,
        tint: '#ba7ca5',
        href: '/docs/components'
    },
    {
        id: 'studio',
        title: 'Theme Studio',
        icon: PaintBoardIcon,
        mesh: mesh.violet,
        tint: '#a78bfa',
        href: '/studio'
    },
    {
        id: 'themes',
        title: 'Themes',
        icon: SwatchIcon,
        mesh: mesh.pink,
        tint: '#f08fc0',
        href: '/themes'
    },
    {
        id: 'changelog',
        title: 'Changelog',
        icon: Clock01Icon,
        mesh: mesh.sky,
        tint: '#7dd3fc',
        href: '/docs/changelog'
    }
];

const fallbackLook = pageLooks[0];

const groupLooks: Record<string, Omit<Look, 'id' | 'title' | 'href'>> = {
    'native-controls': { icon: CursorPointer01Icon, mesh: mesh.indigo, tint: '#6366f1' },
    inputs: { icon: ToggleOnIcon, mesh: mesh.teal, tint: '#2dd4bf' },
    forms: { icon: NoteEditIcon, mesh: mesh.sun, tint: '#fde047' },
    dates: { icon: Calendar03Icon, mesh: mesh.coral, tint: '#fb7185' },
    navigation: { icon: CompassIcon, mesh: mesh.sky, tint: '#7dd3fc' },
    overlays: { icon: Layers01Icon, mesh: mesh.violet, tint: '#a78bfa' },
    layout: { icon: Layout01Icon, mesh: mesh.lime, tint: '#7bd6a3' },
    'status-and-content': { icon: InformationCircleIcon, mesh: mesh.pink, tint: '#f08fc0' },
    blocks: { icon: PackageIcon, mesh: mesh.orange, tint: '#f8b46b' },
    'ai-components': { icon: SparklesIcon, mesh: mesh.violet, tint: '#a78bfa' },
    'chart-components': { icon: Analytics01Icon, mesh: mesh.blue, tint: '#60a5fa' },
    actions: { icon: MagicWand01Icon, mesh: mesh.coral, tint: '#fb7185' }
};

/** The look of a component group or of Actions, by its id. */
export function groupLook(id: string, title: string, href: string): Look {
    return {
        id,
        title,
        href,
        ...(groupLooks[id] ?? {
            icon: fallbackLook.icon,
            mesh: fallbackLook.mesh,
            tint: fallbackLook.tint
        })
    };
}

const startPages = [
    '/docs/introduction',
    '/docs/installation',
    '/docs/theming',
    '/docs/agent-skill'
];

/** The group a page belongs to, for its sticker label and title tint. */
export function lookFor(pathname: string): Look {
    if (startPages.some((path) => pathname.startsWith(path))) {
        return startLook;
    }
    if (pathname.startsWith('/docs/actions')) {
        return groupLook('actions', 'Actions', '/docs/actions');
    }
    if (pathname.startsWith('/docs/components/')) {
        const slug = pathname.split('/')[3];
        const group = catalogPages.find((entry) => {
            return entry.id === slug || entry.items.includes(slug);
        });
        if (group) {
            return groupLook(group.id, group.heading, `/docs/components/${group.id}`);
        }
    }

    if (pathname.startsWith('/fonts')) {
        return pageLooks[2];
    }

    return pageLooks.find((look) => pathname === look.href) ?? fallbackLook;
}

/**
 * Dresses a wrapped Mielui `Input` with a leading icon as the sidebar's search field: the card
 * color, a 10px radius, and a hairline shadow.
 */
export const searchField =
    '[&_[data-ui=input-control]]:min-h-9 [&_[data-ui=input-control]]:gap-2.5 [&_[data-ui=input-control]]:rounded-[10px] [&_[data-ui=input-control]]:border-border [&_[data-ui=input-control]]:bg-card [&_[data-ui=input-control]]:ps-3 [&_[data-ui=input-control]]:shadow-[0_1px_2px_rgb(0_0_0/0.03)] [&_input]:text-[13px]';

/** The floating shell clusters (Copy page, Studio preview tools and switch): a hairline and soft drop shadow over a blurred backdrop. Pair with a translucent card fill. */
export const floatingCluster =
    'shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-foreground)_7%,transparent),0_6px_20px_-8px_rgb(0_0_0/0.14)] backdrop-blur-xl backdrop-saturate-150';
