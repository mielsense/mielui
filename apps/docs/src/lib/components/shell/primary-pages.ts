import { resolve } from '$app/paths';
import { usesDocsSidebar } from './page-icon';

export type PrimaryPage = {
    id: 'docs' | 'components' | 'studio' | 'themes' | 'changelog';
    href: string;
    /** Short name for a text link. */
    label: string;
    /** Full name for a tooltip or an icon-only link. */
    name: string;
    current: boolean;
};

/** The site's primary pages, with the one the visitor is on marked current. */
export function primaryPages(pathname: string): PrimaryPage[] {
    const inComponents =
        pathname.startsWith('/docs/components') || pathname.startsWith('/docs/actions');
    const inChangelog = pathname.startsWith('/docs/changelog');

    return [
        {
            id: 'docs',
            href: resolve('/docs/introduction'),
            label: 'Docs',
            name: 'Docs',
            current: pathname.startsWith('/docs') && !inComponents && !inChangelog
        },
        {
            id: 'components',
            href: resolve('/docs/components'),
            label: 'Components',
            name: 'Components',
            current: inComponents
        },
        {
            id: 'studio',
            href: resolve('/studio'),
            label: 'Studio',
            name: 'Theme Studio',
            current: pathname.startsWith('/studio')
        },
        {
            id: 'themes',
            href: resolve('/themes'),
            label: 'Themes',
            name: 'Themes',
            current: pathname.startsWith('/themes')
        },
        {
            id: 'changelog',
            href: resolve('/docs/changelog'),
            label: 'Changelog',
            name: 'Changelog',
            current: inChangelog
        }
    ];
}

/** Whether a page shows the collapsible sidebar next to its content. */
export function hasShellSidebar(pathname: string): boolean {
    return usesDocsSidebar(pathname) || pathname.startsWith('/studio');
}
