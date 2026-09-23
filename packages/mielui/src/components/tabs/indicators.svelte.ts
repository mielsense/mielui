import { untrack } from 'svelte';
import type { TabsState } from '.';

type IndicatorOptions = {
    readonly element: HTMLDivElement | null;
    readonly state: TabsState;
    select: (value: string) => void;
};

export function createTabIndicators(options: IndicatorOptions) {
    type Rect = {
        left: number;
        top: number;
        width: number;
        height: number;
    };

    const showHover = $derived(options.state.variant !== 'segmented');

    let indicator = $state<Rect | null>(null);
    let hover = $state<Rect | null>(null);
    let hovering = $state(false);
    let ready = $state(false);
    let hoverTarget: HTMLElement | undefined;

    const ghostRect = $derived(hovering && hover ? hover : indicator);

    function borderBox(el: HTMLElement) {
        const style = getComputedStyle(el);
        const horizontal =
            style.boxSizing === 'border-box'
                ? 0
                : parseFloat(style.paddingLeft) +
                  parseFloat(style.paddingRight) +
                  parseFloat(style.borderLeftWidth) +
                  parseFloat(style.borderRightWidth);
        const vertical =
            style.boxSizing === 'border-box'
                ? 0
                : parseFloat(style.paddingTop) +
                  parseFloat(style.paddingBottom) +
                  parseFloat(style.borderTopWidth) +
                  parseFloat(style.borderBottomWidth);
        return {
            width: parseFloat(style.width) + horizontal,
            height: parseFloat(style.height) + vertical,
            borderLeft: parseFloat(style.borderLeftWidth),
            borderTop: parseFloat(style.borderTopWidth)
        };
    }

    function rectOf(el: HTMLElement): Rect {
        const bounds = el.getBoundingClientRect();
        const size = borderBox(el);
        const host = options.element;
        if (!host) {
            return { left: 0, top: 0, width: size.width, height: size.height };
        }
        const hostBounds = host.getBoundingClientRect();
        const hostSize = borderBox(host);
        const scaleX =
            hostSize.width > 0 && hostBounds.width > 0 ? hostBounds.width / hostSize.width : 1;
        const scaleY =
            hostSize.height > 0 && hostBounds.height > 0 ? hostBounds.height / hostSize.height : 1;
        return {
            left:
                (bounds.left + bounds.width / 2 - hostBounds.left) / scaleX -
                size.width / 2 +
                host.scrollLeft -
                hostSize.borderLeft,
            top:
                (bounds.top + bounds.height / 2 - hostBounds.top) / scaleY -
                size.height / 2 +
                host.scrollTop -
                hostSize.borderTop,
            width: size.width,
            height: size.height
        };
    }

    function repairSelection() {
        if (!options.element || !options.state.value) {
            return;
        }
        const enabled = Array.from(
            options.element.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        ).filter((trigger) => !trigger.disabled);
        if (!enabled.some((trigger) => trigger.dataset.value === options.state.value)) {
            options.select(enabled[0]?.dataset.value ?? '');
        }
    }

    function measureIndicator() {
        if (!options.element) {
            return;
        }
        const active = options.element.querySelector<HTMLElement>(
            '[role="tab"][data-state="active"]'
        );
        indicator = active ? rectOf(active) : null;
    }

    function measureHover() {
        if (
            !options.element ||
            !hoverTarget ||
            !options.element.contains(hoverTarget) ||
            hoverTarget.hasAttribute('disabled')
        ) {
            hoverTarget = undefined;
            hovering = false;
            hover = null;
            return;
        }
        hover = rectOf(hoverTarget);
    }

    function handleMouseOver(event: Event) {
        if (!showHover || !options.element) {
            return;
        }
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');
        if (!target || target.hasAttribute('disabled') || !options.element.contains(target)) {
            return;
        }
        hoverTarget = target;
        hover = rectOf(target);
        hovering = true;
    }

    function handleMouseLeave() {
        hoverTarget = undefined;
        hovering = false;
    }

    $effect(() => {
        const _value = options.state.value;
        const _orientation = options.state.orientation;
        let disposed = false;
        untrack(() => {
            queueMicrotask(() => {
                if (disposed) {
                    return;
                }
                repairSelection();
                measureIndicator();
                measureHover();
                ready = true;
            });
        });
        return () => {
            disposed = true;
        };
    });

    $effect(() => {
        if (!options.element) {
            return;
        }
        const ro = new ResizeObserver(() => {
            measureIndicator();
            measureHover();
        });
        const host = options.element;
        const observed = new Set<HTMLElement>();
        ro.observe(host);
        function syncTriggers() {
            const triggers = new Set(host.querySelectorAll<HTMLElement>('[role="tab"]'));
            for (const trigger of observed) {
                if (!triggers.has(trigger)) {
                    ro.unobserve(trigger);
                    observed.delete(trigger);
                }
            }
            for (const trigger of triggers) {
                if (!observed.has(trigger)) {
                    ro.observe(trigger);
                    observed.add(trigger);
                }
            }
            repairSelection();
            measureIndicator();
            measureHover();
        }
        syncTriggers();
        const mutations = new MutationObserver(syncTriggers);
        mutations.observe(host, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['disabled', 'data-value']
        });
        window.addEventListener('resize', measureIndicator);
        return () => {
            ro.disconnect();
            mutations.disconnect();
            window.removeEventListener('resize', measureIndicator);
        };
    });
    return {
        get indicator() {
            return indicator;
        },
        get hover() {
            return hover;
        },
        get hovering() {
            return hovering;
        },
        get ready() {
            return ready;
        },
        get ghostRect() {
            return ghostRect;
        },
        handleMouseOver,
        handleMouseLeave
    };
}
