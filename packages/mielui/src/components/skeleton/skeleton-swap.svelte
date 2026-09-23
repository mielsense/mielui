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

    function widthFor(index: number) {
        if (lineCount > 1 && index === lineCount - 1) {
            return 62;
        }
        return widths[(index * 7 + 3) % widths.length];
    }

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
                            class="rounded-[var(--radius-sm)] bg-secondary"
                            style:height={`${safeBarHeight}px`}
                            style:width={`${widthFor(index)}%`}
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
    .mielui-skeleton-content,
    .mielui-skeleton-placeholder {
        transition-property: opacity, scale, filter;
        transition-duration: var(--motion-duration-panel);
        transition-timing-function: var(--ease-out);
    }

    .mielui-skeleton-content[data-visible='false'] {
        pointer-events: none;
        opacity: 0;
        scale: 0.99;
        filter: blur(4px);
    }

    .mielui-skeleton-content[data-visible='true'],
    .mielui-skeleton-placeholder[data-visible='true'] {
        opacity: 1;
        scale: 1;
        filter: blur(0);
    }

    .mielui-skeleton-placeholder[data-visible='false'] {
        opacity: 0;
        filter: blur(3px);
    }

    @media (prefers-reduced-motion: reduce) {
        .mielui-skeleton-content,
        .mielui-skeleton-placeholder {
            transition: none;
        }
    }
</style>
