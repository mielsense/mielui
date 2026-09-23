<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Arc } from 'layerchart';
    import { cubicOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';
    import { getPieContext } from './context';
    import type { PieChartDatum } from './index';

    let {
        item,
        start,
        end,
        innerRadius,
        cornerRadius,
        padAngle,
        class: className
    }: {
        item: PieChartDatum;
        start: number;
        end: number;
        innerRadius: number;
        cornerRadius: number;
        padAngle: number;
        class?: string;
    } = $props();
    const context = getPieContext();
    const angles = new Tween([0, 0], { duration: 480, easing: cubicOut });
    let highlight = $state<SVGGElement>();
    let illumination = $state.raw<Animation>();
    $effect(() => {
        if (!highlight || !context.motion || context.animation !== 'live') {
            return;
        }
        const phase = (Math.max(0, start) / (Math.PI * 2)) * 0.6;
        const animation = highlight.animate(
            [
                { opacity: 0, offset: 0 },
                { opacity: 0, offset: phase },
                { opacity: 0.3, offset: phase + 0.12 },
                { opacity: 0, offset: phase + 0.3 },
                { opacity: 0, offset: 1 }
            ],
            { duration: 5400 * context.durationScale, iterations: Infinity, easing: 'ease-in-out' }
        );
        animation.pause();
        illumination = animation;
        return () => {
            animation.cancel();
            illumination = undefined;
        };
    });
    $effect(() => {
        if (context.live && !context.active) {
            illumination?.play();
        } else {
            illumination?.pause();
        }
    });
    let entered = false;
    $effect(() => {
        if (!context.ready) {
            return;
        }
        void angles.set([start, end], {
            duration: context.motion ? (entered ? 280 : 500) * context.durationScale : 0
        });
        entered = true;
    });
</script>

<g>
    <Arc
        startAngle={angles.current[0]}
        endAngle={angles.current[1]}
        innerRadius={Math.max(0, Math.min(innerRadius, 0.95))}
        {cornerRadius}
        padAngle={Math.max(0, Math.min(padAngle, 0.2))}
        fill={context.color(item.key)}
        motion="none"
        class={cn(className, 'outline-none transition-opacity duration-[var(--motion-duration-fast)] motion-reduce:transition-none')}
        style={context.motion ? undefined : 'transition-duration: 0ms'}
        opacity={context.active && context.active !== item.key ? 0.45 : 1}
        onpointermove={(event) => {
            context.anchor = event.currentTarget;
            context.pointer = { x: event.clientX, y: event.clientY };
            context.active = item.key;
        }}
        onpointerenter={(event) => {
            context.anchor = event.currentTarget;
            context.pointer = { x: event.clientX, y: event.clientY };
            context.active = item.key;
        }}
        onpointerleave={() => {
            context.active = context.focused;
            context.pointer = undefined;
            if (context.focused) {
                context.anchor = document.activeElement ?? undefined;
            }
        }}
    />
    {#if context.animation === 'live' && context.motion}
        <g bind:this={highlight} opacity="0" class="pointer-events-none">
            <Arc
                startAngle={angles.current[0]}
                endAngle={angles.current[1]}
                innerRadius={Math.max(0, Math.min(innerRadius, 0.95))}
                {cornerRadius}
                padAngle={Math.max(0, Math.min(padAngle, 0.2))}
                fill="white"
                motion="none"
            />
        </g>
    {/if}
</g>
