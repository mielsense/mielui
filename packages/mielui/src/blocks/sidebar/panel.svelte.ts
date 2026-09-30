import { clickOutside, pushEscapeLayer } from '@mielui/svelte/utils';
import { onDestroy, tick, untrack } from 'svelte';
import { parentOverlayDepth } from '../../components/_internal/overlay/overlay.svelte';
import { getSidebarRoot, type PanelContext, setSidebarPanel } from './context.svelte';
import { clampWidth, finiteSize, widthBounds } from './geometry';
import type { SidebarPanelProps } from './types';

type Settings = Pick<
    SidebarPanelProps,
    | 'id'
    | 'label'
    | 'side'
    | 'variant'
    | 'collapsible'
    | 'open'
    | 'mobileOpen'
    | 'pinned'
    | 'width'
    | 'railWidth'
    | 'minWidth'
    | 'maxWidth'
    | 'rail'
    | 'onOpenChange'
    | 'onMobileOpenChange'
    | 'onPinnedChange'
    | 'onWidthChange'
>;
type Bindings = {
    open: (value: boolean) => void;
    mobileOpen: (value: boolean) => void;
    pinned: (value: boolean) => void;
    width: (value: number) => void;
};

export function createPanel(
    read: () => Settings,
    write: Bindings,
    getElement: () => HTMLElement | undefined
) {
    const label = $derived(read().label);
    const side = $derived(read().side ?? 'start');
    const variant = $derived(read().variant ?? 'default');
    const collapsible = $derived(read().collapsible ?? 'rail');
    const open = $derived(read().open ?? true);
    const mobileOpen = $derived(read().mobileOpen ?? false);
    const pinned = $derived(read().pinned ?? true);
    const width = $derived(read().width ?? 256);
    const railWidth = $derived(read().railWidth ?? 56);
    const minWidth = $derived(read().minWidth ?? 160);
    const maxWidth = $derived(read().maxWidth ?? 480);
    const onOpenChange = $derived(read().onOpenChange);
    const onMobileOpenChange = $derived(read().onMobileOpenChange);
    const onPinnedChange = $derived(read().onPinnedChange);
    const onWidthChange = $derived(read().onWidthChange);
    const rail = $derived(read().rail);
    const element = $derived(getElement());
    const root = getSidebarRoot();
    const depth = parentOverlayDepth();
    const panelId = untrack(() => read().id);
    if (!panelId.trim() || /\s/.test(panelId) || untrack(() => root.panels.has(panelId))) {
        throw new Error(
            'Sidebar.Panel needs a nonempty id without whitespace, unique within its Root.'
        );
    }
    let resizing = $state(false);
    let trigger: HTMLElement | undefined;
    const bounds = $derived(widthBounds(minWidth, maxWidth));
    const actualWidth = $derived(clampWidth(width, minWidth, maxWidth));
    const expanded = $derived(collapsible === 'none' || open);
    const collapsed = $derived(!root.mobile && !expanded);
    const railSize = $derived(Math.min(actualWidth, finiteSize(railWidth, 56)));
    const footprint = $derived(
        expanded && (pinned || collapsible === 'none')
            ? actualWidth
            : collapsible === 'rail'
              ? railSize
              : 0
    );
    const panelWidth = $derived(
        expanded ? actualWidth : collapsible === 'rail' ? railSize : actualWidth
    );
    const hidden = $derived(!expanded && (collapsible === 'offcanvas' || railSize === 0));
    const overlay = $derived(expanded && !pinned && collapsible !== 'none');
    const customRail = $derived(collapsed && rail !== undefined);
    const physicalSide = $derived(
        (side === 'start') === (root.direction === 'ltr') ? 'left' : 'right'
    );
    const transition = $derived(resizing ? { ...root.transition, duration: 0 } : root.transition);
    const panel: PanelContext = {
        id: panelId,
        depth,
        domId: `sidebar-${root.id}-${panelId}`,
        get label() {
            return label;
        },
        get side() {
            return side;
        },
        get open() {
            return expanded;
        },
        get mobileOpen() {
            return mobileOpen;
        },
        get pinned() {
            return pinned;
        },
        get width() {
            return actualWidth;
        },
        get minWidth() {
            return bounds.min;
        },
        get maxWidth() {
            return bounds.max;
        },
        get railWidth() {
            return railSize;
        },
        get mobile() {
            return root.mobile;
        },
        get collapsed() {
            return collapsed;
        },
        get collapsible() {
            return collapsible;
        },
        get resizing() {
            return resizing;
        },
        get direction() {
            return root.direction;
        },
        get customRail() {
            return customRail;
        },
        get variant() {
            return variant;
        },
        setOpen(value) {
            if (collapsible === 'none' || value === open) {
                return;
            }
            write.open(value);
            onOpenChange?.(value);
        },
        setMobileOpen(value) {
            if (value === mobileOpen) {
                return;
            }
            if (value) {
                root.openMobile(panelId);
            }
            write.mobileOpen(value);
            onMobileOpenChange?.(value);
        },
        setPinned(value) {
            if (value === pinned || collapsible === 'none') {
                return;
            }
            write.pinned(value);
            onPinnedChange?.(value);
        },
        setWidth(value) {
            const next = clampWidth(value, minWidth, maxWidth);
            if (next === width) {
                return;
            }
            write.width(next);
            onWidthChange?.(next);
        },
        setResizing(value) {
            resizing = value;
        },
        rememberTrigger(node) {
            trigger = node;
        },
        restoreFocus() {
            if (typeof document === 'undefined') {
                return;
            }
            const candidates = [
                ...document.querySelectorAll<HTMLElement>('[data-ui="sidebar-trigger"]')
            ];
            const external = candidates.find(
                (node) =>
                    node.getAttribute('aria-controls') === panel.domId && !element?.contains(node)
            );
            const target = trigger?.isConnected && !trigger.closest('[inert]') ? trigger : external;
            target?.focus({ preventScroll: true });
        },
        toggle() {
            if (root.mobile) {
                panel.setMobileOpen(!mobileOpen);
            } else {
                panel.setOpen(!expanded);
            }
        },
        close() {
            if (root.mobile) {
                panel.setMobileOpen(false);
            } else {
                panel.setOpen(false);
            }
        }
    };
    untrack(() => {
        root.panels.set(panelId, panel);
    });
    setSidebarPanel(panel);
    onDestroy(() => {
        untrack(() => {
            root.panels.delete(panelId);
        });
    });

    $effect(() => {
        if (root.mobile && mobileOpen) {
            untrack(() => {
                root.openMobile(panelId);
            });
        }
    });
    $effect(() => {
        if (root.ready && !root.mobile && mobileOpen) {
            panel.setMobileOpen(false);
        }
    });
    $effect(() => {
        if (!element || root.mobile || !overlay) {
            return;
        }
        const outside = clickOutside(
            element,
            () => {
                panel.close();
            },
            trigger ? [trigger] : []
        );
        const releaseEscape = pushEscapeLayer(
            () => {
                panel.close();
                panel.restoreFocus();
            },
            element,
            depth
        );
        return () => {
            outside.destroy();
            releaseEscape();
        };
    });
    let wasExpanded = $state(untrack(() => expanded));
    $effect.pre(() => {
        if (typeof document === 'undefined' || root.mobile) {
            return;
        }
        const active = document.activeElement;
        if (
            !wasExpanded &&
            expanded &&
            active instanceof HTMLElement &&
            active !== document.body &&
            !element?.contains(active)
        ) {
            trigger = active;
        }
        if (
            wasExpanded &&
            !expanded &&
            (hidden || customRail) &&
            active instanceof HTMLElement &&
            element?.contains(active)
        ) {
            void tick().then(() => {
                if (!expanded) {
                    panel.restoreFocus();
                }
            });
        }
        wasExpanded = expanded;
    });
    const framed = $derived(variant !== 'default');
    return {
        state: panel,
        get footprint() {
            return footprint;
        },
        get hidden() {
            return hidden;
        },
        get overlay() {
            return overlay;
        },
        get customRail() {
            return customRail;
        },
        get physicalSide() {
            return physicalSide;
        },
        get transition() {
            return transition;
        },
        get framed() {
            return framed;
        },
        get panelWidth() {
            return panelWidth;
        }
    };
}
