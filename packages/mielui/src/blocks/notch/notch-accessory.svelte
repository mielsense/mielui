<script lang="ts">
    import { motion, useReducedMotion } from '@humanspeak/svelte-motion';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import type { NotchAccessoryProps } from '.';
    import { notchContext } from './context';

    let { children, class: className, ...rest }: NotchAccessoryProps = $props();
    const context = notchContext.get();
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
        const token = getComputedStyle(host).getPropertyValue('--spacing').trim();
        const spacing = Number.parseFloat(token);
        const rootSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
        gap = Number.isFinite(spacing) ? spacing * (token.endsWith('rem') ? rootSize : 1) * 2 : 8;
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
</script>

<motion.div
    bind:ref={host}
    popover="manual"
    data-ui="notch-accessory"
    hidden={!shown}
    inert={!context.open}
    aria-hidden={!context.open}
    initial={false}
    animate={{ opacity: context.open ? 1 : 0, x: horizontal ? 0 : offset, y: horizontal ? offset : 0 }}
    transition={{ duration: reduced.current ? 0 : Math.min(duration, 0.18) }}
    onAnimationComplete={finishExit}
    onfocusin={focusIn}
    onfocusout={focusOut}
    onpointerenter={() => {
        context.cancelCollapse();
        context.hovered = true;
    }}
    onpointerleave={() => {
        context.hovered = false;
        if (context.mode === 'peek' && !context.focused) {
            context.scheduleCollapse();
        }
    }}
    onkeydown={(event: KeyboardEvent) => {
        if (event.key === 'Escape' && !event.defaultPrevented) {
            event.preventDefault();
            context.open = false;
        }
    }}
    class="fixed m-0 max-w-[calc(100vw-var(--spacing)*4)] overflow-visible border-0 bg-transparent p-0 text-foreground [inset:auto]"
    style={position}
>
    <div {...rest} class={cn(className, 'flex items-center justify-center')}>
        {@render children?.()}
    </div>
</motion.div>
