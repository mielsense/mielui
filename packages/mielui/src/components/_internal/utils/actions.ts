function ownedStyles(node: HTMLElement, names: string[]) {
    const original = new Map(
        names.map((name) => [
            name,
            {
                value: node.style.getPropertyValue(name),
                priority: node.style.getPropertyPriority(name)
            }
        ])
    );
    const written = new Map<string, string>();
    return {
        set(name: string, value: string) {
            node.style.setProperty(name, value);
            written.set(name, node.style.getPropertyValue(name));
        },
        restore() {
            for (const [name, value] of written) {
                if (node.style.getPropertyValue(name) !== value) {
                    continue;
                }
                const previous = original.get(name);
                if (previous?.value) {
                    node.style.setProperty(name, previous.value, previous.priority);
                } else {
                    node.style.removeProperty(name);
                }
            }
            written.clear();
        }
    };
}

/** Keeps fixed overlays within the browser's visual viewport, including above an on-screen keyboard. */
export function visualViewportBounds(node: HTMLElement) {
    const styles = ownedStyles(node, [
        '--mielui-viewport-top',
        '--mielui-viewport-height',
        '--mielui-viewport-center'
    ]);
    const update = () => {
        const viewport = window.visualViewport;
        const top = viewport?.offsetTop ?? 0;
        const height = viewport?.height ?? window.innerHeight;

        styles.set('--mielui-viewport-top', `${top}px`);
        styles.set('--mielui-viewport-height', `${height}px`);
        styles.set('--mielui-viewport-center', `${top + height / 2}px`);
    };

    update();
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);
    window.addEventListener('resize', update);

    return {
        destroy() {
            styles.restore();
            window.visualViewport?.removeEventListener('resize', update);
            window.visualViewport?.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        }
    };
}

const PRESS_FLOOR = 0.94;

/**
 * Constant-pixel press scale.
 *
 * Sets `--mielui-press-sx/sy` from the element's size and `--motion-press-px` so
 * a small and a large control shrink by the same number of pixels rather than
 * the same ratio. Listens in the capture phase so the variables are in place
 * before `:active` paints.
 */
export function pressable(node: HTMLElement) {
    const styles = ownedStyles(node, ['--mielui-press-sx', '--mielui-press-sy']);
    function measure() {
        const raw = getComputedStyle(node).getPropertyValue('--motion-press-px').trim();
        const parsed = Number.parseFloat(raw);
        const px = Number.isFinite(parsed) ? Math.max(0, parsed) : 2;
        const { width, height } = node.getBoundingClientRect();
        const sx = width > 0 ? Math.max((width - px) / width, PRESS_FLOOR) : 0.98;
        const sy = height > 0 ? Math.max((height - px) / height, PRESS_FLOOR) : 0.98;
        styles.set('--mielui-press-sx', sx.toFixed(4));
        styles.set('--mielui-press-sy', sy.toFixed(4));
    }

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === ' ' || e.key === 'Enter') {
            measure();
        }
    }

    node.addEventListener('pointerdown', measure, true);
    node.addEventListener('keydown', onKeyDown);
    return {
        destroy() {
            styles.restore();
            node.removeEventListener('pointerdown', measure, true);
            node.removeEventListener('keydown', onKeyDown);
        }
    };
}

type TravelingHighlightOptions = {
    itemSelector?: string;
    restingSelector?: string;
};

/**
 * Draws one highlight that travels between the active items in a collection.
 * Geometry is written directly so pointer movement never causes a component render.
 *
 * Touch pointers never move the highlight -- `onPointerMove` / `onPointerOver`
 * ignore them -- so on a coarse-pointer device it follows keyboard focus only.
 * The action still mounts everywhere: skipping it on touch would drop the
 * highlight entirely on hybrid machines that have both a touchscreen and a
 * keyboard.
 */
