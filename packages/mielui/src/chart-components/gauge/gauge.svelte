<script lang="ts">
    import { onMount } from 'svelte';
    import { cn } from '@mielui/svelte/utils';
    import type { GaugeProps, GaugeTone } from '.';

    let {
        value,
        max = 100,
        label,
        size = 28,
        strokeWidth = 2,
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
    const safeSize = $derived(Number.isFinite(size) ? Math.max(size, 16) : 28);
    const safeStrokeWidth = $derived(
        Number.isFinite(strokeWidth) ? Math.min(Math.max(strokeWidth, 1), safeSize / 2) : 2
    );
    const clamped = $derived(Number.isFinite(value) ? Math.min(Math.max(value, 0), safeMax) : 0);
    const radius = $derived((safeSize - safeStrokeWidth) / 2);
    const circumference = $derived(2 * Math.PI * radius);
    const offset = $derived(circumference * (1 - clamped / safeMax));
    let arc: SVGCircleElement;
    onMount(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const themeDuration = getComputedStyle(arc).getPropertyValue('--motion-duration-panel');
        if (preference.matches || Number.parseFloat(themeDuration) === 0) {
            return;
        }
        const animation = arc.animate(
            [{ strokeDashoffset: String(circumference) }, { strokeDashoffset: String(offset) }],
            { duration: 650, easing: 'cubic-bezier(0.2,0,0,1)', fill: 'backwards' }
        );
        function cancel() {
            animation.cancel();
        }
        preference.addEventListener('change', cancel);
        return () => {
            cancel();
            preference.removeEventListener('change', cancel);
        };
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
            stroke-dasharray={circumference}
            stroke-dashoffset={offset}
            class={cn(
                toneClasses[tone],
                'stroke-current transition-[stroke-dashoffset] [transition-duration:var(--motion-duration-panel)] ease-out motion-reduce:transition-none'
            )}
        />
    </svg>
    <span
        aria-hidden="true"
        class="relative text-[length:var(--font-size-badge)] leading-none text-foreground-muted tabular-nums [font-weight:var(--font-weight-label)]"
    >
        {#if children}
            {@render children()}
        {:else}
            {clamped}
        {/if}
    </span>
</div>
