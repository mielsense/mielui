<script lang="ts">
    import { untrack } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { Skeleton } from '../../components/skeleton';
    import { cn } from '../../utils';
    import type { Cell } from './calendar';
    import { useHeatmap } from './context.svelte';

    let {
        day,
        children,
        class: className,
        onkeydown,
        onclick,
        onfocus,
        onpointerenter,
        onpointerleave,
        onblur,
        ...props
    }: HTMLButtonAttributes & { day: Cell } = $props();

    const context = useHeatmap();
    let element = $state<HTMLButtonElement>();

    $effect(() => {
        if (!element || !context.ready) {
            return;
        }
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const themeDuration = getComputedStyle(element)
            .getPropertyValue('--motion-duration-panel')
            .trim();
        const parsedDuration = Number.parseFloat(themeDuration);
        const milliseconds = themeDuration.endsWith('ms')
            ? parsedDuration
            : themeDuration.endsWith('s')
              ? parsedDuration * 1000
              : parsedDuration;
        const motionScale = Number.isFinite(milliseconds) ? Math.max(0, milliseconds / 180) : 1;
        if (
            preference.matches ||
            context.animation === 'none' ||
            context.animation === 'live' ||
            motionScale === 0
        ) {
            return;
        }
        const rows = context.animation === 'rows';
        const delay = untrack(() => {
            if (rows) {
                return (day.row - 1) * 50;
            }
            return (day.column - 1) * Math.min(35, 360 / context.model.weeks);
        });
        const animation = element.animate(
            [
                { opacity: 0, transform: 'translateY(5px) scale(0.82)' },
                { opacity: 1, transform: 'translateY(0) scale(1)' }
            ],
            {
                duration: 360 * motionScale,
                delay: delay * motionScale,
                easing:
                    getComputedStyle(element).getPropertyValue('--ease-out').trim() || 'ease-out',
                fill: 'backwards'
            }
        );
        function cancel() {
            animation.cancel();
        }
        preference.addEventListener('change', cancel);
        return () => {
            cancel();
            preference.removeEventListener('change', cancel);
        };
    });

    const levels = [
        'bg-secondary',
        'bg-[color-mix(in_oklab,var(--chart-1)_25%,transparent)]',
        'bg-[color-mix(in_oklab,var(--chart-1)_45%,transparent)]',
        'bg-[color-mix(in_oklab,var(--chart-1)_70%,transparent)]',
        'bg-[var(--chart-1)]'
    ];
    function navigate(event: KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        onkeydown?.(event);
        if (event.defaultPrevented) {
            return;
        }
        const index = context.model.cells.findIndex((cell) => cell.date === day.date);
        const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
        let next = index;
        switch (event.key) {
            case 'ArrowLeft':
                next += rtl ? 7 : -7;
                break;
            case 'ArrowRight':
                next += rtl ? -7 : 7;
                break;
            case 'ArrowUp':
                next -= 1;
                break;
            case 'ArrowDown':
                next += 1;
                break;
            case 'Home':
                next = 0;
                break;
            case 'End':
                next = context.model.cells.length - 1;
                break;
            default:
                return;
        }
        event.preventDefault();
        const target = context.model.cells[next];
        if (!target) {
            return;
        }
        context.focus(target.date);
        event.currentTarget
            .closest('[data-ui="heatmap-grid"]')
            ?.querySelector<HTMLButtonElement>(`[data-date="${target.date}"]`)
            ?.focus();
    }
    function selectDay(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        onclick?.(event);
        if (!event.defaultPrevented) {
            context.select(day);
        }
    }

    function focusDay(event: FocusEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        onfocus?.(event);
        if (!event.defaultPrevented) {
            context.focus(day.date);
            context.focusedElement = event.currentTarget;
        }
    }

    function previewDay(event: PointerEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        onpointerenter?.(event);
        if (!event.defaultPrevented) {
            context.activate(day.date);
            context.hoveredElement = event.currentTarget;
        }
    }
</script>
{#if !context.ready}
    <div
        aria-hidden="true"
        data-ui="heatmap-cell-placeholder"
        class={cn(className, 'aspect-square min-h-2.5 min-w-2.5')}
        style:grid-column={day.column}
        style:grid-row={day.row}
    >
        <Skeleton
            variant={context.loading && context.animation !== 'none' ? 'shimmer' : 'default'}
            class="size-full rounded-[calc(var(--radius-sm)*0.375)]"
        />
    </div>
{:else}
    <button
        {...props}
        type="button"
        data-ui="heatmap-cell"
        bind:this={element}
        data-date={day.date}
        data-level={day.level}
        aria-label={day.label}
        title={context.tooltipCount ? undefined : day.label}
        tabindex={context.focused === day.date ? 0 : -1}
        class={cn(className, levels[day.level], 'aspect-square min-h-2.5 min-w-2.5 rounded-[calc(var(--radius-sm)*0.375)] outline-none ring-inset hover:ring-1 hover:ring-[var(--color-border-strong)] focus-visible:z-10 focus-visible:shadow-[var(--focus-ring)]')}
        style:grid-column={day.column}
        style:grid-row={day.row}
        onkeydown={navigate}
        onclick={selectDay}
        onfocus={focusDay}
        onpointerenter={previewDay}
        onpointerleave={(event) => {
            onpointerleave?.(event);
            if (context.hoveredElement === event.currentTarget) {
                context.hoveredElement = undefined;
            }
        }}
        onblur={(event) => {
            onblur?.(event);
            if (context.focusedElement === event.currentTarget) {
                context.focusedElement = undefined;
            }
        }}
    >
        {@render children?.()}
    </button>
{/if}
