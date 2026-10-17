<script lang="ts" module>
    export type PillBox = {
        left?: number;
        top?: number;
        width?: number;
        height?: number;
    };

    const AXIS_CLASS = {
        x: 'inset-y-0 left-0 transition-[translate,width,opacity]',
        y: 'inset-x-0 top-0 transition-[translate,height,opacity]',
        both: 'top-0 left-0 transition-[translate,width,height,opacity]'
    };
</script>

<script lang="ts">
    import { cn } from '@mielui/svelte/utils';

    let {
        container,
        measure,
        track,
        axis,
        class: className
    }: {
        container: HTMLElement | undefined;
        measure: (container: HTMLElement) => PillBox | undefined;
        track: unknown;
        axis: keyof typeof AXIS_CLASS;
        class?: string;
    } = $props();

    let box = $state<PillBox>();
    let ready = $state(false);

    const sizesWidth = $derived(axis !== 'y');
    const sizesHeight = $derived(axis !== 'x');

    function update() {
        box = container ? measure(container) : undefined;
    }

    $effect(() => {
        void track;
        update();
        if (!container) {
            return;
        }
        const observer = new ResizeObserver(update);
        observer.observe(container);
        const frame = requestAnimationFrame(() => {
            ready = true;
        });

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    });

    $effect(() => {
        if (!container) {
            return;
        }
        container.toggleAttribute('data-pill-ready', box !== undefined);
    });
</script>

<!--
    @component
    The lit pill that slides to the current item of a list. The parent positions the list
    `relative isolate`; `measure` returns the current item's box inside `container`, or nothing
    when no item is current. The container gets `data-pill-ready` once the pill is placed, so
    items can keep their resting colors until the pill sits behind them.
-->

<span
    aria-hidden="true"
    class={cn(
        className,
        AXIS_CLASS[axis],
        'mielui-glow pointer-events-none absolute -z-10 shadow-[var(--mielui-glow-shadow),var(--elevation-1)] [transition-duration:var(--motion-duration-item)] ease-[var(--ease-out)] [--mielui-glow-color:var(--color-foreground)] [--mielui-glow-light:0.16] [--mielui-glow-ring:transparent] motion-reduce:transition-none dark:[--mielui-glow-color:color-mix(in_srgb,var(--color-foreground)_16%,var(--color-card))] dark:[--mielui-glow-light:0.12] dark:[--mielui-glow-ring:var(--color-border)]'
    )}
    style:translate={`${box?.left ?? 0}px ${box?.top ?? 0}px`}
    style:width={sizesWidth ? `${box?.width ?? 0}px` : undefined}
    style:height={sizesHeight ? `${box?.height ?? 0}px` : undefined}
    style:opacity={box ? 1 : 0}
    style:transition={ready ? undefined : 'opacity var(--motion-duration-hover) var(--ease-out)'}
></span>
