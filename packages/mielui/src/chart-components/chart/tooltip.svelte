<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';
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
    const position = Tween.of(() => destination, {
        duration: () => (chart.motion && chart.animation !== 'none' ? 100 * chart.motionScale : 0),
        easing: cubicOut
    });
    function focusCategory(index: number) {
        chart.pointer = null;
        chart.focused = index;
        chart.active = index;
    }

    function clearCategory() {
        chart.focused = null;
        chart.active = null;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            clearCategory();
        }
    }
</script>
{#if !chart.loading && chart.data.length}
    <div
        class="sr-only focus-within:not-sr-only focus-within:mt-2 focus-within:flex focus-within:flex-wrap focus-within:gap-1"
    >
        {#each chart.data as _, index}
            <button
                type="button"
                class="rounded-md px-2 py-1 text-xs outline-primary focus-visible:outline-2"
                onfocus={() => focusCategory(index)}
                onblur={clearCategory}
                onkeydown={handleKeydown}
                aria-label={`Inspect ${chart.label(index)}`}
            >
                {chart.label(index)}
            </button>
        {/each}
    </div>
{/if}
{#if selected !== null && !chart.loading}
    <div
        bind:clientWidth={width}
        bind:clientHeight={height}
        style:left={`${position.current.x}px`}
        style:top={`${position.current.y}px`}
        data-ui="chart-tooltip"
        role="status"
        class={cn(className, 'mielui-modal-frame pointer-events-none absolute z-10 min-w-40 max-w-[calc(100%-var(--spacing)*4)] break-words p-1 text-xs shadow-[var(--elevation-float)]')}
    >
        <div class="mielui-inset-surface p-3">
            {#if children}
                {@render children({ label: chart.label(selected), values })}
            {:else}
                <div class="mb-2 font-medium">{chart.label(selected)}</div>
                <div class="grid gap-2">
                    {#each values as item}
                        <div class="flex items-center gap-2">
                            <span class="size-2 rounded-full" style:background={item.color}></span>
                            <span class="flex-1 text-foreground-muted">{item.label}</span>
                            <span class="ml-4 font-medium tabular-nums">{item.formatted}</span>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}
