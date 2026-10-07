import {
    BookOpen01Icon,
    Clock01Icon,
    CubeIcon,
    GridViewIcon,
    MagicWand01Icon,
    Mortarboard01Icon,
    SwatchIcon
} from '@hugeicons/core-free-icons';

export type ShellIcon = typeof BookOpen01Icon;

/** Docs pages that fill the panel, with no docs sidebar and no page tabs. */
const fullPanelPages = ['/docs/changelog', '/docs/agent-skill'];

export function usesDocsSidebar(pathname: string) {
    return (
        pathname.startsWith('/docs') && !fullPanelPages.some((path) => pathname.startsWith(path))
    );
}

export function pageIcon(pathname: string) {
    if (pathname.startsWith('/docs/changelog')) {
        return Clock01Icon;
    }
    if (pathname.startsWith('/docs/agent-skill')) {
        return Mortarboard01Icon;
    }
    if (pathname.startsWith('/docs/actions')) {
        return MagicWand01Icon;
    }
    if (pathname === '/docs/components') {
        return GridViewIcon;
    }
    if (pathname.startsWith('/docs/components/')) {
        return CubeIcon;
    }
    if (pathname.startsWith('/themes')) {
        return SwatchIcon;
    }

    return BookOpen01Icon;
}
