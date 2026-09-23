<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import { setPieContext } from './context';
    import type { PieChartProps } from './index';

    let {
        data,
        config,
        loading = false,
        animation = 'reveal',
        children,
        class: className,
        'aria-label': label,
        ...rest
    }: PieChartProps = $props();
    const numberFormatter = new Intl.NumberFormat();
    let element: HTMLDivElement;
    let active = $state<string>();
    let anchor = $state<Element>();
    let pointer = $state<{ x: number; y: number }>();
    let focused = $state<string>();
    let allowed = $state(false);
    let ready = $state(false);
    let durationScale = $state(1);
    let visible = $state(false);
    let foreground = $state(true);
    const validData = $derived(
        data.filter((item) => Number.isFinite(item.value) && item.value >= 0)
    );
    const total = $derived(validData.reduce((sum, item) => sum + item.value, 0));
    const colors = [
        'var(--color-primary)',
        'var(--color-success)',
        'var(--color-warning)',
        'var(--color-info)',
        'var(--color-error)'
    ];
    const context = setPieContext({
        get element() {
            return element;
        },
        get anchor() {
            return anchor;
        },
        set anchor(value) {
            anchor = value;
        },
        get pointer() {
            return pointer;
        },
        set pointer(value) {
            pointer = value;
        },
        get data() {
            return validData;
        },
        get config() {
            return config;
        },
        get total() {
            return total;
        },
        get loading() {
            return loading;
        },
        get animation() {
            return animation;
        },
        get durationScale() {
            return durationScale;
        },
        get ready() {
            return ready;
        },
        get motion() {
            return allowed && animation !== 'none';
        },
        get visible() {
            return visible && foreground;
        },
        get live() {
            return allowed && visible && foreground && animation === 'live' && !loading;
        },
        get focused() {
            return focused;
        },
        set focused(value) {
            focused = value;
        },
        get active() {
            return active;
        },
        set active(value) {
            active = value;
        },
        color(key) {
            return (
                config[key]?.color ??
                colors[
                    Math.max(
                        0,
                        validData.findIndex((item) => item.key === key)
                    ) % colors.length
                ]
            );
        },
        label(key) {
            return config[key]?.label ?? key;
        },
        format(item) {
            return config[item.key]?.format?.(item.value) ?? numberFormatter.format(item.value);
        }
    });
    onMount(() => {
        const preference = matchMedia('(prefers-reduced-motion: reduce)');
        function update() {
            const duration = getComputedStyle(element)
                .getPropertyValue('--motion-duration-panel')
                .trim();
            const parsed = Number.parseFloat(duration);
            const milliseconds = duration.endsWith('ms') ? parsed : parsed * 1000;
            durationScale = Number.isFinite(milliseconds) ? Math.max(0, milliseconds / 180) : 1;
            allowed = !preference.matches && durationScale > 0;
            foreground = !document.hidden;
        }
        update();
        ready = true;
        preference.addEventListener('change', update);
        document.addEventListener('visibilitychange', update);
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        observer.observe(element);
        const theme = new MutationObserver(update);
        let ancestor: HTMLElement | null = element;
        while (ancestor) {
            theme.observe(ancestor, { attributes: true, attributeFilter: ['style', 'class'] });
            ancestor = ancestor.parentElement;
        }
        return () => {
            preference.removeEventListener('change', update);
            document.removeEventListener('visibilitychange', update);
            observer.disconnect();
            theme.disconnect();
        };
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
                {loading ? ' — loading' : ''}
            </caption>
            <thead>
                <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Value</th>
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
