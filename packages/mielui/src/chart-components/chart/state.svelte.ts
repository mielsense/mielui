import { getCssDuration } from '@mielui/svelte/transition';
import { Tween } from 'svelte/motion';
import { SvelteMap } from 'svelte/reactivity';
import { observeThemeChanges } from '../../components/_internal/theme-changes';
import type { ChartContext, ChartRow, Config } from './context.svelte';
import { categoryExtent, valueExtent } from './domains';

type ChartStateOptions = {
    readonly data: readonly ChartRow[];
    readonly config: Config;
    readonly x: string;
    readonly orientation: ChartContext['orientation'];
    readonly stacked: boolean;
    readonly loading: boolean;
    readonly animation: ChartContext['animation'];
    readonly element: HTMLDivElement | undefined;
};

type AnimatedRow = {
    identity: string;
    values: Record<string, number>;
};

const numberFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
const dateFormatter = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });

/** Builds a stable key per row so a tween can follow a row when data reorders. */
function rowIdentities(data: readonly ChartRow[], x: string) {
    const occurrences = new Map<string, number>();

    return data.map((row) => {
        const category = `${typeof row[x]}:${String(row[x])}`;
        const occurrence = occurrences.get(category) ?? 0;
        occurrences.set(category, occurrence + 1);

        return `${category}:${occurrence}`;
    });
}

function interpolateRows(from: AnimatedRow[], to: AnimatedRow[]) {
    const previousRows = new Map(from.map((row) => [row.identity, row.values]));

    return (progress: number) => {
        return to.map((row) => {
            const entries = Object.entries(row.values).map(([key, value]) => {
                const previous = previousRows.get(row.identity)?.[key] ?? value;

                return [key, previous + (value - previous) * progress];
            });

            return {
                identity: row.identity,
                values: Object.fromEntries(entries)
            };
        });
    };
}

/**
 * Chart data, scales, and value tweens shared by every mark through context.
 * `observeMotion` keeps the tween speed in step with the theme once the root mounts.
 */
export function createChartState(options: ChartStateOptions) {
    let pointer = $state<{ x: number; y: number } | null>(null);
    let anchor = $state({ x: 0, y: 0 });
    let motion = $state(false);
    let motionScale = $state(1);
    let settled = $state(false);
    let active = $state<number | null>(null);
    let focused = $state<number | null>(null);
    const marks = new SvelteMap<symbol, { key: string; kind: 'bar' | 'line' | 'area' }>();

    const keys = $derived(Object.keys(options.config));
    const renderedKeys = $derived(
        keys.filter((key) => [...marks.values()].some((mark) => mark.key === key))
    );
    const barKeys = $derived(
        keys.filter((key) =>
            [...marks.values()].some((mark) => mark.key === key && mark.kind === 'bar')
        )
    );
    const continuous = $derived(
        options.data.length > 0 &&
            options.data.every((row) => {
                const value = row[options.x];

                return (
                    (typeof value === 'number' || value instanceof Date) &&
                    Number.isFinite(Number(value))
                );
            })
    );
    const positions = $derived(
        options.data.map((row, index) => (continuous ? Number(row[options.x]) : index))
    );
    const categoryDomain = $derived(categoryExtent(positions));
    const targets = $derived(
        options.data.map((row) =>
            keys.map((key) => {
                const value = row[key];

                return typeof value === 'number' && Number.isFinite(value) ? value : 0;
            })
        )
    );
    const identities = $derived(rowIdentities(options.data, options.x));
    const animatedTargets = $derived(
        identities.map((identity, index) => {
            return {
                identity,
                values: Object.fromEntries(keys.map((key, series) => [key, targets[index][series]]))
            };
        })
    );
    const tweenDuration = () => {
        return settled && motion && options.animation !== 'none' ? 280 * motionScale : 0;
    };
    const values = Tween.of(() => animatedTargets, {
        interpolate: interpolateRows,
        duration: tweenDuration
    });
    const currentRows = $derived(new Map(values.current.map((row) => [row.identity, row.values])));
    const domain = $derived.by(() => {
        const shown = renderedKeys.length ? renderedKeys : keys;
        const stackedKeys = marks.size ? barKeys : keys;

        return valueExtent(
            targets,
            shown.map((key) => keys.indexOf(key)),
            stackedKeys.map((key) => keys.indexOf(key)),
            options.stacked
        );
    });
    const animatedDomain = Tween.of(() => domain, { duration: tweenDuration });

    function label(row: number) {
        const value = options.data[row]?.[options.x];
        if (value instanceof Date && Number.isFinite(value.getTime())) {
            return dateFormatter.format(value);
        }

        return String(value ?? '');
    }

    function format(key: string, value: number) {
        return options.config[key]?.format?.(value) ?? numberFormatter.format(value);
    }

    function observeMotion(root: HTMLElement) {
        const media = matchMedia('(prefers-reduced-motion: reduce)');

        function update() {
            motionScale = getCssDuration(root, '--motion-duration-panel', 180) / 180;
            motion = !media.matches && motionScale > 0;
        }

        update();
        const frame = requestAnimationFrame(() => {
            settled = true;
        });
        media.addEventListener('change', update);
        const stopThemeChanges = observeThemeChanges(root, update);

        return () => {
            cancelAnimationFrame(frame);
            media.removeEventListener('change', update);
            stopThemeChanges();
        };
    }

    const context: ChartContext = {
        get element() {
            return options.element;
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
            return options.data;
        },
        get config() {
            return options.config;
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
            return options.x;
        },
        get orientation() {
            return options.orientation;
        },
        get stacked() {
            return options.stacked;
        },
        get loading() {
            return options.loading;
        },
        get animation() {
            return options.animation;
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
            const original = options.data[row]?.[key];
            if (typeof original !== 'number' || !Number.isFinite(original)) {
                return null;
            }

            return currentRows.get(identities[row])?.[key] ?? original;
        },
        color(key) {
            const index = Math.max(0, keys.indexOf(key));

            return options.config[key]?.color ?? `var(--chart-${(index % 5) + 1})`;
        },
        label,
        format
    };

    return {
        context,
        observeMotion
    };
}
