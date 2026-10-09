<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { SkeletonSwapProps } from '.';
    import { delayedPresence } from './delayed-presence.svelte';

    let {
        ready,
        children,
        skeleton,
        lines = 3,
        lineHeight = 21,
        barHeight = 9,
        reserve,
        delay = 120,
        minVisible = 380,
        label,
        class: className,
        ...rest
    }: SkeletonSwapProps = $props();

    const widths = [100, 93, 97, 88, 95, 91] as const;
    let shell = $state<HTMLDivElement>();
    let body = $state<HTMLDivElement>();
    const presence = delayedPresence({
        get active() {
            return !ready;
        },
        get delay() {
            return delay;
        },
        get minVisible() {
            return minVisible;
        }
    });
    const showSkeleton = $derived(presence.visible);
    let scrollable = $state(false);
    const lineCount = $derived(
        Number.isFinite(lines) ? Math.min(1000, Math.max(0, Math.floor(lines))) : 3
    );
    const safeLineHeight = $derived(Number.isFinite(lineHeight) ? Math.max(0, lineHeight) : 21);
    const safeBarHeight = $derived(Number.isFinite(barHeight) ? Math.max(0, barHeight) : 9);
    const boxHeight = $derived(
        reserve !== undefined && Number.isFinite(reserve)
            ? Math.max(0, reserve)
            : Number.isFinite(lineCount * safeLineHeight)
              ? lineCount * safeLineHeight
              : lineCount * 21
    );
    const contentVisible = $derived(ready && !showSkeleton);
    let waited = $state(false);
    const sweepStagger = 370;
    const barClasses =
        'rounded-[var(--radius-sm)] bg-[linear-gradient(90deg,var(--mielui-skeleton-ink),var(--mielui-skeleton-light),var(--mielui-skeleton-ink))] bg-[length:200%_100%] [--mielui-skeleton-ink:color-mix(in_srgb,var(--color-foreground-muted)_15%,transparent)] [--mielui-skeleton-light:color-mix(in_srgb,var(--color-foreground-muted)_7%,transparent)] animate-[mielui-skeleton-sweep_linear_infinite] [animation-duration:calc(var(--motion-duration-spring)*6)] motion-reduce:animate-none';

    function widthFor(index: number) {
        if (lineCount > 1 && index === lineCount - 1) {
            return 62;
        }
        return widths[(index * 7 + 3) % widths.length];
    }

    $effect(() => {
        if (!contentVisible) {
            waited = true;
        }
    });

    $effect(() => {
        if (!shell) {
            return;
        }
        const measure = () => {
            const next = shell ? shell.scrollHeight - shell.clientHeight > 1 : false;
            if (next !== scrollable) {
                scrollable = next;
            }
        };
        const observer = new ResizeObserver(measure);
        observer.observe(shell);
        if (body) {
            observer.observe(body);
        }
        measure();
        return () => observer.disconnect();
    });
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
    bind:this={shell}
    {...rest}
    data-ui="skeleton-swap"
    aria-busy={!contentVisible}
    aria-label={label}
    tabindex={scrollable ? 0 : undefined}
    class={cn(
        className,
        'relative grid overflow-y-auto overscroll-contain text-foreground [scrollbar-gutter:stable]'
    )}
    style:height={`${boxHeight}px`}
>
    <div
        bind:this={body}
        aria-hidden={!contentVisible}
        inert={!contentVisible || undefined}
        data-visible={contentVisible}
        data-arriving={waited && contentVisible}
        class="mielui-skeleton-content col-start-1 row-start-1 min-w-0 origin-top-left"
    >
        {@render children?.()}
    </div>

    <div
        aria-hidden="true"
        inert
        data-visible={showSkeleton}
        class="mielui-skeleton-placeholder pointer-events-none col-start-1 row-start-1 w-full self-start"
    >
        {#if skeleton}
            {@render skeleton()}
        {:else}
            <div class="w-full">
                {#each Array(lineCount) as _, index (index)}
                    <div class="flex items-center" style:height={`${safeLineHeight}px`}>
                        <div
                            class={barClasses}
                            style:height={`${safeBarHeight}px`}
                            style:width={`${widthFor(index)}%`}
                            style:animation-delay={`${-index * sweepStagger}ms`}
                        ></div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    {#if label}
        <span role="status" class="sr-only">{contentVisible ? `${label} loaded` : ''}</span>
    {/if}
</div>

<style>
    .mielui-skeleton-placeholder {
        transition-property: opacity;
        transition-timing-function: var(--ease-out);
    }

    .mielui-skeleton-content[data-visible='false'] {
        pointer-events: none;
        opacity: 0;
    }

    .mielui-skeleton-content[data-arriving='true'] {
        animation: mielui-skeleton-arrive calc(var(--motion-duration-hover) * 2) var(--ease-out);
    }

    .mielui-skeleton-placeholder[data-visible='true'] {
        opacity: 1;
        transition-duration: var(--motion-duration-hover);
    }

    .mielui-skeleton-placeholder[data-visible='false'] {
        opacity: 0;
        transition-duration: var(--motion-duration-panel-out);
    }

    @keyframes mielui-skeleton-arrive {
        from {
            opacity: 0.4;
            filter: blur(4px);
        }
        to {
            opacity: 1;
            filter: blur(0);
        }
    }

    :global {
        @keyframes mielui-skeleton-sweep {
            to {
                background-position: -200% 0;
            }
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .mielui-skeleton-content[data-arriving='true'] {
            animation: none;
        }

        .mielui-skeleton-placeholder {
            transition: none;
        }
    }
</style>
