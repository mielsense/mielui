<script lang="ts">
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import { cn } from '@mielui/svelte/utils';
    import { onMount, untrack } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';
    import type { GaugeProps, GaugeTone } from '.';
    import { gaugeArcPath } from './arc-path';
    import { gaugeLiveMotion } from './live-motion';

    let {
        value,
        loading = false,
        max = 100,
        label,
        size = 120,
        strokeWidth,
        tone = 'primary',
        animation = 'reveal',
        children,
        class: className,
        ...rest
    }: GaugeProps = $props();

    const toneClasses: Record<GaugeTone, string> = {
        primary: 'text-primary',
        muted: 'text-foreground-muted',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error'
    };
    const safeMax = $derived(Number.isFinite(max) && max > 0 ? max : 100);
    const safeSize = $derived(Number.isFinite(size) ? Math.max(size, 16) : 120);
    const safeStrokeWidth = $derived(
        typeof strokeWidth === 'number' && Number.isFinite(strokeWidth)
            ? Math.min(Math.max(strokeWidth, 1), safeSize / 2)
            : Math.max(3, safeSize * 0.0975)
    );
    const arcStrokeWidth = $derived(safeStrokeWidth);
    const empty = $derived(value === null);
    const unavailable = $derived(loading || empty);
    const clamped = $derived(
        typeof value === 'number' && Number.isFinite(value)
            ? Math.min(Math.max(value, 0), safeMax)
            : 0
    );
    const radius = $derived((safeSize - safeStrokeWidth) / 2);
    const progress = new Tween(
        untrack(() => clamped / safeMax),
        { easing: cubicOut }
    );
    const path = $derived(gaugeArcPath(safeSize, radius, arcStrokeWidth, progress.current));
    const fontSize = $derived(Math.max(10, safeSize * 0.24));
    let arc: SVGPathElement;
    let mounted = $state(false);
    let duration = $state(0);

    onMount(() => {
        const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
        function refreshMotion() {
            const token = getComputedStyle(arc).getPropertyValue('--motion-duration-panel').trim();
            const amount = Number.parseFloat(token);
            const milliseconds = token.endsWith('ms') ? amount : amount * 1000;
            duration = preference?.matches
                ? 0
                : Number.isFinite(milliseconds)
                  ? milliseconds * 2
                  : 480;
        }
        refreshMotion();
        if (duration > 0 && animation !== 'none') {
            void progress.set(0, { duration: 0 });
        }
        mounted = true;
        preference?.addEventListener('change', refreshMotion);
        const observer = new MutationObserver(refreshMotion);
        let ancestor: Element | null = arc.parentElement;
        while (ancestor) {
            observer.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
            ancestor = ancestor.parentElement;
        }
        return () => {
            void progress.set(progress.current, { duration: 0 });
            observer.disconnect();
            preference?.removeEventListener('change', refreshMotion);
        };
    });

    $effect(() => {
        const target = unavailable ? 0 : clamped / safeMax;
        const milliseconds = animation === 'none' ? 0 : duration;
        if (!mounted) {
            return;
        }
        untrack(() => {
            void progress.set(target, { duration: milliseconds });
        });
    });
    $effect(() => {
        if (mounted && !unavailable && animation === 'live' && duration > 0 && clamped > 0) {
            return gaugeLiveMotion(arc, duration / 360);
        }
    });
    const accessibleLabel = $derived(
        loading
            ? `Loading ${label ?? 'measurement'}`
            : empty
              ? `No data for ${label ?? 'measurement'}`
              : (label ?? `${clamped} of ${safeMax}`)
    );
    const loadingMask = $derived(
        `radial-gradient(circle at center, transparent ${radius - safeStrokeWidth / 2}px, #000 ${radius - safeStrokeWidth / 2 + 0.5}px, #000 ${radius + safeStrokeWidth / 2 - 0.5}px, transparent ${radius + safeStrokeWidth / 2}px)`
    );
</script>

<div
    data-ui="gauge"
    role={unavailable ? 'status' : 'meter'}
    aria-busy={loading}
    aria-label={accessibleLabel}
    aria-valuemin={unavailable ? undefined : 0}
    aria-valuemax={unavailable ? undefined : safeMax}
    aria-valuenow={unavailable ? undefined : clamped}
    class={cn(className, 'relative inline-grid shrink-0 place-items-center')}
    style:width={`${safeSize}px`}
    style:height={`${safeSize}px`}
    {...rest}
>
    <svg
        aria-hidden="true"
        viewBox={`0 0 ${safeSize} ${safeSize}`}
        class="absolute inset-0 -rotate-90 overflow-visible"
    >
        <circle
            cx={safeSize / 2}
            cy={safeSize / 2}
            r={radius}
            fill="none"
            stroke-width={safeStrokeWidth}
            class="stroke-secondary"
        />
        <path
            data-ui="gauge-arc"
            bind:this={arc}
            d={unavailable ? '' : path}
            fill-rule="evenodd"
            class={cn(toneClasses[tone], 'fill-current')}
        />
    </svg>
    {#if loading}
        <div aria-hidden="true" class="absolute inset-0" style:mask-image={loadingMask}>
            <Skeleton
                variant={animation === 'none' ? 'default' : 'shimmer'}
                class="size-full rounded-full"
            />
        </div>
    {/if}
    <span
        aria-hidden="true"
        class="relative grid max-w-[72%] place-items-center leading-none tracking-tight text-foreground tabular-nums [font-weight:var(--font-weight-heading)]"
        style:font-size={`${fontSize}px`}
    >
        {#if loading}
            <span class="text-foreground-muted">…</span>
        {:else if empty}
            <span class="text-foreground-muted">—</span>
        {:else if children}
            {@render children()}
        {:else}
            {clamped}
        {/if}
    </span>
</div>
