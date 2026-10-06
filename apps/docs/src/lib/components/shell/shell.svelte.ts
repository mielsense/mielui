import { getContext, setContext, untrack } from 'svelte';
import { createDocsTabs } from './tabs.svelte';

const SHELL_KEY = Symbol('docs-shell');
const STORAGE_KEY = 'mielui:sidebar-collapsed';
const WIDTH_KEY = 'mielui:sidebar-width';

export type SidebarKind = 'docs' | 'studio';

/** Sidebar widths in pixels: what each starts at, and how far it can be dragged. */
export const sidebarWidths = {
    docs: 296,
    studio: 336,
    min: 240,
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

    $effect(() => {
        untrack(() => {
            try {
                collapsed = localStorage.getItem(STORAGE_KEY) === 'true';
                const stored = JSON.parse(localStorage.getItem(WIDTH_KEY) ?? '{}');
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
        try {
            localStorage.setItem(STORAGE_KEY, String(collapsed));
        } catch {
            return;
        }
    }

    function resizeSidebar(kind: SidebarKind, width: number) {
        widths[kind] = clampWidth(width);
        try {
            localStorage.setItem(WIDTH_KEY, JSON.stringify(widths));
        } catch {
            return;
        }
    }

    return {
        get collapsed() {
            return collapsed;
        },
        sidebarWidth(kind: SidebarKind) {
            return widths[kind];
        },
        resizeSidebar,
        tabs,
        toggle
    };
}

export type Shell = ReturnType<typeof createShell>;

export function setShell(shell: Shell) {
    setContext(SHELL_KEY, shell);
}

export function getShell() {
    return getContext<Shell>(SHELL_KEY);
}
