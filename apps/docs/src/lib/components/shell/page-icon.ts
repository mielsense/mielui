import {
    Analytics01Icon,
    BookOpen01Icon,
    Calendar03Icon,
    Clock01Icon,
    CompassIcon,
    CubeIcon,
    CursorPointer01Icon,
    Download04Icon,
    GridViewIcon,
    InformationCircleIcon,
    Layers01Icon,
    Layout01Icon,
    MagicWand01Icon,
    Mortarboard01Icon,
    NoteEditIcon,
    PackageIcon,
    PaintBrush01Icon,
    SparklesIcon,
    SwatchIcon,
    ToggleOnIcon
} from '@hugeicons/core-free-icons';
import { catalogPages } from '$lib/components';

export type ShellIcon = typeof BookOpen01Icon;

/** Docs pages that fill the panel, with no docs sidebar and no page tabs. */
const fullPanelPages = ['/docs/changelog', '/docs/agent-skill'];

/** One icon per component group. A component's page uses its group's icon. */
const groupIcons: Record<string, ShellIcon> = {
    'native-controls': CursorPointer01Icon,
    inputs: ToggleOnIcon,
    forms: NoteEditIcon,
    dates: Calendar03Icon,
    navigation: CompassIcon,
    overlays: Layers01Icon,
    layout: Layout01Icon,
    'status-and-content': InformationCircleIcon,
    blocks: PackageIcon,
    'ai-components': SparklesIcon,
    'chart-components': Analytics01Icon
};

const guideIcons: Record<string, ShellIcon> = {
    '/docs/installation': Download04Icon,
    '/docs/theming': PaintBrush01Icon,
    '/docs/agent-skill': Mortarboard01Icon,
    '/docs/changelog': Clock01Icon,
    '/docs/components': GridViewIcon
};

export function usesDocsSidebar(pathname: string) {
    return (
        pathname.startsWith('/docs') && !fullPanelPages.some((path) => pathname.startsWith(path))
    );
}

export function pageIcon(pathname: string) {
    const guide = guideIcons[pathname];
    if (guide) {
        return guide;
    }
    if (pathname.startsWith('/docs/actions')) {
        return MagicWand01Icon;
    }
    if (pathname.startsWith('/docs/components/')) {
        const slug = pathname.split('/')[3];
        const group = catalogPages.find((entry) => {
            return entry.id === slug || entry.items.includes(slug);
        });

        return (group && groupIcons[group.id]) ?? CubeIcon;
    }
    if (pathname.startsWith('/themes')) {
        return SwatchIcon;
    }

    return BookOpen01Icon;
}
