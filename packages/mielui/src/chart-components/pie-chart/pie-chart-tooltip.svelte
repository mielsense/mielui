<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { cn } from '@mielui/svelte/utils';
    import { getPieContext } from './context';
    import type { PieChartTooltipProps } from './index';

    let { children, class: className, ...rest }: PieChartTooltipProps = $props();
    const context = getPieContext();
    let element = $state<HTMLDivElement>();
    let left = $state(0);
    let top = $state(0);
    let positioned = $state(false);
    $effect(() => {
        const anchor = context.anchor;
        const pointer = context.pointer;
        const root = context.element;
        void context.active;
        if (!element || !anchor || !root) {
            return;
        }
        const node = element;
        const anchorElement = anchor;
        const rootElement = root;
        function position() {
            const target = anchorElement.getBoundingClientRect();
            const parent = rootElement.getBoundingClientRect();
            const box = node.getBoundingClientRect();
            const x = pointer?.x ?? target.left + target.width / 2;
            const y = pointer?.y ?? target.top;
            const maximum = Math.max(8, window.innerWidth - box.width - 8);
            const screenLeft = Math.max(8, Math.min(x - box.width / 2, maximum));
            const above = y - box.height - 12;
            const screenTop =
                above >= 8
                    ? above
                    : Math.min(
                          window.innerHeight - box.height - 8,
                          (pointer?.y ?? target.bottom) + 12
                      );
            left = screenLeft - parent.left;
            top = Math.max(8, screenTop) - parent.top;
            positioned = true;
        }
        position();
        const observer = new ResizeObserver(position);
        observer.observe(node);
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
    <div
        bind:this={element}
        style:left={`${left}px`}
        style:top={`${top}px`}
        style:visibility={positioned ? "visible" : "hidden"}
        style:transition-duration={context.motion ? `${100 * context.durationScale}ms` : "0ms"}
        data-ui="pie-chart-tooltip"
        role="status"
        class={cn(className, 'mielui-inset-frame pointer-events-none absolute z-10 max-w-[min(calc(var(--spacing)*80),calc(100vw-var(--spacing)*4))] transition-[left,top] ease-out text-sm shadow-[var(--elevation-float)]')}
        {...rest}
    >
        <div
            class="mielui-inset-surface flex items-center gap-3 break-words border border-border/60 bg-card px-3 py-2"
        >
            {#if children}
                {@render children({ item, label: context.label(item.key), value: context.format(item), percentage: context.total ? item.value / context.total * 100 : 0 })}
            {:else}
                <span
                    class="size-2 shrink-0 rounded-full"
                    style:background={context.color(item.key)}
                ></span>
                <span class="text-foreground-muted">{context.label(item.key)}</span>
                <span
                    class="font-medium tabular-nums"
                    use:numberShuffle={{ value: item.value, format: (value) => context.format({ ...item, value }) }}
                >
                    {context.format(item)}
                </span>
            {/if}
        </div>
    </div>
{/if}
