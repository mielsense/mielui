import {
    BookOpen01Icon,
    Clock01Icon,
    CubeIcon,
    GridViewIcon,
    MagicWand01Icon,
    SwatchIcon
} from '@hugeicons/core-free-icons';

export type ShellIcon = typeof BookOpen01Icon;

export function pageIcon(pathname: string) {
    if (pathname.startsWith('/docs/changelog')) {
        return Clock01Icon;
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
