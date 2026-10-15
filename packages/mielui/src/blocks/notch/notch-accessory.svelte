<script lang="ts">
    import { motion, useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import type { NotchAccessoryProps } from '.';
    import {
        closePopover,
        notchContext,
        notchSatelliteHandlers,
        openPopover,
        spacingInPixels
    } from './context';

    let { children, class: className, ...rest }: NotchAccessoryProps = $props();
    const context = notchContext.get();
    const handlers = notchSatelliteHandlers(context);
    const reduced = useReducedMotion();
    let host = $state<HTMLElement | null>(null);
    let ready = $state(false);
    let shown = $state(false);
    let duration = $state(0);
    let gap = $state(8);
    const horizontal = $derived(context.side === 'top' || context.side === 'bottom');
    const position = $derived(
        horizontal
            ? `${context.side}:0;left:50%;translate:-50% 0;`
            : `${context.side}:0;top:50%;translate:0 -50%;`
    );
    const offset = $derived(
        (context.side === 'top' || context.side === 'left' ? 1 : -1) *
            ((horizontal ? context.height : context.width) + gap)
    );

    function updateMotion() {
        if (!host) {
            return;
        }
        duration = getCssDuration(host, '--motion-duration-panel', 180) / 1000;
        gap = spacingInPixels(host, 4) * 2;
    }

    onMount(() => {
        if (!host) {
            return;
        }
        const node = host;
        const unregister = context.register(node);
        updateMotion();
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
            observer.disconnect();
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
    data-ui="notch-accessory"
    hidden={!shown}
    inert={!context.open}
    aria-hidden={!context.open}
    initial={false}
    animate={{
        opacity: context.open ? 1 : 0,
        x: horizontal ? 0 : offset,
        y: horizontal ? offset : 0
    }}
    transition={{ duration: reduced.current ? 0 : Math.min(duration, 0.18) }}
    onAnimationComplete={finishExit}
    onfocusin={handlers.focusin}
    onfocusout={handlers.focusout}
    onpointerenter={handlers.pointerenter}
    onpointerleave={handlers.pointerleave}
    onkeydown={handlers.keydown}
    class="fixed m-0 max-w-[calc(100vw-var(--spacing)*4)] overflow-visible border-0 bg-transparent p-0 text-foreground [inset:auto]"
    style={position}
>
    <div {...rest} class={cn(className, 'flex items-center justify-center')}>
        {@render children?.()}
    </div>
</motion.div>
