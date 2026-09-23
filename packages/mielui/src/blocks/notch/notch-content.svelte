<script lang="ts">
    import { motion, useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { onMount, tick } from 'svelte';
    import { overlaySurface } from '../../components/_internal/surface';
    import type { NotchContentProps } from '.';
    import { notchContext } from './context';
    import { notchShape } from './shape';
    import { createNotchSwipe } from './swipe.svelte';

    type PointerInput = PointerEvent & { currentTarget: EventTarget & HTMLDivElement };
    type FocusInput = FocusEvent & { currentTarget: EventTarget & HTMLDivElement };

    let {
        children,
        class: className,
        style,
        onkeydown,
        tabindex = -1,
        role = 'region',
        onpointerenter,
        onpointerleave,
        onpointerdown,
        onpointermove,
        onpointerup,
        onpointercancel,
        onlostpointercapture,
        onfocusin,
        onfocusout,
        ...rest
    }: NotchContentProps = $props();
    const context = notchContext.get();
    const reduced = useReducedMotion();
    const uid = $props.id();
    let host = $state<HTMLElement | null>(null);
    let body = $state<HTMLDivElement>();
    let ready = $state(false);
    let presented = $state(false);
    let width = $state(0);
    let height = $state(0);
    let drawnWidth = $state(320);
    let drawnHeight = $state(120);
    let duration = $state(0);
    const swipe = createNotchSwipe({
        get open() {
            return context.open;
        },
        get side() {
            return context.side;
        },
        get element() {
            return host;
        },
        dismiss() {
            context.open = false;
        }
    });
    const vertical = $derived(context.side === 'top' || context.side === 'bottom');
    const collapsedWidth = $derived(context.peek ? (vertical ? 160 : 44) : vertical ? 96 : 16);
    const collapsedHeight = $derived(context.peek ? (vertical ? 36 : 192) : vertical ? 16 : 192);
    const instant = $derived(reduced.current || duration === 0);
    const transition = $derived(
        instant
            ? { duration: 0 }
            : {
                  type: 'spring' as const,
                  visualDuration: Math.max(0.12, (duration / 260) * (context.open ? 0.34 : 0.28)),
                  bounce: 0.04
              }
    );
    const outline = $derived(notchShape(drawnWidth, drawnHeight, context.side));
    const inset = 4;
    const insetTop = $derived(context.side === 'top' ? 0 : inset);
    const insetRight = $derived(context.side === 'right' ? 0 : inset);
    const insetBottom = $derived(context.side === 'bottom' ? 0 : inset);
    const insetLeft = $derived(context.side === 'left' ? 0 : inset);
    const interior = $derived(
        notchShape(
            Math.max(1, drawnWidth - insetLeft - insetRight),
            Math.max(1, drawnHeight - insetTop - insetBottom),
            context.side
        )
    );

    const frameTarget = $derived({
        width:
            context.open && presented
                ? width
                : context.mode === 'peek'
                  ? collapsedWidth
                  : vertical
                    ? 96
                    : 3,
        height:
            context.open && presented
                ? height
                : context.mode === 'peek'
                  ? collapsedHeight
                  : vertical
                    ? 3
                    : 96,
        x: vertical ? 0 : swipe.offset,
        y: vertical ? swipe.offset : 0
    });

    const frameTransition = $derived({
        ...transition,
        x: { duration: context.open || instant ? 0 : 0.16 },
        y: { duration: context.open || instant ? 0 : 0.16 }
    });

    const contentTarget = $derived({
        opacity: context.open && presented ? 1 : 0,
        filter: context.open && presented ? 'blur(0px)' : 'blur(1.5px)'
    });

    const contentTransition = $derived({
        duration: instant ? 0 : context.open ? 0.14 : 0.07,
        delay: instant || !context.open ? 0 : 0.02
    });

    function measure() {
        if (!body) {
            return;
        }
        width = body.offsetWidth;
        height = body.offsetHeight;
    }
    function finishExit() {
        if (!context.open && host) {
            swipe.cancel();
            if (context.mode === 'peek') {
                return;
            }
            if (typeof host.hidePopover === 'function' && host.matches(':popover-open')) {
                host.hidePopover();
            }
            presented = false;
        }
    }
    onMount(() => {
        if (!host || !body) {
            return;
        }
        const node = host;
        const unregister = context.register(node);
        function updateMotion() {
            duration = getCssDuration(node, '--motion-duration-panel', 260);
        }
        updateMotion();
        let frame = 0;
        const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                measure();
                drawnWidth = node.clientWidth;
                drawnHeight = node.clientHeight;
                context.width = drawnWidth;
                context.height = drawnHeight;
            });
        });
        observer.observe(body);
        observer.observe(node);
        const theme = new MutationObserver(updateMotion);
        for (let ancestor = node.parentElement; ancestor; ancestor = ancestor.parentElement) {
            theme.observe(ancestor, { attributes: true, attributeFilter: ['style', 'class'] });
        }
        ready = true;
        return () => {
            cancelAnimationFrame(frame);
            unregister();
            observer.disconnect();
            theme.disconnect();
        };
    });
    $effect.pre(() => {
        if (
            !context.open &&
            context.contains(document.activeElement) &&
            context.returnFocus?.isConnected
        ) {
            context.returnFocus.focus({ preventScroll: true });
        }
    });
    $effect(() => {
        if (!ready || !host) {
            return;
        }
        if (context.open || context.mode === 'peek') {
            if (!presented && document.activeElement instanceof HTMLElement) {
                context.returnFocus = document.activeElement;
            }
            host.hidden = false;
            if (typeof host.showPopover === 'function' && !host.matches(':popover-open')) {
                host.showPopover();
            }
            measure();
            presented = true;
        } else if (instant) {
            finishExit();
        }
        if (!context.open) {
            swipe.cancel();
        }
    });

    async function focusExpanded() {
        context.open = true;
        await tick();
        host?.focus({ preventScroll: true });
    }

    function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
        onkeydown?.(event);
        if (event.key === 'Escape' && !event.defaultPrevented) {
            event.preventDefault();
            context.open = false;
        }
    }
    function handlePointerEnter(event: PointerInput) {
        onpointerenter?.(event);
        context.cancelCollapse();
        context.hovered = true;
        if (context.mode === 'peek') {
            context.open = true;
        }
    }
    function handlePointerLeave(event: PointerInput) {
        onpointerleave?.(event);
        context.hovered = false;
        if (context.mode === 'peek' && !context.focused && !swipe.active) {
            context.scheduleCollapse();
        }
    }
    function handleFocusIn(event: FocusInput) {
        onfocusin?.(event);
        if (event.relatedTarget instanceof HTMLElement && !context.contains(event.relatedTarget)) {
            context.returnFocus = event.relatedTarget;
        }
        context.focused = true;
        if (context.mode === 'peek') {
            context.open = true;
        }
    }
    function handleFocusOut(event: FocusInput) {
        onfocusout?.(event);
        queueMicrotask(() => {
            context.focused = !!context.contains(document.activeElement);
            if (context.mode === 'peek' && !context.focused && !context.hovered) {
                context.open = false;
            }
        });
    }
    function handlePointerDown(event: PointerInput) {
        onpointerdown?.(event);
        if (event.pointerType === 'touch' && !event.defaultPrevented) {
            context.hovered = true;
            if (
                !(event.target instanceof Element) ||
                !event.target.closest(
                    'button, a, input, textarea, select, [contenteditable="true"]'
                )
            ) {
                host?.focus({ preventScroll: true });
            }
        }
        if (!event.defaultPrevented) {
            swipe.start(event);
        }
    }
    function handlePointerMove(event: PointerInput) {
        onpointermove?.(event);
        if (!event.defaultPrevented) {
            swipe.move(event);
        }
    }
    function handlePointerUp(event: PointerInput) {
        onpointerup?.(event);
        if (!event.defaultPrevented) {
            swipe.finish(event);
        }
    }
    function handlePointerCancel(event: PointerInput) {
        onpointercancel?.(event);
        swipe.cancel();
    }
    function handleLostPointerCapture(event: PointerInput) {
        onlostpointercapture?.(event);
        swipe.cancel();
    }
    function expand() {
        context.open = true;
    }
