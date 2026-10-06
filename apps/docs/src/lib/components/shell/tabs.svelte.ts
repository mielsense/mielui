import { untrack } from 'svelte';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { getBreadcrumbs } from '$lib/components/docs/breadcrumbs';

export type DocsTab = {
    id: string;
    href: string;
    label: string;
};

const STORAGE_KEY = 'mielui:docs-tabs';
const MAX_TABS = 12;

function labelFor(pathname: string) {
    return getBreadcrumbs(pathname).at(-1)?.label ?? 'Docs';
}

function tracks(pathname: string) {
    return pathname.startsWith('/docs') && !pathname.startsWith('/docs/changelog');
}

function isTab(value: unknown): value is DocsTab {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const tab = value as Record<string, unknown>;

    return (
        typeof tab.id === 'string' &&
        typeof tab.label === 'string' &&
        typeof tab.href === 'string' &&
        tracks(tab.href)
    );
}

export function createDocsTabs() {
    let tabs = $state<DocsTab[]>([]);
    let active = $state('');
    let loaded = false;
    let count = 0;

    function create(pathname: string): DocsTab {
        count += 1;

        return {
            id: `${Date.now().toString(36)}-${count}`,
            href: pathname,
            label: labelFor(pathname)
        };
    }

    function load() {
        try {
            const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
            if (typeof stored !== 'object' || stored === null) {
                return;
            }
            const saved = stored as { tabs?: unknown; active?: unknown };
            if (Array.isArray(saved.tabs)) {
                tabs = saved.tabs.filter(isTab).slice(0, MAX_TABS);
            }
            if (typeof saved.active === 'string') {
                active = saved.active;
            }
        } catch {
            tabs = [];
        }
    }

    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ tabs, active }));
        } catch {
            return;
        }
    }

    function sync(pathname: string) {
        const existing = tabs.find((tab) => tab.href === pathname);
        const current = tabs.find((tab) => tab.id === active);
        if (existing) {
            active = existing.id;
        } else if (current) {
            current.href = pathname;
            current.label = labelFor(pathname);
        } else {
            const tab = create(pathname);
            tabs.push(tab);
            active = tab.id;
        }
        save();
    }

    $effect(() => {
        const pathname = page.url.pathname;
        if (!tracks(pathname)) {
            return;
        }
        untrack(() => {
            if (!loaded) {
                load();
                loaded = true;
            }
            sync(pathname);
        });
    });

    function open(href: string) {
        if (!tabs.some((tab) => tab.href === href)) {
            if (tabs.length >= MAX_TABS) {
                tabs.shift();
            }
            const tab = create(href);
            tabs.push(tab);
            active = tab.id;
        }
        void goto(href);
    }

    function close(id: string) {
        const index = tabs.findIndex((tab) => tab.id === id);
        if (index < 0 || tabs.length < 2) {
            return;
        }
        const wasActive = tabs[index].id === active;
        tabs.splice(index, 1);
        if (wasActive) {
            const next = tabs[Math.min(index, tabs.length - 1)];
            active = next.id;
            void goto(next.href);
        }
        save();
    }

    return {
        get tabs() {
            return tabs;
        },
        get active() {
            return active;
        },
        open,
        close
    };
}
