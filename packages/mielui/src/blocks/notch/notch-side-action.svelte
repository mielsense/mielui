<script lang="ts">
    import { motion, useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import { overlaySurface } from '../../components/_internal/surface';
    import { Button } from '../../components/button';
    import type { NotchSideActionProps } from '.';
    import { notchContext } from './context';

    let {
        side = 'end',
        children,
        class: className,
        size = 'icon',
        variant = 'panel',
        element = $bindable(),
        ...rest
    }: NotchSideActionProps = $props();
    const context = notchContext.get();
    const reduced = useReducedMotion();
    let host = $state<HTMLElement | null>(null);
    let ready = $state(false);
    let shown = $state(false);
    let revealed = $state(false);
    let duration = $state(0);
    let easing = $state<[number, number, number, number]>([0.23, 1, 0.32, 1]);
    const unfoldTransition = $derived({
        duration: reduced.current ? 0 : duration,
        ease: easing
    });
    let actionWidth = $state(32);
    let actionHeight = $state(32);
    let gap = $state(4);
    const horizontal = $derived(context.side === 'top' || context.side === 'bottom');
    const position = $derived(
        horizontal
            ? `${context.side}:0;left:50%;translate:-50% 0;`
            : `${context.side}:0;top:50%;translate:0 -50%;`
    );
    const direction = $derived(side === 'start' ? -1 : 1);
    const edgeDirection = $derived(context.side === 'top' || context.side === 'left' ? 1 : -1);
    const placement = $derived.by(() => {
        const span = horizontal ? context.width : context.height;
        const actionSpan = horizontal ? actionWidth : actionHeight;
        const along = direction * (span / 2 - 12 + actionSpan / 2 + gap * 2);
        const outward = edgeDirection * gap * 2;
        return horizontal ? { x: along, y: outward } : { x: outward, y: along };
    });
    const arcRotation = $derived(
        context.side === 'top'
            ? side === 'start'
                ? 270
                : 180
            : context.side === 'bottom'
              ? side === 'start'
                  ? 0
                  : 90
              : context.side === 'left'
                ? side === 'start'
                    ? 90
                    : 180
                : side === 'start'
                  ? 0
                  : 270
    );

    function updateMotion() {
        const node = host;
        if (!node) {
            return;
        }
        duration = getCssDuration(node, '--motion-duration-panel', 180) / 1000;
        const style = getComputedStyle(node);
        const curve = style.getPropertyValue('--ease-out').match(/cubic-bezier\(([^)]+)\)/);
        const points = curve?.[1].split(',').map(Number);
        if (points?.length === 4 && points.every(Number.isFinite)) {
            easing = [points[0], points[1], points[2], points[3]];
        }
        const spacingToken = style.getPropertyValue('--spacing').trim();
        const spacing = Number.parseFloat(spacingToken);
        const rootSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
        gap = Number.isFinite(spacing)
            ? spacing * (spacingToken.endsWith('rem') ? rootSize : 1)
            : 4;
        actionWidth = node.offsetWidth;
        actionHeight = node.offsetHeight;
    }

    $effect(() => {
        context.side;
        updateMotion();
    });

    onMount(() => {
        if (!host) {
            return;
        }
        const node = host;
        const unregister = context.register(node, true);

        updateMotion();
        const resize = new ResizeObserver(updateMotion);
        resize.observe(node);
        const observer = new MutationObserver(updateMotion);
        for (let ancestor = node.parentElement; ancestor; ancestor = ancestor.parentElement) {
            observer.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
        }
        ready = true;
        return () => {
            if (node.contains(document.activeElement)) {
                context.returnFocus?.focus({ preventScroll: true });
            }
            unregister();
            resize.disconnect();
            observer.disconnect();
        };
    });

    $effect(() => {
        if (!context.open) {
            revealed = false;
            return;
        }
        if (context.hovered || context.focused) {
            revealed = true;
            return;
        }
        const timer = setTimeout(() => {
            revealed = false;
        }, 160);
        return () => {
            clearTimeout(timer);
        };
    });

    function finishExit() {
        if (!context.open && host) {
            if (typeof host.hidePopover === 'function' && host.matches(':popover-open')) {
                host.hidePopover();
            }
            shown = false;
        }
    }
    $effect(() => {
        if (!ready || !host) {
            return;
        }
        if (context.open) {
            host.hidden = false;
            if (typeof host.showPopover === 'function' && !host.matches(':popover-open')) {
                host.showPopover();
            }
            shown = true;
        } else if (reduced.current || duration === 0) {
            finishExit();
        }
    });

    function focusIn(event: FocusEvent) {
        if (event.relatedTarget instanceof HTMLElement && !context.contains(event.relatedTarget)) {
            context.returnFocus = event.relatedTarget;
        }
        context.focused = true;
    }
    function focusOut() {
        queueMicrotask(() => {
            context.focused = context.contains(document.activeElement);
            if (context.mode === 'peek' && !context.focused && !context.hovered) {
                context.open = false;
            }
        });
    }
    function pointerEnter() {
        context.cancelCollapse();
        context.hovered = true;
    }
    function pointerLeave() {
        context.hovered = false;
        if (context.mode === 'peek' && !context.focused) {
            context.scheduleCollapse();
        }
    }
    function keydown(event: KeyboardEvent) {
        if (event.key === 'Escape' && !event.defaultPrevented) {
            event.preventDefault();
            context.open = false;
        }
    }
</script>

<motion.div
    bind:ref={host}
    popover="manual"
    role="group"
    data-ui="notch-side-action"
    data-side={side}
    hidden={!shown}
    inert={!context.open}
    aria-hidden={!context.open}
    initial={false}
    animate={{
        opacity: context.open ? 1 : 0,
        scale: 1,
        x: placement.x,
        y: placement.y
    }}
    transition={{ duration: reduced.current ? 0 : Math.min(duration, 0.16) }}
    onAnimationComplete={finishExit}
    onfocusin={focusIn}
    onfocusout={focusOut}
    onpointerenter={pointerEnter}
    onpointerleave={pointerLeave}
    onkeydown={keydown}
    class="fixed m-0 overflow-visible border-0 bg-transparent p-0 text-foreground [inset:auto]"
    style={`${position}transform-origin:${context.side === 'top' ? 'center top' : context.side === 'bottom' ? 'center bottom' : context.side === 'left' ? 'left center' : 'right center'};`}
>
    <motion.svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        class="pointer-events-none absolute inset-0 size-full overflow-visible"
        initial={false}
        animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 0.92 : 1 }}
        transition={unfoldTransition}
    >
        <g transform={`rotate(${arcRotation} 20 20)`}>
            <circle
                cx="20"
                cy="20"
                r="15"
                pathLength="100"
                stroke-dasharray="25 75"
                fill="none"
                stroke="var(--color-border)"
                stroke-width="6"
                stroke-linecap="round"
            />
            <circle
                cx="20"
                cy="20"
                r="15"
                pathLength="100"
                stroke-dasharray="25 75"
                fill="none"
                stroke="var(--color-card)"
                stroke-width="4"
                stroke-linecap="round"
            />
        </g>
    </motion.svg>
    <motion.div
        initial={false}
        animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.86 }}
        transition={unfoldTransition}
        class="origin-center"
    >
        <Button
            {...rest}
            bind:element
            {size}
            {variant}
            class={cn(className, variant === 'panel' ? overlaySurface(context.surface) : undefined, 'rounded-full')}
        >
            <span class="inline-flex items-center justify-center">
                {@render children?.()}
            </span>
        </Button>
    </motion.div>
</motion.div>
