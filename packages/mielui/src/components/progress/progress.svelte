<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { motionLoop } from '../_internal/motion-loop';
    import type { ProgressProps } from '.';

    let {
        class: className,
        value = 0,
        max = 100,
        indeterminate = false,
        ...rest
    }: ProgressProps = $props();

    const safeMax = $derived(Number.isFinite(max) && max > 0 ? max : 100);
    const clamped = $derived(Number.isFinite(value) ? Math.min(Math.max(value, 0), safeMax) : 0);
    const pct = $derived((clamped / safeMax) * 100);
</script>

<div
    data-ui="progress"
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={safeMax}
    aria-valuenow={indeterminate ? undefined : clamped}
    class={cn(className, 'relative h-1.5 w-full overflow-hidden rounded-full bg-secondary')}
    {...rest}
>
    {#if indeterminate}
        <div
            {@attach motionLoop}
            class="[animation-play-state:var(--mielui-loop-play-state)] absolute inset-y-0 left-0 w-1/3 animate-[mielui-progress-slide_1.4s_linear_infinite] rounded-full bg-primary motion-reduce:w-full motion-reduce:animate-pulse"
        ></div>
    {:else}
        <div
            class="h-full w-full translate-x-[var(--mielui-progress-offset)] rounded-full bg-primary transition-[translate] [transition-duration:var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] rtl:translate-x-[calc(var(--mielui-progress-offset)*-1)] motion-reduce:transition-none"
            style:--mielui-progress-offset={`${pct - 100}%`}
        ></div>
    {/if}
</div>

<style>
    :global {
        @keyframes mielui-progress-slide {
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(400%);
            }
        }
    }
</style>
