import {
    Clock01Icon as Clock,
    PaintBoardIcon as Palette,
    SwatchIcon as Swatch
} from '@hugeicons/core-free-icons';
import { resolve } from '$app/paths';
import { componentTypes, entryHref, navigationGroups, sanitizeComponent } from '$lib/components';
import { pageIcon, type ShellIcon } from '$lib/components/shell/page-icon';
import { componentGuidePages } from '$lib/docs-pages';
import type { SearchEntry } from './types';

export type PaletteEntry = {
    label: string;
    href: string;
    hint: string;
    icon: ShellIcon;
};

/** Guide pages, shown first. */
export const guides: PaletteEntry[] = [
    { label: 'Introduction', href: resolve('/docs/introduction') },
    { label: 'Installation', href: resolve('/docs/installation') },
    { label: 'Theming', href: resolve('/docs/theming') },
    { label: 'All components', href: resolve('/docs/components') },
    { label: 'Agent skill', href: resolve('/docs/agent-skill') }
].map((entry) => {
    return {
        ...entry,
        hint: '',
        icon: pageIcon(entry.href)
    };
});

/** Site pages outside the docs. */
export const places: PaletteEntry[] = [
    { label: 'Theme Studio', href: resolve('/studio'), hint: 'Workspace', icon: Palette },
    { label: 'Themes', href: resolve('/themes'), hint: 'Presets', icon: Swatch },
    { label: 'Changelog', href: resolve('/docs/changelog'), hint: 'Releases', icon: Clock }
];

function typeOf(component: string) {
    return componentTypes.find((type) => type.items.includes(component))?.heading;
}

/** Every component page and its guides, hinted with the component's category. */
export const components: PaletteEntry[] = navigationGroups.flatMap((group) => {
    return group.items.flatMap((item) => {
        const href = entryHref(group.id, item);
        const guidesForItem = componentGuidePages
            .filter((guide) => guide.component === item)
            .map((guide) => {
                return {
                    label: guide.title,
                    href: guide.href,
                    hint: sanitizeComponent(item),
                    icon: pageIcon(guide.href)
                };
            });

        return [
            {
                label: sanitizeComponent(item),
                href,
                hint: typeOf(item) ?? group.heading,
                icon: pageIcon(href)
            },
            ...guidesForItem
        ];
    });
});

/** Entries whose label starts with `needle` first, then those that contain it. */
export function matchEntries(
    entries: readonly SearchEntry[] | undefined,
    needle: string,
    limit: number
) {
    if (!entries || needle.length < 2) {
        return [];
    }
    const starts: SearchEntry[] = [];
    const contains: SearchEntry[] = [];
    for (const entry of entries) {
        const label = entry.label.toLowerCase();
        if (label.startsWith(needle)) {
            starts.push(entry);
        } else if (label.includes(needle)) {
            contains.push(entry);
        }
    }

    return [...starts, ...contains].slice(0, limit);
}
