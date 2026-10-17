import type { Snippet } from 'svelte';
import type { NotchProps } from '.';
import type { NotchContext } from './context';

type ControllerOptions = {
    open: boolean;
    readonly side: NonNullable<NotchProps['side']>;
    readonly surface: NotchProps['surface'];
    readonly mode: NonNullable<NotchProps['mode']>;
    readonly duration: number;
    readonly labels: NotchProps['labels'];
};

const MAX_TIMEOUT = 2147483647;
const COLLAPSE_DELAY = 120;

/**
 * The shared notch state: open, hover and focus across every region, the peek collapse,
 * and the auto-close timer that pauses while the pointer or focus is inside.
 */
export function createNotchController(options: ControllerOptions): NotchContext {
    let hovered = $state(false);
    let focused = $state(false);
    let actionCount = $state(0);
    let width = $state(0);
    let height = $state(0);
    let peek = $state<Snippet>();
    let returnFocus: HTMLElement | undefined;
    let collapseTimer: ReturnType<typeof setTimeout> | undefined;
    const regions = new Set<HTMLElement>();

    function contains(element: Node | null) {
        return element !== null && [...regions].some((region) => region.contains(element));
    }

    function collapseIfIdle() {
        if (options.mode === 'peek' && !hovered && !focused) {
            options.open = false;
        }
    }

    let remaining = 0;
    let wasOpen = false;
    let previousDuration = -1;
    let previousMode: NotchProps['mode'];

    $effect(() => {
        const { open, duration, mode } = options;
        if (!open) {
            hovered = false;
            focused = false;
        }
        if (open !== wasOpen || duration !== previousDuration || mode !== previousMode) {
            remaining = Number.isFinite(duration) ? Math.max(0, duration) : 0;
            wasOpen = open;
            previousDuration = duration;
            previousMode = mode;
        }
        const paused = hovered || focused;
        if (
            !open ||
            mode !== 'triggered' ||
            !Number.isFinite(duration) ||
            duration <= 0 ||
            paused
        ) {
            return;
        }
        const started = performance.now();
        const timer = setTimeout(
            () => {
                options.open = false;
            },
            Math.min(remaining, MAX_TIMEOUT)
        );

        return () => {
            clearTimeout(timer);
            remaining = Math.max(0, remaining - (performance.now() - started));
        };
    });

    $effect(() => {
        return () => {
            clearTimeout(collapseTimer);
        };
    });

    return {
        get labels() {
            return options.labels;
        },
        get open() {
            return options.open;
        },
        set open(value) {
            options.open = value;
        },
        get side() {
            return options.side;
        },
        get surface() {
            return options.surface;
        },
        get mode() {
            return options.mode;
        },
        get actionCount() {
            return actionCount;
        },
        get width() {
            return width;
        },
        set width(value) {
            width = value;
        },
        get height() {
            return height;
        },
        set height(value) {
            height = value;
        },
        get returnFocus() {
            return returnFocus;
        },
        set returnFocus(value) {
            returnFocus = value;
        },
        get hovered() {
            return hovered;
        },
        set hovered(value) {
            hovered = value;
        },
        get focused() {
            return focused;
        },
        set focused(value) {
            focused = value;
        },
        get peek() {
            return peek;
        },
        set peek(value) {
            peek = value;
        },
        register(element, action = false) {
            regions.add(element);
            if (action) {
                actionCount += 1;
            }

            return () => {
                regions.delete(element);
                if (action) {
                    actionCount -= 1;
                }
                focused = typeof document !== 'undefined' && contains(document.activeElement);
            };
        },
        contains,
        scheduleCollapse() {
            clearTimeout(collapseTimer);
            if (actionCount === 0) {
                collapseIfIdle();
                return;
            }
            collapseTimer = setTimeout(collapseIfIdle, COLLAPSE_DELAY);
        },
        cancelCollapse() {
            clearTimeout(collapseTimer);
        }
    };
}
