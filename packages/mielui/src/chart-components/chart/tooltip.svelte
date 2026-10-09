<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { springEase } from '@mielui/svelte/transition';
    import { getContext, type Snippet } from 'svelte';
    import { Tween } from 'svelte/motion';
    import ChartTooltipSurface from '../../components/_internal/chart-tooltip-surface.svelte';
    import type { ChartLabels } from '.';
    import { getChart } from './context.svelte';

    let {
        class: className,
        children
    }: {
        class?: string;
        children?: Snippet<
            [
                {
                    label: string;
                    values: {
                        key: string;
                        label: string;
                        value: number;
                        formatted: string;
                        color: string;
                    }[];
                }
            ]
        >;
    } = $props();
    const labels = getContext<(() => ChartLabels | undefined) | undefined>('chart-labels');
    const chart = getChart();
    const selected = $derived(
        chart.active === null ? null : chart.data[chart.active] ? chart.active : null
    );
    const values = $derived(
        selected === null
            ? []
            : chart.keys.flatMap((key) => {
                  const value = chart.data[selected]?.[key];
                  return typeof value === 'number' && Number.isFinite(value)
                      ? [
                            {
                                key,
                                label: chart.config[key].label,
                                value,
                                formatted: chart.format(key, value),
                                color: chart.color(key)
                            }
                        ]
                      : [];
              })
    );
    let width = $state(180);
    let height = $state(100);
    let bounds = $state({ width: 0, height: 0 });
    $effect(() => {
        const element = chart.element;
        if (!element) {
            return;
        }
        const update = () => {
            bounds = { width: element.clientWidth, height: element.clientHeight };
        };
        const observer = new ResizeObserver(update);
        observer.observe(element);
        update();
        return () => {
            observer.disconnect();
        };
    });
    const destination = $derived.by(() => {
        const anchor = chart.pointer ?? chart.anchor;
        const right = anchor.x + 14;
        const left = right + width <= bounds.width - 8 ? right : anchor.x - width - 14;
        const above = anchor.y - height - 14;
        const top = above >= 8 ? above : anchor.y + 14;
        return {
            x: Math.max(8, Math.min(left, bounds.width - width - 8)),
            y: Math.max(8, Math.min(top, bounds.height - height - 8))
        };
    });
    const followSpring = springEase(550, 40);
    const position = Tween.of(() => destination, {
        duration: () => (chart.motion && chart.animation !== 'none' ? 320 * chart.motionScale : 0),
        easing: followSpring
    });
    let tabStop = $state(0);
    const currentTabStop = $derived(Math.min(tabStop, chart.data.length - 1));

    function focusCategory(index: number) {
        tabStop = index;
        chart.pointer = null;
        chart.focused = index;
        chart.active = index;
    }

    function clearCategory() {
        chart.focused = null;
        chart.active = null;
    }

    function handleKeydown(
        event: KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement },
        index: number
    ) {
        if (event.key === 'Escape') {
            clearCategory();
            return;
        }
        const last = chart.data.length - 1;
        const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
        let next = index;
        switch (event.key) {
            case 'ArrowLeft':
                next += rtl ? 1 : -1;
                break;
            case 'ArrowRight':
                next += rtl ? -1 : 1;
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
                next = last;
                break;
            default:
                return;
        }
        event.preventDefault();
        const target = event.currentTarget.parentElement?.children[next];
        if (target instanceof HTMLButtonElement) {
            target.focus();
        }
    }
</script>
{#if !chart.loading && chart.data.length}
    <div
        role="group"
        aria-label={labels?.()?.categories ??
            'Chart categories. Use arrow keys to inspect values.'}
        class="sr-only focus-within:not-sr-only focus-within:mt-2 focus-within:flex focus-within:flex-wrap focus-within:gap-1"
    >
        {#each chart.data as _, index}
            <button
                type="button"
                tabindex={index === currentTabStop ? 0 : -1}
                class="rounded-[var(--radius-control)] px-2.5 py-1 text-xs tabular-nums text-foreground-muted focus-visible:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
                onfocus={() => focusCategory(index)}
                onblur={clearCategory}
                onkeydown={(event) => handleKeydown(event, index)}
                aria-label={labels?.()?.inspect?.(chart.label(index)) ??
                    `Inspect ${chart.label(index)}`}
            >
                {chart.label(index)}
            </button>
        {/each}
    </div>
{/if}
{#if selected !== null && !chart.loading}
    <ChartTooltipSurface
        bind:width
        bind:height
        style={`left: 0; top: 0; translate: ${position.current.x}px ${position.current.y}px`}
        data-ui="chart-tooltip"
        role="status"
        class={className}
    >
        {#if children}
            {@render children({ label: chart.label(selected), values })}
        {:else}
            <div class="mb-2 font-medium text-foreground">{chart.label(selected)}</div>
            <div class="grid gap-2">
                {#each values as item}
                    <div class="flex items-center gap-2">
                        <span
                            class="size-2 shrink-0 rounded-full"
                            style:background={item.color}
                        ></span>
                        <span class="flex-1 text-foreground-muted">{item.label}</span>
                        <span
                            class="ml-4 font-medium tabular-nums"
                            use:numberShuffle={{ value: item.value, format: (value) => chart.format(item.key, value) }}
                        >
                            {item.formatted}
                        </span>
                    </div>
                {/each}
            </div>
        {/if}
    </ChartTooltipSurface>
{/if}