</script>

<svg width="0" height="0" aria-hidden="true" class="absolute pointer-events-none">
    <defs>
        <clipPath id={uid} clipPathUnits="userSpaceOnUse">
            <path d={outline.path} transform={outline.transform} />
        </clipPath>
        <clipPath id={`${uid}-inner`} clipPathUnits="userSpaceOnUse">
            <path d={interior.path} transform={interior.transform} />
        </clipPath>
    </defs>
</svg>
<motion.div
    {...rest}
    bind:ref={host}
    popover="manual"
    data-ui="notch-content"
    data-side={context.side}
    data-surface={context.surface}
    inert={!context.open && context.mode !== 'peek'}
    {tabindex}
    {role}
    hidden={!presented}
    initial={false}
    animate={frameTarget}
    transition={frameTransition}
    onAnimationComplete={finishExit}
    onkeydown={handleKeydown}
    onpointerenter={handlePointerEnter}
    onpointerleave={handlePointerLeave}
    onfocusin={handleFocusIn}
    onfocusout={handleFocusOut}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerCancel}
    onlostpointercapture={handleLostPointerCapture}
    class={cn(overlaySurface(context.surface), 'fixed m-0 overflow-hidden border-0 bg-[color-mix(in_oklab,var(--color-secondary)_97%,white)] dark:bg-[color-mix(in_oklab,var(--color-background)_97%,white)] p-0 text-foreground [inset:auto] [clip-path:var(--notch-clip)]',
        context.side === 'top' && 'top-0 left-1/2 -translate-x-1/2',
        context.side === 'bottom' && 'bottom-0 left-1/2 -translate-x-1/2',
        context.side === 'left' && 'left-0 top-1/2 -translate-y-1/2',
        context.side === 'right' && 'right-0 top-1/2 -translate-y-1/2')}
    style={`--notch-clip:url(#${uid});${style ?? ''}`}
