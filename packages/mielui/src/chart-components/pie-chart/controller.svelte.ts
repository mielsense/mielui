import { getCssDuration } from '@mielui/svelte/transition';
import { observeThemeChanges } from '../../components/_internal/theme-changes';
import type { PieChartContext } from './context';
import type { PieChartConfig, PieChartDatum } from './index';

type ControllerOptions = {
    readonly data: readonly PieChartDatum[];
    readonly config: PieChartConfig;
    readonly loading: boolean;
    readonly animation: PieChartContext['animation'];
    readonly element: HTMLElement | undefined;
};

const colors = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)'
];
const numberFormatter = new Intl.NumberFormat();

/**
 * Pie data, colors, and motion gates shared by every slice through context.
 * `observeMotion` tracks reduced motion, the theme's speed, and whether the chart is on screen.
 */
export function createPieChartController(options: ControllerOptions) {
    let active = $state<string>();
    let anchor = $state<Element>();
    let pointer = $state<{ x: number; y: number }>();
    let focused = $state<string>();
    let allowed = $state(false);
    let ready = $state(false);
    let durationScale = $state(1);
    let visible = $state(false);
    let foreground = $state(true);

    const data = $derived(
        options.data.filter((item) => Number.isFinite(item.value) && item.value >= 0)
    );
    const total = $derived(data.reduce((sum, item) => sum + item.value, 0));

    function observeMotion(root: HTMLElement) {
        const preference = matchMedia('(prefers-reduced-motion: reduce)');

        function update() {
            durationScale = Math.max(0, getCssDuration(root, '--motion-duration-panel', 180) / 180);
            allowed = !preference.matches && durationScale > 0;
            foreground = !document.hidden;
        }

        update();
        ready = true;
        preference.addEventListener('change', update);
        document.addEventListener('visibilitychange', update);
        const intersection = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        intersection.observe(root);
        const stopThemeChanges = observeThemeChanges(root, update);

        return () => {
            preference.removeEventListener('change', update);
            document.removeEventListener('visibilitychange', update);
            intersection.disconnect();
            stopThemeChanges();
        };
    }

    const context: PieChartContext = {
        get element() {
            return options.element;
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
            return data;
        },
        get config() {
            return options.config;
        },
        get total() {
            return total;
        },
        get loading() {
            return options.loading;
        },
        get animation() {
            return options.animation;
        },
        get durationScale() {
            return durationScale;
        },
        get ready() {
            return ready;
        },
        get motion() {
            return allowed && options.animation !== 'none';
        },
        get visible() {
            return visible && foreground;
        },
        get live() {
            return (
                allowed && visible && foreground && options.animation === 'live' && !options.loading
            );
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
            const index = Math.max(
                0,
                data.findIndex((item) => item.key === key)
            );

            return options.config[key]?.color ?? colors[index % colors.length];
        },
        label(key) {
            return options.config[key]?.label ?? key;
        },
        format(item) {
            return (
                options.config[item.key]?.format?.(item.value) ?? numberFormatter.format(item.value)
            );
        },
        percentage(item) {
            return total > 0 ? (item.value / total) * 100 : 0;
        }
    };

    return {
        context,
        observeMotion
    };
}
