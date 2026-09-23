<script lang="ts">
    import { onDestroy, type Snippet } from 'svelte';
    import type { NotchProps } from '.';
    import { notchContext } from './context';

    let {
        open = $bindable(false),
        side = 'top',
        surface,
        mode = 'triggered',
        duration = 5000,
        children
    }: NotchProps = $props();
    let hovered = $state(false);
    let focused = $state(false);
    let collapseTimer: ReturnType<typeof setTimeout> | undefined;
    onDestroy(() => {
        clearTimeout(collapseTimer);
    });
    let actionCount = $state(0);
    let width = $state(0);
    let height = $state(0);
    let returnFocus: HTMLElement | undefined;
    const regions = new Set<HTMLElement>();
    let peek = $state<Snippet>();
    let remaining = 0;
    let wasOpen = false;
    let previousDuration = -1;
    let previousMode: NotchProps['mode'];
    notchContext.set({
        scheduleCollapse() {
            clearTimeout(collapseTimer);
            if (actionCount === 0) {
                if (mode === 'peek' && !hovered && !focused) {
                    open = false;
                }
                return;
            }
            collapseTimer = setTimeout(() => {
                if (mode === 'peek' && !hovered && !focused) {
                    open = false;
                }
            }, 120);
        },
        cancelCollapse() {
            clearTimeout(collapseTimer);
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
        get actionCount() {
            return actionCount;
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
                focused =
                    typeof document !== 'undefined' &&
                    [...regions].some((region) => region.contains(document.activeElement));
            };
        },
        contains(element) {
            return element !== null && [...regions].some((region) => region.contains(element));
        },
        get open() {
            return open;
        },
        set open(value) {
            open = value;
        },
        get side() {
            return side;
        },
        get surface() {
            return surface;
        },
        get mode() {
            return mode;
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
        }
    });
    $effect(() => {
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
        if (
            !open ||
            mode !== 'triggered' ||
            !Number.isFinite(duration) ||
            duration <= 0 ||
            hovered ||
            focused
        ) {
            return;
        }
        const started = performance.now();
        const timer = setTimeout(
            () => {
                open = false;
            },
            Math.min(remaining, 2147483647)
        );
        return () => {
            clearTimeout(timer);
            remaining = Math.max(0, remaining - (performance.now() - started));
        };
    });
</script>

{@render children?.()}