>
    <div
        aria-hidden="true"
        data-ui="notch-surface"
        class="mielui-inset-surface pointer-events-none absolute rounded-none [clip-path:var(--notch-inner-clip)] [@container_style(--mielui-border-inset-scale:0)]:inset-0! [@container_style(--mielui-border-inset-scale:0)]:[clip-path:none]"
        style={`inset:${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px;--notch-inner-clip:url(#${uid}-inner)`}
    ></div>
    {#if context.mode === 'peek'}
        <button
            type="button"
            aria-label="Expand notification"
            aria-expanded={context.open}
            tabindex={context.open ? -1 : 0}
            inert={context.open}
            class={cn('absolute inset-0 z-10 flex items-center justify-center text-xs text-foreground-muted outline-none focus-visible:shadow-[var(--focus-ring)]', vertical ? 'px-4' : 'px-0', context.open && 'pointer-events-none opacity-0')}
            onclick={expand}
            onfocus={focusExpanded}
        >
            {#if context.peek}
                {@render context.peek()}
            {:else}
                <span
                    aria-hidden="true"
                    class={vertical ? 'h-1 w-10 rounded-full bg-foreground-muted/50' : 'h-28 w-1 rounded-full bg-foreground-muted/50'}
                ></span>
            {/if}
        </button>
    {/if}
    <motion.div
        inert={!context.open}
        aria-hidden={!context.open}
        class="relative w-[calc(100vw-var(--spacing)*8)]"
        initial={false}
        animate={contentTarget}
        transition={contentTransition}
    >
        <div
            bind:this={body}
            data-ui="notch-body"
            style:max-width={vertical && context.actionCount > 0 ? 'calc(100vw - var(--spacing)*28)' : undefined}
            style:max-height={!vertical && context.actionCount > 0 ? 'calc(100dvh - var(--spacing)*28)' : undefined}
            class={cn(className, 'relative flex max-w-[calc(100vw-var(--spacing)*8)] max-h-[calc(100dvh-var(--spacing)*8)] flex-col gap-3 overflow-y-auto [&>*]:shrink-0',
        vertical ? 'w-80 px-10 py-5' : 'w-28 min-h-56 px-5 py-10')}
        >
            {@render children?.()}
        </div>
    </motion.div>
    <svg
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 size-full overflow-visible"
        viewBox={`0 0 ${Math.max(1, drawnWidth)} ${Math.max(1, drawnHeight)}`}
        preserveAspectRatio="none"
    >
        <path
            d={outline.path}
            transform={outline.transform}
            fill="none"
            stroke="var(--color-border)"
            stroke-width="var(--border-size)"
            vector-effect="non-scaling-stroke"
        />
        <g
            transform={`translate(${insetLeft} ${insetTop})`}
            class="opacity-[var(--mielui-border-inset-scale,1)]"
        >
            <path
                d={interior.path}
                transform={interior.transform}
                fill="none"
                stroke="var(--color-border)"
                stroke-width="var(--border-size)"
                vector-effect="non-scaling-stroke"
            />
        </g>
    </svg>
</motion.div>
