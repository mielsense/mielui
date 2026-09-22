<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getPieContext } from './context';
    import type { PieChartLegendProps } from './index';

    let { children, class: className, ...rest }: PieChartLegendProps = $props();
    const context = getPieContext();

    function activate(key: string, anchor?: EventTarget | null) {
        if (anchor instanceof Element) {
            context.anchor = anchor;
        }
        context.pointer = undefined;
        context.active = key;
    }

    function focusItem(key: string, event: FocusEvent) {
        context.focused = key;
        activate(key, event.currentTarget);
    }

    function selectItem(key: string) {
        context.active = key;
    }

    function clearFocus() {
        context.focused = undefined;
        context.active = undefined;
    }

    function leaveItem() {
        context.active = context.focused;
        context.pointer = undefined;
        if (context.focused) {
            context.anchor = document.activeElement ?? undefined;
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            context.active = undefined;
        }
    }
</script>

<ul
    data-ui="pie-chart-legend"
    class={cn(className, 'flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm')}
    {...rest}
>
    {#each context.data as item (item.key)}
        <li>
            <button
                type="button"
                aria-label={`${context.label(item.key)}: ${context.format(item)}`}
                class="flex items-center gap-2 rounded-[var(--radius-sm)] px-1 py-1 text-foreground-muted outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onfocus={(event) => focusItem(item.key, event)}
                onblur={clearFocus}
                onpointerenter={(event) => activate(item.key, event.currentTarget)}
                onpointerleave={leaveItem}
                onkeydown={handleKeydown}
                onclick={() => selectItem(item.key)}
            >
                {#if children}
                    {@render children({ item, label: context.label(item.key), value: context.format(item), percentage: context.total ? item.value / context.total * 100 : 0 })}
                {:else}
                    <span
                        class="size-2 shrink-0 rounded-full"
                        style:background={context.color(item.key)}
                    ></span>
                    <span>{context.label(item.key)}</span>
                    <span class="text-foreground tabular-nums">{context.format(item)}</span>
                {/if}
            </button>
        </li>
    {/each}
</ul>
