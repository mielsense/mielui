import { getCssDuration } from '@mielui/svelte/transition';
import { observeThemeChanges } from '../../components/_internal/theme-changes';
import { closePopover, type NotchContext, openPopover } from './context';
import { notchShape } from './shape';

type FrameOptions = {
    readonly context: NotchContext;
    readonly reduced: boolean;
    readonly offset: number;
    readonly host: HTMLElement | null;
    readonly body: HTMLElement | undefined;
    readonly surface: HTMLElement | undefined;
    cancelSwipe: () => void;
};

/** Size, clip shape, and spring targets for the notch frame and its content. */
export function createNotchFrame(options: FrameOptions) {
    const context = options.context;
    let ready = $state(false);
    let presented = $state(false);
    let width = $state(0);
    let height = $state(0);
    let drawnWidth = $state(320);
    let drawnHeight = $state(120);
    let duration = $state(0);
    let inset = $state(0);

    const vertical = $derived(context.side === 'top' || context.side === 'bottom');
    const instant = $derived(options.reduced || duration === 0);
    const collapsedWidth = $derived.by(() => {
        if (context.peek) {
            return vertical ? 160 : 44;
        }

        return vertical ? 96 : 16;
    });
    const collapsedHeight = $derived.by(() => {
        if (context.peek) {
            return vertical ? 36 : 192;
        }

        return vertical ? 16 : 192;
    });
    const expanded = $derived(context.open && presented);
    const insets = $derived({
        top: context.side === 'top' ? 0 : inset,
        right: context.side === 'right' ? 0 : inset,
        bottom: context.side === 'bottom' ? 0 : inset,
        left: context.side === 'left' ? 0 : inset
    });
    const outline = $derived(notchShape(drawnWidth, drawnHeight, context.side));
    const interior = $derived(
        notchShape(
            Math.max(1, drawnWidth - insets.left - insets.right),
            Math.max(1, drawnHeight - insets.top - insets.bottom),
            context.side
        )
    );
    const spring = $derived(
        instant
            ? { duration: 0 }
            : {
                  type: 'spring' as const,
                  visualDuration: Math.max(0.12, (duration / 200) * (context.open ? 0.27 : 0.22)),
                  bounce: context.open ? 0.15 : 0
              }
    );
    const frameTarget = $derived.by(() => {
        const peeking = context.mode === 'peek';
        const restingWidth = vertical ? 96 : 3;
        const restingHeight = vertical ? 3 : 96;

        return {
            width: expanded ? width : peeking ? collapsedWidth : restingWidth,
            height: expanded ? height : peeking ? collapsedHeight : restingHeight,
            x: vertical ? 0 : options.offset,
            y: vertical ? options.offset : 0
        };
    });
    const frameTransition = $derived.by(() => {
        const swipeReturn = { duration: context.open || instant ? 0 : 0.16 };

        return {
            ...spring,
            x: swipeReturn,
            y: swipeReturn
        };
    });
    const contentTarget = $derived({
        opacity: expanded ? 1 : 0,
        filter: expanded ? 'blur(0px)' : 'blur(1.5px)'
    });
    const contentTransition = $derived({
        duration: instant ? 0 : context.open ? 0.14 : 0.07,
        delay: instant || !context.open ? 0 : 0.02
    });

    function readInset() {
        if (!options.surface) {
            return;
        }
        const edge = context.side === 'left' ? 'right' : 'left';
        inset = Number.parseFloat(getComputedStyle(options.surface)[edge]) || 0;
    }

    function measure() {
        readInset();
        if (!options.body) {
            return;
        }
        width = options.body.offsetWidth;
        height = options.body.offsetHeight;
    }

    function finishExit() {
        if (context.open || !options.host) {
            return;
        }
        options.cancelSwipe();
        if (context.mode === 'peek') {
            return;
        }
        closePopover(options.host);
        presented = false;
    }

    /** Tracks the frame's size and the theme's motion speed. Call once the host has mounted. */
    function observe(host: HTMLElement, body: HTMLElement) {
        const unregister = context.register(host);
        let frame = 0;

        function updateMotion() {
            duration = getCssDuration(host, '--motion-duration-panel', 260);
            readInset();
        }

        const resize = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                measure();
                drawnWidth = host.clientWidth;
                drawnHeight = host.clientHeight;
                context.width = drawnWidth;
                context.height = drawnHeight;
            });
        });
        updateMotion();
        resize.observe(body);
        resize.observe(host);
        const stopThemeChanges = observeThemeChanges(host.parentElement, updateMotion);
        ready = true;

        return () => {
            cancelAnimationFrame(frame);
            unregister();
            resize.disconnect();
            stopThemeChanges();
        };
    }

    /** Shows the frame when it opens or peeks, and retires it at once when motion is off. */
    function sync() {
        const host = options.host;
        if (!ready || !host) {
            return;
        }
        if (context.open || context.mode === 'peek') {
            if (!presented && document.activeElement instanceof HTMLElement) {
                context.returnFocus = document.activeElement;
            }
            host.hidden = false;
            openPopover(host);
            measure();
            presented = true;
        } else if (instant) {
            finishExit();
        }
        if (!context.open) {
            options.cancelSwipe();
        }
    }

    return {
        get presented() {
            return presented;
        },
        get vertical() {
            return vertical;
        },
        get drawnWidth() {
            return drawnWidth;
        },
        get drawnHeight() {
            return drawnHeight;
        },
        get insets() {
            return insets;
        },
        get outline() {
            return outline;
        },
        get interior() {
            return interior;
        },
        get frameTarget() {
            return frameTarget;
        },
        get frameTransition() {
            return frameTransition;
        },
        get contentTarget() {
            return contentTarget;
        },
        get contentTransition() {
            return contentTransition;
        },
        finishExit,
        observe,
        sync
    };
}