export function travelingHighlight(node: HTMLElement, options: TravelingHighlightOptions = {}) {
    if (typeof window === 'undefined') {
        return {};
    }
    const traveling =
        getComputedStyle(node).getPropertyValue('--mielui-traveling-highlight').trim() !== 'none';
    const itemSelector = options.itemSelector ?? '[data-collection-item]';
    const restingSelector =
        options.restingSelector ??
        `${itemSelector}[data-collection-active="true"], ${itemSelector}[aria-selected="true"], ${itemSelector}[data-state="open"]`;
    const highlight = document.createElement('span');
    highlight.className = 'mielui-item-highlight';
    highlight.setAttribute('aria-hidden', 'true');
    node.classList.add('mielui-collection-surface');
    node.prepend(highlight);

    let current: HTMLElement | undefined;
    let frame = 0;
    let readyFrame = 0;
    let ready = false;
    let disposed = false;
    let observedTarget: HTMLElement | undefined;
    const resizeObserver = new ResizeObserver(() => schedule(current ?? restingTarget()));
    resizeObserver.observe(node);

    function usableItem(target: EventTarget | null) {
        if (!(target instanceof Element)) {
            return;
        }
        const item = target.closest<HTMLElement>(itemSelector);
        if (!item || !node.contains(item)) {
            return;
        }
        if (item.closest('.mielui-collection-surface') !== node) {
            return;
        }
        if (item.matches(':disabled, [aria-disabled="true"]') || item.hidden) {
            return;
        }
        return item;
    }

    function restingTarget() {
        for (const selector of restingSelector.split(',').map((part) => part.trim())) {
            const target = Array.from(node.querySelectorAll<HTMLElement>(selector)).find(
                (item) => item.closest('.mielui-collection-surface') === node
            );
            if (target) {
                return target;
            }
        }
        return undefined;
    }

    function measure(target: HTMLElement | undefined) {
        if (disposed) {
            return;
        }
        cancelAnimationFrame(frame);
        current = target;
        if (!target?.isConnected || target.hidden) {
            if (observedTarget) {
                resizeObserver.unobserve(observedTarget);
                observedTarget = undefined;
            }
            highlight.style.opacity = '0';
            return;
        }

        const container = node.getBoundingClientRect();
        const rect = target.getBoundingClientRect();
        const x = rect.left - container.left - node.clientLeft + node.scrollLeft;
        const y = rect.top - container.top - node.clientTop + node.scrollTop;
        highlight.style.width = `${rect.width}px`;
        highlight.style.height = `${rect.height}px`;
        highlight.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        highlight.style.opacity = '1';

        if (observedTarget !== target) {
            if (observedTarget) {
                resizeObserver.unobserve(observedTarget);
            }
            observedTarget = target;
            resizeObserver.observe(target);
        }
        if (!ready && traveling) {
            cancelAnimationFrame(readyFrame);
            readyFrame = requestAnimationFrame(() => {
                ready = true;
                highlight.setAttribute('data-ready', 'true');
            });
        }
    }

    function schedule(target: HTMLElement | undefined) {
        if (disposed) {
            return;
        }
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => measure(target));
    }

    function onPointerMove(event: PointerEvent) {
        if (event.pointerType === 'touch') {
            return;
        }
        const item = usableItem(event.target);
        if (item && item !== current) {
            schedule(item);
        }
    }

    function onPointerOver(event: PointerEvent) {
        if (event.pointerType === 'touch') {
            return;
        }
        const item = usableItem(event.target);
        if (item && item !== current) {
            schedule(item);
        }
    }

    function onPointerLeave() {
        schedule(restingTarget());
    }

    function onFocusIn(event: FocusEvent) {
        const item = usableItem(event.target);
        if (item) {
            schedule(item);
        }
    }

    function onFocusOut(event: FocusEvent) {
        if (event.relatedTarget instanceof Node && node.contains(event.relatedTarget)) {
            return;
        }
        schedule(restingTarget());
    }

    const mutationObserver = new MutationObserver(() => {
        schedule(restingTarget());
    });
    mutationObserver.observe(node, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: [
            'aria-selected',
            'data-collection-active',
            'data-state',
            'disabled',
            'hidden'
        ]
    });

    node.addEventListener('pointermove', onPointerMove);
    node.addEventListener('pointerover', onPointerOver);
    node.addEventListener('pointerleave', onPointerLeave);
    node.addEventListener('focusin', onFocusIn);
    node.addEventListener('focusout', onFocusOut);
    queueMicrotask(() => schedule(restingTarget()));

    return {
        destroy() {
            disposed = true;
            cancelAnimationFrame(frame);
            cancelAnimationFrame(readyFrame);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            node.removeEventListener('pointermove', onPointerMove);
            node.removeEventListener('pointerover', onPointerOver);
            node.removeEventListener('pointerleave', onPointerLeave);
            node.removeEventListener('focusin', onFocusIn);
            node.removeEventListener('focusout', onFocusOut);
            highlight.remove();
            node.classList.remove('mielui-collection-surface');
        }
    };
}

