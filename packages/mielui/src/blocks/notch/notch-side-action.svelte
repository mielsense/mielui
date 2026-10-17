<script lang="ts">
    import { motion, useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import { overlaySurface } from '../../components/_internal/surface';
    import { observeThemeChanges } from '../../components/_internal/theme-changes';
    import { Button } from '../../components/button';
    import type { NotchSideActionProps } from '.';
    import {
        closePopover,
        getNotchContext,
        notchSatelliteHandlers,
        openPopover,
        spacingInPixels
    } from './context';
    import { sideActionArc, sideActionOrigin } from './shape';

    let {
        side = 'end',
        children,
        class: className,
        size = 'icon',
        variant = 'panel',
        element = $bindable(),
        ...rest
    }: NotchSideActionProps = $props();
    const context = getNotchContext();
    const handlers = notchSatelliteHandlers(context);
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
    const origin = $derived(sideActionOrigin[context.side]);
    const direction = $derived(side === 'start' ? -1 : 1);
    const edgeDirection = $derived(context.side === 'top' || context.side === 'left' ? 1 : -1);
    const placement = $derived.by(() => {
        const span = horizontal ? context.width : context.height;
        const actionSpan = horizontal ? actionWidth : actionHeight;
        const along = direction * (span / 2 - 12 + actionSpan / 2 + gap * 2);
        const outward = edgeDirection * gap * 2;
        return horizontal ? { x: along, y: outward } : { x: outward, y: along };
    });
    const arcRotation = $derived(sideActionArc[context.side][side]);

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
        gap = spacingInPixels(node, 4);
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
        const stopThemeChanges = observeThemeChanges(node.parentElement, updateMotion);
        ready = true;
        return () => {
            if (node.contains(document.activeElement)) {
                context.returnFocus?.focus({ preventScroll: true });
            }
            unregister();
            resize.disconnect();
            stopThemeChanges();
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
            closePopover(host);
            shown = false;
        }
    }
    $effect(() => {
        if (!ready || !host) {
            return;
        }
        if (context.open) {
            host.hidden = false;
            openPopover(host);
            shown = true;
        } else if (reduced.current || duration === 0) {
            finishExit();
        }
    });
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
    onfocusin={handlers.focusin}
    onfocusout={handlers.focusout}
    onpointerenter={handlers.pointerenter}
    onpointerleave={handlers.pointerleave}
    onkeydown={handlers.keydown}
    class="fixed m-0 overflow-visible border-0 bg-transparent p-0 text-foreground [inset:auto]"
    style={`${position}transform-origin:${origin};`}
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
            class={cn(
                className,
                variant === 'panel' ? overlaySurface(context.surface) : undefined,
                'rounded-[var(--radius-control)]'
            )}
        >
            <span class="inline-flex items-center justify-center"> {@render children?.()} </span>
        </Button>
    </motion.div>
</motion.div>
