import {
    BookOpen01Icon,
    Clock01Icon,
    Download04Icon,
    GridViewIcon,
    Mortarboard01Icon,
    PaintBrush01Icon,
    SwatchIcon
} from '@hugeicons/core-free-icons';
import { lookFor } from './look';

export type ShellIcon = typeof BookOpen01Icon;

const guideIcons: Record<string, ShellIcon> = {
    '/docs/installation': Download04Icon,
    '/docs/theming': PaintBrush01Icon,
    '/docs/agent-skill': Mortarboard01Icon,
    '/docs/changelog': Clock01Icon,
    '/docs/components': GridViewIcon
};

export function pageIcon(pathname: string) {
    const guide = guideIcons[pathname];
    if (guide) {
        return guide;
    }
    if (pathname.startsWith('/docs/actions') || pathname.startsWith('/docs/components/')) {
        return lookFor(pathname).icon;
    }
    if (pathname.startsWith('/themes')) {
        return SwatchIcon;
    }

    return BookOpen01Icon;
}
