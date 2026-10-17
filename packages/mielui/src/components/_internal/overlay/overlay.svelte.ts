import { createContext } from '@mielui/svelte/utils';
import { tick, untrack } from 'svelte';

type OverlayKind = 'dialog' | 'sheet' | 'other';

const overlayDepth = createContext<number>('overlay-depth');

type OverlayLayer = {
    panel: HTMLElement;
    kind: OverlayKind;
    depth: number;
    setTop?: (top: boolean) => void;
};

const overlayStack: OverlayLayer[] = [];
let escapeHandled = false;

function overlayNestingDepth() {
    const depth = (overlayDepth.find() ?? 0) + 1;
    overlayDepth.set(depth);

    return depth;
}

function applyOverlayRootLayer(panel: HTMLElement, depth: number) {
    const root = panel.closest('[data-overlay-root]');
    if (!(root instanceof HTMLElement)) {
        return;
    }
    root.style.position = 'relative';
    root.style.zIndex = String(100 + depth);
}

function clearOverlayRootLayer(panel: HTMLElement) {
    const root = panel.closest('[data-overlay-root]');
    if (!(root instanceof HTMLElement)) {
        return;
    }
    root.style.removeProperty('position');
    root.style.removeProperty('z-index');
}

function overlayKind(panel: HTMLElement): OverlayKind {
    const ui = panel.dataset.ui;
    if (panel.hasAttribute('data-dialog-panel')) {
        return 'dialog';
    }
    if (ui === 'sheet-content') {
        return 'sheet';
    }
    return 'other';
}

function modalScrim(panel: HTMLElement) {
    return panel
        .closest('[data-overlay-root]')
        ?.querySelector<HTMLElement>('[data-ui="dialog-overlay"]');
}

function clearModalStackAttrs(panel: HTMLElement) {
    panel.removeAttribute('data-stacked');
    panel.closest('[data-overlay-root]')?.removeAttribute('aria-hidden');
    modalScrim(panel)?.removeAttribute('data-nested');
}

function syncStackedModals() {
    for (const layer of overlayStack) {
        layer.setTop?.(layer === overlayStack[overlayStack.length - 1]);
    }
    const modals = overlayStack
        .filter((layer) => layer.kind === 'dialog')
        .sort((a, b) => a.depth - b.depth);
    for (const layer of modals) {
        const modalIndex = modals.indexOf(layer);
        const behind = modalIndex < modals.length - 1;
        const nested = modalIndex > 0;
        const root = layer.panel.closest('[data-overlay-root]');
        const scrim = modalScrim(layer.panel);
        applyOverlayRootLayer(layer.panel, layer.depth);
        if (behind) {
            layer.panel.setAttribute('data-stacked', 'behind');
            root?.setAttribute('aria-hidden', 'true');
            layer.panel.setAttribute('aria-modal', 'false');
        } else {
            layer.panel.removeAttribute('data-stacked');
            root?.removeAttribute('aria-hidden');
            layer.panel.setAttribute('aria-modal', 'true');
        }
        if (nested) {
            scrim?.setAttribute('data-nested', '');
        } else {
            scrim?.removeAttribute('data-nested');
        }
    }
}

/** Coordinates modal presentation while Bits UI owns focus and dismissal. */
export function useOverlayPresentation(options: {
    isOpen: () => boolean;
    panelEl: () => HTMLElement | undefined;
}) {
    const depth = overlayNestingDepth();
    let top = $state(true);

    $effect(() => {
        const panel = options.panelEl();
        if (!options.isOpen() || !panel) {
            return;
        }
        const layer: OverlayLayer = {
            panel,
            depth,
            kind: overlayKind(panel),
            setTop(value) {
                top = value;
            }
        };
        overlayStack.push(layer);
        overlayStack.sort((first, second) => first.depth - second.depth);
        applyOverlayRootLayer(panel, depth);
        syncStackedModals();

        return () => {
            const index = overlayStack.indexOf(layer);
            if (index >= 0) {
                overlayStack.splice(index, 1);
            }
            clearOverlayRootLayer(panel);
            clearModalStackAttrs(panel);
            syncStackedModals();
        };
    });

    return {
        get top() {
            return top;
        },
        claimEscape() {
            if (!top || escapeHandled) {
                return false;
            }
            escapeHandled = true;
            setTimeout(() => {
                escapeHandled = false;
            }, 0);
            return true;
        }
    };
}

/**
 * Mirrors an overlay's open state for its mount block, reporting a close one
 * tick late. A layer nested inside the overlay that closes in the same tick
 * then tears down its own listeners before the overlay's exit pauses it.
 */
export function useDeferredClose(isOpen: () => boolean) {
    let mounted = $state(untrack(isOpen));

    $effect.pre(() => {
        if (isOpen()) {
            mounted = true;
            return;
        }
        void tick().then(() => {
            if (!isOpen()) {
                mounted = false;
            }
        });
    });

    return {
        get current() {
            return mounted || isOpen();
        }
    };
}

/** Test isolation for the process-local nested overlay stack. */
export function resetOverlayStackForTests() {
    overlayStack.length = 0;
    escapeHandled = false;
}
