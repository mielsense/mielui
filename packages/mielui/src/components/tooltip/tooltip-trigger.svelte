<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { onDestroy, onMount } from 'svelte';
    import type { TooltipTriggerProps } from '.';
    import { getTooltipContext, getTooltipManager } from './manager-context';

    const manager = getTooltipManager();

    let { children, class: className, showOnClick = false }: TooltipTriggerProps = $props();

    const { tip, content, descriptionId } = getTooltipContext();

    let el = $state<HTMLElement>();
    onMount(() => {
        if (!el) {
            return;
        }
        const targets = new Set<HTMLElement>();
        function disconnect(target: HTMLElement) {
            const ids = (target.getAttribute('aria-describedby') ?? '')
                .split(/\s+/)
                .filter((id) => id && id !== descriptionId);
            if (ids.length) {
                target.setAttribute('aria-describedby', ids.join(' '));
            } else {
                target.removeAttribute('aria-describedby');
            }
        }
        function connect() {
            const current = new Set(
                el?.querySelectorAll<HTMLElement>(
                    'button, a[href], input, select, textarea, [tabindex]'
                ) ?? []
            );
            for (const target of targets) {
                if (!current.has(target)) {
                    disconnect(target);
                    targets.delete(target);
                }
            }
            for (const target of current) {
                const previous = target.getAttribute('aria-describedby') ?? '';
                const ids = new Set(previous.split(/\s+/).filter(Boolean));
                ids.add(descriptionId);
                const next = [...ids].join(' ');
                if (next !== previous) {
                    target.setAttribute('aria-describedby', next);
                }
                targets.add(target);
            }
        }
        connect();
        const observer = new MutationObserver(connect);
        observer.observe(el, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['aria-describedby', 'tabindex', 'href']
        });
        return () => {
            observer.disconnect();
            for (const target of targets) {
                disconnect(target);
            }
            targets.clear();
        };
    });

    function open(delay = tip.delay) {
        if (el) {
            manager.showTooltip(
                el,
                tip.text,
                tip.placement,
                delay,
                tip.className,
                content.rich ? content.node : undefined
            );
        }
    }
    function focusOpen(event: FocusEvent) {
        const keyboard = event.target instanceof Element && event.target.matches(':focus-visible');

        open(keyboard ? 0 : tip.delay);
    }
    function close() {
        manager.hideTooltip(el ?? null, tip.closeDelay);
    }
    function clickOpen() {
        if (showOnClick && el) {
            manager.flashTooltip(
                el,
                tip.text,
                tip.placement,
                1500,
                tip.className,
                content.rich ? content.node : undefined
            );
        }
    }

    $effect(() => {
        const text = tip.text;
        if (el && manager.isActiveTooltip(el)) {
            manager.updateTooltipText(el, text);
        }
    });

    $effect(() => {
        const bubbleClass = tip.className;
        if (el && manager.isActiveTooltip(el)) {
            manager.updateTooltipClass(el, bubbleClass);
        }
    });

    $effect(() => {
        content.revision;
        const source = content.rich ? content.node : undefined;
        if (el) {
            manager.updateTooltipContent(el, source);
        }
    });

    onDestroy(() => manager.hideTooltip(el ?? null, 0));
</script>

<span
    bind:this={el}
    role="presentation"
    onmouseenter={() => open()}
    onmouseleave={close}
    onfocusin={focusOpen}
    onfocusout={close}
    onclick={clickOpen}
    class={cn(className, 'inline-flex')}
>
    {@render children?.()}
</span>
