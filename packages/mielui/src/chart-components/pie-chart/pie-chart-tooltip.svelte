<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import ChartTooltipSurface from '../../components/_internal/chart-tooltip-surface.svelte';
    import { getPieContext } from './context';
    import type { PieChartTooltipProps } from './index';

    let { children, class: className, ...rest }: PieChartTooltipProps = $props();
    const context = getPieContext();
    let element = $state<HTMLDivElement>();
    let left = $state(0);
    let top = $state(0);
    let positioned = $state(false);
    function clamp(value: number, minimum: number, maximum: number) {
        return Math.max(minimum, Math.min(value, Math.max(minimum, maximum)));
    }

    function position() {
        const anchor = context.anchor;
        const pointer = context.pointer;
        const root = context.element;
        if (!element || !anchor || !root) {
            return;
        }
        const gap = 14;
        const margin = 8;
        const target = anchor.getBoundingClientRect();
        const parent = root.getBoundingClientRect();
        const box = element.getBoundingClientRect();
        const plot = anchor.closest('svg')?.getBoundingClientRect();
        const segments = anchor.closest('[data-ui="pie-chart-segments"]')?.getBoundingClientRect();
        const x = pointer?.x ?? target.left + target.width / 2;
        const y = pointer?.y ?? (plot ? target.top + target.height / 2 : target.top);
        const minimumLeft = Math.max(margin, parent.left + margin);
        const maximumLeft = Math.min(window.innerWidth, parent.right) - box.width - margin;
        const minimumTop = margin;
        const maximumTop = window.innerHeight - box.height - margin;
        let screenLeft = x - box.width / 2;
        let screenTop = y - box.height - gap;
        if (plot && segments) {
            const centerX = plot.left + plot.width / 2;
            const centerY = plot.top + plot.height / 2;
            const distance = Math.hypot(x - centerX, y - centerY) || 1;
            const directionX = (x - centerX) / distance;
            const directionY = (y - centerY) / distance;
            const reach = Math.max(segments.width, segments.height) / 2 + gap;
            const edgeX = centerX + directionX * reach;
            const edgeY = centerY + directionY * reach;
            screenLeft = directionX >= 0 ? edgeX : edgeX - box.width;
            screenTop = directionY >= 0 ? edgeY : edgeY - box.height;
        } else if (screenTop < minimumTop) {
            screenTop = target.bottom + gap;
        }
        left = clamp(screenLeft, minimumLeft, maximumLeft) - parent.left;
        top = clamp(screenTop, minimumTop, maximumTop) - parent.top;
        positioned = true;
    }

    $effect(() => {
        position();
    });

    $effect(() => {
        const root = context.element;
        if (!element || !root) {
            return;
        }
        const observer = new ResizeObserver(position);
        observer.observe(element);
        observer.observe(root);
        window.addEventListener('resize', position);
        window.addEventListener('scroll', position, true);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', position);
            window.removeEventListener('scroll', position, true);
        };
    });
    const item = $derived(context.data.find((item) => item.key === context.active));
</script>

{#if item && !context.loading && context.total > 0}
    <ChartTooltipSurface
        {...rest}
        bind:ref={element}
        style={`${rest.style ?? ''}; left: ${left}px; top: ${top}px; visibility: ${positioned ? 'visible' : 'hidden'}`}
        data-ui="pie-chart-tooltip"
        role="status"
        class={className}
    >
        {#if children}
            {@render children({ item, label: context.label(item.key), value: context.format(item), percentage: context.total ? item.value / context.total * 100 : 0 })}
        {:else}
            <div class="flex items-center gap-2">
                <span
                    class="size-2 shrink-0 rounded-full"
                    style:background={context.color(item.key)}
                ></span>
                <span class="flex-1 text-foreground-muted">{context.label(item.key)}</span>
                <span
                    class="ml-4 font-medium tabular-nums"
                    use:numberShuffle={{ value: item.value, format: (value) => context.format({ ...item, value }) }}
                >
                    {context.format(item)}
                </span>
            </div>
        {/if}
    </ChartTooltipSurface>
{/if}
