<script lang="ts">
    import { motion, useReducedMotion } from '@humanspeak/svelte-motion';
    import { cn } from '@mielui/svelte/utils';
    import { onMount, tick } from 'svelte';
    import { overlaySurface } from '../../components/_internal/surface';
    import type { NotchContentProps } from '.';
    import { getNotchContext } from './context';
    import { createNotchFrame } from './frame.svelte';
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
    const context = getNotchContext();
    const reduced = useReducedMotion();
    const uid = $props.id();
    let host = $state<HTMLElement | null>(null);
    let body = $state<HTMLDivElement>();
    let surface = $state<HTMLDivElement>();
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
    const frame = createNotchFrame({
        context,
        get reduced() {
            return reduced.current;
        },
        get offset() {
            return swipe.offset;
        },
        get host() {
            return host;
        },
        get body() {
            return body;
        },
        get surface() {
            return surface;
        },
        cancelSwipe: swipe.cancel
    });
    const vertical = $derived(frame.vertical);

    onMount(() => {
        if (host && body) {
            return frame.observe(host, body);
        }
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
        frame.sync();
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
            <path d={frame.outline.path} transform={frame.outline.transform} />
        </clipPath>
        <clipPath id={`${uid}-inner`} clipPathUnits="userSpaceOnUse">
            <path d={frame.interior.path} transform={frame.interior.transform} />
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
    hidden={!frame.presented}
    initial={false}
    animate={frame.frameTarget}
    transition={frame.frameTransition}
    onAnimationComplete={frame.finishExit}
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
    class={cn(
        overlaySurface(context.surface),
        'fixed m-0 overflow-hidden border-0 [--mielui-modal-inset:calc(var(--spacing)*var(--mielui-border-inset-scale,1))] bg-card p-0 text-foreground [inset:auto] [clip-path:var(--notch-clip)]',
        context.side === 'top' && 'top-0 left-1/2 -translate-x-1/2',
        context.side === 'bottom' && 'bottom-0 left-1/2 -translate-x-1/2',
        context.side === 'left' && 'left-0 top-1/2 -translate-y-1/2',
        context.side === 'right' && 'right-0 top-1/2 -translate-y-1/2'
    )}
    style={`--notch-clip:url(#${uid});${style ?? ''}`}
>
    <div
        aria-hidden="true"
        data-ui="notch-surface"
        bind:this={surface}
        class={cn(
            context.side === 'top' && 'top-0',
            context.side === 'right' && 'right-0',
            context.side === 'bottom' && 'bottom-0',
            context.side === 'left' && 'left-0',
            'mielui-inset-surface pointer-events-none absolute inset-[var(--mielui-modal-inset)] rounded-none [clip-path:var(--notch-inner-clip)] [@container_style(--mielui-border-inset-scale:0)]:inset-0! [@container_style(--mielui-border-inset-scale:0)]:[clip-path:none]'
        )}
        style={`--notch-inner-clip:url(#${uid}-inner)`}
    ></div>
    {#if context.mode === 'peek'}
        <button
            type="button"
            aria-label={context.labels?.expand ?? 'Expand notification'}
            aria-expanded={context.open}
            tabindex={context.open ? -1 : 0}
            inert={context.open}
            class={cn(
                'absolute inset-0 z-10 flex items-center justify-center text-xs text-foreground-muted outline-none focus-visible:shadow-[var(--focus-ring)]',
                vertical ? 'px-4' : 'px-0',
                context.open && 'pointer-events-none opacity-0'
            )}
            onclick={expand}
            onfocus={focusExpanded}
        >
            {#if context.peek}
                {@render context.peek()}
            {:else}
                <span
                    aria-hidden="true"
                    class={cn(
                        'rounded-full bg-[var(--color-border-strong)]',
                        vertical ? 'h-1 w-10' : 'h-28 w-1'
                    )}
                ></span>
            {/if}
        </button>
    {/if}
    <motion.div
        inert={!context.open}
        aria-hidden={!context.open}
        class="relative w-[calc(100vw-var(--spacing)*8)]"
        initial={false}
        animate={frame.contentTarget}
        transition={frame.contentTransition}
    >
        <div
            bind:this={body}
            data-ui="notch-body"
            style:max-width={vertical && context.actionCount > 0
                ? 'calc(100vw - var(--spacing)*28)'
                : undefined}
            style:max-height={!vertical && context.actionCount > 0
                ? 'calc(100dvh - var(--spacing)*28)'
                : undefined}
            class={cn(
                className,
                'relative flex max-w-[calc(100vw-var(--spacing)*8)] max-h-[calc(100dvh-var(--spacing)*8)] flex-col gap-3 overflow-y-auto [&>*]:shrink-0',
                vertical ? 'w-80 px-10 py-5' : 'w-28 min-h-56 px-5 py-10'
            )}
        >
            {@render children?.()}
        </div>
    </motion.div>
    <svg
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 size-full overflow-visible"
        viewBox={`0 0 ${Math.max(1, frame.drawnWidth)} ${Math.max(1, frame.drawnHeight)}`}
        preserveAspectRatio="none"
    >
        <path
            d={frame.outline.path}
            transform={frame.outline.transform}
            fill="none"
            stroke="var(--color-border)"
            stroke-width="var(--border-size)"
            vector-effect="non-scaling-stroke"
        />
        <g
            transform={`translate(${frame.insets.left} ${frame.insets.top})`}
            class="opacity-[var(--mielui-border-inset-scale,1)]"
        >
            <path
                d={frame.interior.path}
                transform={frame.interior.transform}
                fill="none"
                stroke="var(--color-border)"
                stroke-width="var(--border-size)"
                vector-effect="non-scaling-stroke"
            />
        </g>
    </svg>
</motion.div>
