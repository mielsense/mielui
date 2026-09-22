<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { onMount, untrack } from 'svelte';
    import type { GaugeProps, GaugeTone } from '.';

    let {
        value,
        max = 100,
        label,
        size = 120,
        strokeWidth,
        tone = 'primary',
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
            : Math.max(2, safeSize / 15)
    );
    const clamped = $derived(Number.isFinite(value) ? Math.min(Math.max(value, 0), safeMax) : 0);
    const radius = $derived((safeSize - safeStrokeWidth) / 2);
    const offset = $derived(100 * (1 - clamped / safeMax));
    const fontSize = $derived(Math.max(10, safeSize * 0.24));
    let arc: SVGCircleElement;
    let mounted = $state(false);
    let duration = $state(0);
    let animation: Animation | undefined;
    let previousOffset = 100;
    let entered = false;

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
        mounted = true;
        preference?.addEventListener('change', refreshMotion);
        const observer = new MutationObserver(refreshMotion);
        let ancestor: Element | null = arc.parentElement;
        while (ancestor) {
            observer.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
            ancestor = ancestor.parentElement;
        }
        return () => {
            animation?.cancel();
            observer.disconnect();
            preference?.removeEventListener('change', refreshMotion);
        };
    });

    $effect(() => {
        const target = offset;
        const milliseconds = duration;
        if (!mounted) {
            return;
        }
        untrack(() => {
            const from =
                animation && animation.playState !== 'finished'
                    ? Number.parseFloat(getComputedStyle(arc).strokeDashoffset)
                    : entered
                      ? previousOffset
                      : 100;
            animation?.cancel();
            arc.setAttribute('stroke-dashoffset', String(target));
            if (milliseconds > 0 && from !== target && typeof arc.animate === 'function') {
                animation = arc.animate(
                    [{ strokeDashoffset: String(from) }, { strokeDashoffset: String(target) }],
                    { duration: milliseconds, easing: 'cubic-bezier(0.2,0,0,1)' }
                );
            }
            previousOffset = target;
            entered = true;
        });
    });
    const accessibleLabel = $derived(label ?? `${clamped} of ${safeMax}`);
</script>

<div
    data-ui="gauge"
    role="meter"
    aria-label={accessibleLabel}
    aria-valuemin={0}
    aria-valuemax={safeMax}
    aria-valuenow={clamped}
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
        <circle
            cx={safeSize / 2}
            cy={safeSize / 2}
            r={radius}
            fill="none"
            stroke-width={safeStrokeWidth}
            stroke-linecap="round"
            bind:this={arc}
            pathLength={100}
            stroke-dasharray="100"
            stroke-dashoffset={offset}
            opacity={clamped === 0 ? 0 : 1}
            class={cn(
                toneClasses[tone],
                'stroke-current'
            )}
        />
    </svg>
    <span
        aria-hidden="true"
        class="relative grid max-w-[72%] place-items-center leading-none tracking-tight text-foreground tabular-nums [font-weight:var(--font-weight-heading)]"
        style:font-size={`${fontSize}px`}
    >
        {#if children}
            {@render children()}
        {:else}
            {clamped}
        {/if}
    </span>
</div>
