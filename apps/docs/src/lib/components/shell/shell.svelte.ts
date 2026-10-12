import { createContext, untrack } from 'svelte';
import type { PageOutline } from '$lib/components/docs/page-outline.svelte';
import { readStorage, writeStorage } from '$lib/storage';
import { createDocsTabs } from './tabs.svelte';

const STORAGE_KEY = 'mielui:sidebar-collapsed';
const WIDTH_KEY = 'mielui:sidebar-width';

export type SidebarKind = 'docs' | 'studio';

/** Sidebar widths in pixels: what each starts at, and how far it can be dragged. */
export const sidebarWidths = {
    docs: 240,
    studio: 336,
    min: 200,
    max: 520
};

function clampWidth(width: number) {
    return Math.round(Math.min(sidebarWidths.max, Math.max(sidebarWidths.min, width)));
}

export function createShell() {
    let collapsed = $state(false);
    let widths = $state<Record<SidebarKind, number>>({
        docs: sidebarWidths.docs,
        studio: sidebarWidths.studio
    });
    const tabs = createDocsTabs();
    let outline = $state.raw<PageOutline>();

    $effect(() => {
        untrack(() => {
            try {
                collapsed = readStorage(STORAGE_KEY) === 'true';
                const stored = JSON.parse(readStorage(WIDTH_KEY) ?? '{}');
                for (const kind of ['docs', 'studio'] as const) {
                    if (typeof stored?.[kind] === 'number') {
                        widths[kind] = clampWidth(stored[kind]);
                    }
                }
            } catch {
                collapsed = false;
            }
        });
    });

    function toggle() {
        collapsed = !collapsed;
        writeStorage(STORAGE_KEY, String(collapsed));
    }

    function resizeSidebar(kind: SidebarKind, width: number) {
        widths[kind] = clampWidth(width);
        writeStorage(WIDTH_KEY, JSON.stringify(widths));
    }

    return {
        get collapsed() {
            return collapsed;
        },
        sidebarWidth(kind: SidebarKind) {
            return widths[kind];
        },
        /** The outline of the docs page on screen, for the top bar's section trail. */
        get outline() {
            return outline;
        },
        set outline(next: PageOutline | undefined) {
            outline = next;
        },
        resizeSidebar,
        tabs,
        toggle
    };
}

export type Shell = ReturnType<typeof createShell>;

export const [getShell, setShell] = createContext<Shell>();
