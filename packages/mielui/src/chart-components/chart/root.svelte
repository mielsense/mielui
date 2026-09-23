<script lang="ts" generics="T extends Record<string, string | number | Date | null | undefined>">
    import { cn } from '@mielui/svelte/utils';
    import { onMount, type Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { Tween } from 'svelte/motion';
    import { SvelteMap } from 'svelte/reactivity';
    import { type Config, setChart } from './context.svelte';
    import { categoryExtent, valueExtent } from './domains';

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
        class: className,
        ...rest
    }: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        data: readonly T[];
        config: Config;
        x: keyof T & string;
        orientation?: 'vertical' | 'horizontal';
        stacked?: boolean;
        loading?: boolean;
        animation?: 'reveal' | 'live' | 'none';
        'aria-label': string;
        children?: Snippet;
    } = $props();
    const numberFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
    const dateFormatter = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });
    let element = $state<HTMLDivElement>();
    let pointer = $state<{ x: number; y: number } | null>(null);
    let anchor = $state({ x: 0, y: 0 });
    let motion = $state(false);
    let motionScale = $state(1);
    let settled = $state(false);
    let active = $state<number | null>(null);
    let focused = $state<number | null>(null);
    const keys = $derived(Object.keys(config));
    const marks = new SvelteMap<symbol, { key: string; kind: 'bar' | 'line' | 'area' }>();
    const barKeys = $derived(
        keys.filter((key) =>
            [...marks.values()].some((mark) => mark.key === key && mark.kind === 'bar')
        )
    );
    const renderedKeys = $derived(
        keys.filter((key) => [...marks.values()].some((mark) => mark.key === key))
    );
    const continuous = $derived(
        data.length > 0 &&
            data.every(
                (row) =>
                    (typeof row[x] === 'number' || row[x] instanceof Date) &&
                    Number.isFinite(Number(row[x]))
            )
    );
    const positions = $derived(data.map((row, index) => (continuous ? Number(row[x]) : index)));
    const categoryDomain = $derived(categoryExtent(positions));
    const targets = $derived(
        data.map((row) =>
            keys.map((key) => {
                const value = row[key];
                return typeof value === 'number' && Number.isFinite(value) ? value : 0;
            })
        )
    );
    const identities = $derived.by(() => {
        const occurrences = new Map<string, number>();
        return data.map((row) => {
            const category = `${typeof row[x]}:${String(row[x])}`;
            const occurrence = occurrences.get(category) ?? 0;
            occurrences.set(category, occurrence + 1);
            return `${category}:${occurrence}`;
        });
    });
    const animatedTargets = $derived(
        data.map((_, index) => ({
            identity: identities[index],
            values: Object.fromEntries(keys.map((key, series) => [key, targets[index][series]]))
        }))
    );
    const values = Tween.of(() => animatedTargets, {
        interpolate: (from, to) => {
            const previousRows = new Map(from.map((row) => [row.identity, row.values]));
            return (progress) =>
                to.map((row) => ({
                    identity: row.identity,
                    values: Object.fromEntries(
                        Object.entries(row.values).map(([key, value]) => {
                            const previous = previousRows.get(row.identity)?.[key] ?? value;
                            return [key, previous + (value - previous) * progress];
                        })
                    )
                }));
        },
        duration: () => (settled && motion && animation !== 'none' ? 280 * motionScale : 0)
    });
    const currentRows = $derived(new Map(values.current.map((row) => [row.identity, row.values])));
    const domain = $derived(
        valueExtent(
            targets,
            (renderedKeys.length ? renderedKeys : keys).map((key) => keys.indexOf(key)),
            (marks.size ? barKeys : keys).map((key) => keys.indexOf(key)),
            stacked
        )
    );
    const animatedDomain = Tween.of(() => domain, {
        duration: () => (settled && motion && animation !== 'none' ? 280 * motionScale : 0)
    });
    setChart({
        get element() {
            return element;
        },
        get pointer() {
            return pointer;
        },
        set pointer(value) {
            pointer = value;
        },
        get anchor() {
            return anchor;
        },
        set anchor(value) {
            anchor = value;
        },
        get data() {
            return data;
        },
        get config() {
            return config;
        },
        get keys() {
            return keys;
        },
        get barKeys() {
            return barKeys;
        },
        register(token, key, kind) {
            marks.set(token, { key, kind });
            return () => {
                marks.delete(token);
            };
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
        get motion() {
            return motion;
        },
        get motionScale() {
            return motionScale;
        },
        get domain() {
            return animatedDomain.current;
        },
        get categoryDomain() {
            return categoryDomain;
        },
        position(row) {
            return positions[row] ?? row;
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
        value(row, key) {
            const original = data[row]?.[key];
            if (typeof original !== 'number' || !Number.isFinite(original)) {
                return null;
            }
            return currentRows.get(identities[row])?.[key] ?? original;
        },
        color(key) {
            return (
                config[key]?.color ??
                [
                    'var(--color-primary)',
                    'var(--color-success)',
                    'var(--color-warning)',
                    'var(--color-foreground-muted)'
                ][keys.indexOf(key) % 4] ??
                'var(--color-primary)'
            );
        },
        label(row) {
            const value = data[row]?.[x];
            if (value instanceof Date && Number.isFinite(value.getTime())) {
                return dateFormatter.format(value);
            }
            return String(value ?? '');
        },
        format(key, value) {
            return config[key]?.format?.(value) ?? numberFormatter.format(value);
        }
    });
    onMount(() => {
        const root = element;
        if (!root) {
            return;
        }
        const rootElement: HTMLDivElement = root;
        const media = matchMedia('(prefers-reduced-motion: reduce)');
        function update() {
            const token = getComputedStyle(rootElement)
                .getPropertyValue('--motion-duration-panel')
                .trim();
            const duration =
                Number.parseFloat(token) *
                (token.endsWith('ms') ? 1 : token.endsWith('s') ? 1000 : 1);
            motionScale = Number.isFinite(duration) ? duration / 180 : 1;
            motion = !media.matches && motionScale > 0;
        }
        update();
        const frame = requestAnimationFrame(() => {
            settled = true;
        });
        media.addEventListener('change', update);
        const observer = new MutationObserver(update);
        let ancestor: HTMLElement | null = rootElement;
        while (ancestor) {
            observer.observe(ancestor, { attributes: true, attributeFilter: ['style', 'class'] });
            ancestor = ancestor.parentElement;
        }
        return () => {
            cancelAnimationFrame(frame);
            media.removeEventListener('change', update);
            observer.disconnect();
        };
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
                    {#each keys as key}
                        <th scope="col">{config[key].label}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each data as row}
                    <tr>
                        <th scope="row">{String(row[x] ?? '')}</th>
                        {#each keys as key}
                            <td>
                                {typeof row[key] === 'number' && Number.isFinite(row[key]) ? config[key].format?.(row[key] as number) ?? row[key] : 'No data'}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
