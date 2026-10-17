<script lang="ts" generics="T extends Record<string, string | number | Date | null | undefined>">
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import type { ChartProps } from '.';
    import { setChart, setChartLabels } from './context.svelte';
    import { createChartState } from './state.svelte';

    let {
        data,
        config,
        x,
        orientation = 'vertical',
        stacked = false,
        loading = false,
        animation = 'reveal',
        children,
        'aria-label': label,
        labels,
        class: className,
        ...rest
    }: ChartProps<T> = $props();
    setChartLabels(() => labels);
    let element = $state<HTMLDivElement>();
    const chart = createChartState({
        get data() {
            return data;
        },
        get config() {
            return config;
        },
        get x() {
            return x;
        },
        get orientation() {
            return orientation;
        },
        get stacked() {
            return stacked;
        },
        get loading() {
            return loading;
        },
        get animation() {
            return animation;
        },
        get element() {
            return element;
        }
    });
    const context = chart.context;
    setChart(context);

    function tableValue(row: T, key: string) {
        const value = row[key];
        if (typeof value !== 'number' || !Number.isFinite(value)) {
            return labels?.noData ?? 'No data';
        }
        return context.format(key, value);
    }

    onMount(() => {
        if (element) {
            return chart.observeMotion(element);
        }
    });
</script>

<div
    bind:this={element}
    {...rest}
    data-ui="chart"
    role="group"
    aria-label={label}
    aria-busy={loading}
    class={cn(className, 'relative min-w-0')}
>
    {@render children?.()}
    <div class="sr-only">
        <table>
            <caption>
                {label}
            </caption>
            <thead>
                <tr>
                    <th scope="col">{x}</th>
                    {#each context.keys as key (key)}
                        <th scope="col">{config[key].label}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each data as row, index}
                    <tr>
                        <th scope="row">{context.label(index)}</th>
                        {#each context.keys as key (key)}
                            <td>{tableValue(row, key)}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