type DynamicWidthOptions = {
    enabled?: boolean;
    itemSelector?: string;
    buffer?: number;
};

/**
 * Sizes a menu panel to its largest item plus a buffer.
 *
 * Measures every visible item at its intrinsic width and writes the maximum
 * plus `buffer` pixels to the closest popover panel, re-measuring as items
 * mount, change, or resize. Writes are skipped when the width is unchanged.
 */
export function dynamicWidth(node: HTMLElement, options: DynamicWidthOptions = {}) {
    if (typeof window === 'undefined') {
        return {};
    }
    let enabled = options.enabled ?? true;
    let itemSelector = options.itemSelector ?? '[data-collection-item]';
    let buffer = options.buffer ?? 16;

    let frame = 0;
    let applied = '';
    let disposed = false;
    const settleFrames = new Set<number>();
    const target = panel();
    const originalWidth = target.style.width;
    const observed = new Set<HTMLElement>();
    const resizeObserver =
        typeof ResizeObserver === 'function' ? new ResizeObserver(() => schedule()) : undefined;
    const mutationObserver =
        typeof MutationObserver === 'function' ? new MutationObserver(() => schedule()) : undefined;

    function panel() {
        return (
            node.closest<HTMLElement>(
                '[data-ui="popover-content"], [data-ui="select-content"], [data-ui="dropdown-menu-content"], [data-ui="dropdown-menu-sub-content"], [data-ui="context-menu-content"], [data-ui="context-menu-sub-content"]'
            ) ?? node
        );
    }

    function collect() {
        return Array.from(node.querySelectorAll<HTMLElement>(itemSelector)).filter((item) => {
            const surface = item.closest('.mielui-collection-surface');
            if (surface && surface !== node) {
                return false;
            }
            return !item.hidden && item.getClientRects().length > 0;
        });
    }

    function syncItemObservers(items: HTMLElement[]) {
        if (!resizeObserver) {
            return;
        }
        for (const item of observed) {
            if (!items.includes(item)) {
                resizeObserver.unobserve(item);
                observed.delete(item);
            }
        }
        for (const item of items) {
            if (!observed.has(item)) {
                observed.add(item);
                resizeObserver.observe(item);
            }
        }
    }

    function measure() {
        frame = 0;
        if (disposed) {
            return;
        }
        const items = enabled ? collect() : [];
        syncItemObservers(items);
        if (items.length === 0) {
            if (applied) {
                if (target.style.width === applied) {
                    target.style.width = originalWidth;
                }
                applied = '';
            }
            return;
        }

        const previous = new Map<HTMLElement, string>();
        try {
            for (const item of items) {
                previous.set(item, item.style.width);
                item.style.width = 'max-content';
            }
            let max = 0;
            for (const item of items) {
                max = Math.max(max, item.offsetWidth);
            }
            const width = `${Math.ceil(max + buffer)}px`;
            if (width !== applied) {
                target.style.width = width;
                applied = width;
            }
        } finally {
            for (const item of items) {
                item.style.width = previous.get(item) ?? '';
            }
        }
    }

    function schedule() {
        if (disposed) {
            return;
        }
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(measure);
    }

    function settleFrame(callback: () => void) {
        if (disposed) {
            return;
        }
        const id = requestAnimationFrame(() => {
            settleFrames.delete(id);
            if (!disposed) {
                callback();
            }
        });
        settleFrames.add(id);
    }

    function settle() {
        queueMicrotask(() => {
            schedule();
            settleFrame(() => {
                schedule();
                settleFrame(schedule);
            });
        });
    }

    mutationObserver?.observe(node, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['hidden']
    });
    settle();

    return {
        update(next: DynamicWidthOptions = {}) {
            const wasEnabled = enabled;
            enabled = next.enabled ?? true;
            itemSelector = next.itemSelector ?? '[data-collection-item]';
            buffer = next.buffer ?? 16;
            if (enabled && !wasEnabled) {
                settle();
            } else {
                schedule();
            }
        },
        destroy() {
            disposed = true;
            cancelAnimationFrame(frame);
            for (const id of settleFrames) {
                cancelAnimationFrame(id);
            }
            settleFrames.clear();
            mutationObserver?.disconnect();
            resizeObserver?.disconnect();
            observed.clear();
            if (applied) {
                if (target.style.width === applied) {
                    target.style.width = originalWidth;
                }
                applied = '';
            }
        }
    };
}
