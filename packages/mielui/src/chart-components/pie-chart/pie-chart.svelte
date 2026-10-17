<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import { setPieChartContext, setPieChartLabels } from './context';
    import { createPieChartController } from './controller.svelte';
    import type { PieChartProps } from './index';

    let {
        data,
        config,
        loading = false,
        animation = 'reveal',
        children,
        class: className,
        'aria-label': label,
        labels,
        ...rest
    }: PieChartProps = $props();
    setPieChartLabels(() => labels);
    let element = $state<HTMLDivElement>();
    const pie = createPieChartController({
        get data() {
            return data;
        },
        get config() {
            return config;
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
    const context = setPieChartContext(pie.context);

    onMount(() => {
        if (element) {
            return pie.observeMotion(element);
        }
    });
</script>

<div
    bind:this={element}
    data-ui="pie-chart"
    aria-label={label}
    aria-busy={loading}
    role="group"
    class={cn(className, 'relative min-w-0')}
    {...rest}
>
    {@render children?.()}
    <div class="sr-only">
        <table>
            <caption>
                {label}
                {loading ? ` — ${labels?.loading ?? 'loading'}` : ''}
            </caption>
            <thead>
                <tr>
                    <th scope="col">{labels?.category ?? 'Category'}</th>
                    <th scope="col">{labels?.value ?? 'Value'}</th>
                </tr>
            </thead>
            <tbody>
                {#each context.data as item (item.key)}
                    <tr>
                        <th scope="row">{context.label(item.key)}</th>
                        <td>{context.format(item)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
