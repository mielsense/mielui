import { getContext, setContext } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { SidebarState } from './types';

const ROOT = Symbol('mielui-sidebar-root');
const PANEL = Symbol('mielui-sidebar-panel');

export type PanelContext = SidebarState & {
    readonly domId: string;
    readonly depth: number;
    readonly railWidth: number;
    readonly direction: 'ltr' | 'rtl';
    readonly customRail: boolean;
    readonly variant: 'default' | 'inset' | 'floating';
    setResizing: (resizing: boolean) => void;
    rememberTrigger: (element: HTMLElement) => void;
    restoreFocus: () => void;
};

export type RootContext = {
    readonly id: string;
    readonly mobile: boolean;
    readonly ready: boolean;
    readonly themeStyle: string;
    readonly direction: 'ltr' | 'rtl';
    readonly transition: { duration: number; ease: [number, number, number, number] };
    panels: SvelteMap<string, PanelContext>;
    openMobile: (id: string) => void;
};

export function createRegistry() {
    return new SvelteMap<string, PanelContext>();
}

export function setSidebarRoot(context: RootContext) {
    setContext(ROOT, context);
    setContext(PANEL, undefined);
}

export function getSidebarRoot() {
    const root = getContext<RootContext | undefined>(ROOT);
    if (!root) {
        throw new Error('Sidebar parts must be inside Sidebar.Root.');
    }
    return root;
}

export function setSidebarPanel(context: PanelContext) {
    setContext(PANEL, context);
}

export function getSidebarPanel(id?: string | (() => string | undefined)): PanelContext {
    const root = getSidebarRoot();
    const parent = getContext<PanelContext | undefined>(PANEL);
    const readId = typeof id === 'function' ? id : () => id;
    if (readId() === undefined && !parent) {
        throw new Error('Pass a panel id when using a Sidebar control outside Sidebar.Panel.');
    }
    function targetId() {
        const target = readId() ?? parent?.id;
        if (target === undefined) {
            throw new Error('Sidebar control needs a target panel.');
        }
        return target;
    }
    function current() {
        return root.panels.get(targetId());
    }
    function resolve() {
        const panel = current();
        if (!panel) {
            throw new Error(`Sidebar panel "${targetId()}" is not mounted in this Root.`);
        }
        return panel;
    }
    return {
        get id() {
            return targetId();
        },
        get label() {
            return current()?.label ?? targetId();
        },
        get side() {
            return current()?.side ?? 'start';
        },
        get domId() {
            return `sidebar-${root.id}-${targetId()}`;
        },
        get depth() {
            return current()?.depth ?? 0;
        },
        get direction() {
            return root.direction;
        },
        get mobile() {
            return root.mobile;
        },
        get open() {
            return current()?.open ?? true;
        },
        get mobileOpen() {
            return current()?.mobileOpen ?? false;
        },
        get pinned() {
            return current()?.pinned ?? true;
        },
        get width() {
            return current()?.width ?? 256;
        },
        get minWidth() {
            return current()?.minWidth ?? 160;
        },
        get maxWidth() {
            return current()?.maxWidth ?? 480;
        },
        get railWidth() {
            return current()?.railWidth ?? 56;
        },
        get collapsed() {
            return current()?.collapsed ?? false;
        },
        get collapsible() {
            return current()?.collapsible ?? 'rail';
        },
        get resizing() {
            return current()?.resizing ?? false;
        },
        get customRail() {
            return current()?.customRail ?? false;
        },
        get variant() {
            return current()?.variant ?? 'default';
        },
        setOpen(value) {
            resolve().setOpen(value);
        },
        setMobileOpen(value) {
            resolve().setMobileOpen(value);
        },
        setPinned(value) {
            resolve().setPinned(value);
        },
        setWidth(value) {
            resolve().setWidth(value);
        },
        setResizing(value) {
            resolve().setResizing(value);
        },
        rememberTrigger(element) {
            resolve().rememberTrigger(element);
        },
        restoreFocus() {
            resolve().restoreFocus();
        },
        toggle() {
            resolve().toggle();
        },
        close() {
            resolve().close();
        }
    };
}

export function getSidebar(id?: string): SidebarState {
    return getSidebarPanel(id);
}
