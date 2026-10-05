<script lang="ts">
    import { getCssDuration } from '@mielui/svelte/transition';
    import { onMount, untrack } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import type { HTMLAttributes } from 'svelte/elements';
    import { prefersReducedMotion, Tween } from 'svelte/motion';
    import ChartTooltipSurface from '../../components/_internal/chart-tooltip-surface.svelte';
    import { useHeatmap } from './context.svelte';

    let { children, class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props();
    const context = useHeatmap();
    const gap = 8;
    let element = $state<HTMLDivElement>();
    let width = $state(0);
    let height = $state(0);
    let target = $state<HTMLButtonElement>();
    let placed = $state(false);
    const anchor = $derived(context.hoveredElement ?? context.focusedElement);
    const day = $derived(context.model.cells.find((cell) => cell.date === target?.dataset.date));
    const position = new Tween(
        {
            x: 0,
            y: 0
        },
        {
            easing: cubicOut
        }
    );

    onMount(() => {
        context.tooltipCount += 1;
        return () => {
            context.tooltipCount -= 1;
        };
    });

    $effect(() => {
        const next = anchor;
        if (next) {
            target = next;
            return;
        }
        const timer = setTimeout(() => {
            target = undefined;
            placed = false;
        }, 80);
        return () => {
            clearTimeout(timer);
        };
    });

    function place() {
        const cell = target;
        const node = element;
        const parent = node?.offsetParent;
        if (!cell || !node || !width || !height || !(parent instanceof HTMLElement)) {
            return;
        }
        const bounds = parent.getBoundingClientRect();
        const rect = cell.getBoundingClientRect();
        const originX = bounds.left + parent.clientLeft - parent.scrollLeft;
        const originY = bounds.top + parent.clientTop - parent.scrollTop;
        const centered = rect.left + rect.width / 2 - originX - width / 2;
        const above = rect.top - originY - height - gap;
        const below = rect.bottom - originY + gap;
        const destination = {
            x: Math.max(
                parent.scrollLeft,
                Math.min(centered, parent.scrollLeft + parent.clientWidth - width)
            ),
            y: above >= 0 ? above : below
        };
        const moving = untrack(() => placed);
        void position.set(destination, {
            duration:
                moving && !prefersReducedMotion.current
                    ? getCssDuration(node, '--motion-duration-panel', 0)
                    : 0
        });
        placed = true;
    }

    $effect(() => {
        void width;
        void height;
        place();
    });

    $effect(() => {
        if (!target) {
            return;
        }
        function dismiss(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                target = undefined;
                placed = false;
            }
        }

        window.addEventListener('resize', place);
        window.addEventListener('scroll', place, true);
        window.addEventListener('keydown', dismiss);
        return () => {
            window.removeEventListener('resize', place);
            window.removeEventListener('scroll', place, true);
            window.removeEventListener('keydown', dismiss);
        };
    });
</script>

{#if target && day}
    <ChartTooltipSurface
        {...props}
        bind:ref={element}
        bind:width
        bind:height
        aria-hidden="true"
        style={`${props.style ?? ''}; left: ${position.current.x}px; top: ${position.current.y}px; visibility: ${placed ? 'visible' : 'hidden'}`}
        data-ui="heatmap-tooltip"
        class={className}
    >
        {#if children}
            {@render children()}
        {:else}
            <div class="mb-2 font-medium">
                {new Intl.DateTimeFormat(context.locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${day.date}T00:00:00Z`))}
            </div>
            <div class="flex items-center gap-2">
                <span class="size-2 rounded-full bg-[var(--chart-1)]"></span>
                <span class="flex-1 text-foreground-muted">
                    {context.labels?.tooltipValue ?? 'Contributions'}
                </span>
                <span class="ml-4 font-medium tabular-nums">
                    {new Intl.NumberFormat(context.locale).format(day.count)}
                </span>
            </div>
        {/if}
    </ChartTooltipSurface>
{/if}
