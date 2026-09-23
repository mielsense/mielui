<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import type { ShowMoreProps } from '.';

    let {
        children,
        preview,
        trigger,
        lines = 3,
        maxHeight = 320,
        defaultExpanded = false,
        expanded = $bindable(defaultExpanded),
        moreLabel = 'Show more',
        lessLabel = 'Show less',
        label = 'Details',
        onExpandedChange,
        class: className,
        ...rest
    }: ShowMoreProps = $props();

    let content = $state<HTMLDivElement>();
    let region = $state<HTMLDivElement>();
    let lineHeight = $state<number>();
    let fullHeight = $state<number>();
    const regionId = $props.id();
    const triggerId = `${regionId}-trigger`;
    const visibleLines = $derived(Number.isFinite(lines) ? Math.max(1, Math.floor(lines)) : 3);
    const heightLimit = $derived(Number.isFinite(maxHeight) ? Math.max(1, maxHeight) : 320);

    const collapsedHeight = $derived(
        lineHeight === undefined || fullHeight === undefined
            ? undefined
            : Math.min(lineHeight * visibleLines, fullHeight)
    );
    const capped = $derived(fullHeight !== undefined && fullHeight > heightLimit);
    const expandable = $derived(
        preview
            ? true
            : lineHeight === undefined || fullHeight === undefined
              ? true
              : fullHeight - lineHeight * visibleLines > 1
    );
    const open = $derived(expanded && expandable);
    const height = $derived(
        open
            ? fullHeight === undefined
                ? undefined
                : Math.min(fullHeight, heightLimit)
            : collapsedHeight
    );
    const scrollable = $derived(open && capped);
    const veiled = $derived(!preview && expandable && (!open || scrollable));

    function measure() {
        if (!content) {
            return;
        }
        const styles = getComputedStyle(content);
        const parsedLineHeight = Number.parseFloat(styles.lineHeight);
        const parsedFontSize = Number.parseFloat(styles.fontSize);
        lineHeight = Number.isFinite(parsedLineHeight) ? parsedLineHeight : parsedFontSize * 1.5;
        fullHeight = content.scrollHeight;
    }

    function toggle() {
        if (open) {
            region?.scrollTo({ top: 0 });
        }
        expanded = !expanded;
        onExpandedChange?.(expanded);
    }

    const triggerProps = $derived({
        type: 'button' as const,
        id: triggerId,
        'aria-expanded': open,
        'aria-controls': regionId,
        onclick: toggle
    });

    $effect.pre(() => {
        if (
            preview &&
            !open &&
            typeof document !== 'undefined' &&
            content?.contains(document.activeElement)
        ) {
            document.getElementById(triggerId)?.focus({ preventScroll: true });
        }
    });

    onMount(() => {
        measure();
        if (!content) {
            return;
        }
        const observer = new ResizeObserver(measure);
        observer.observe(content);
        return () => observer.disconnect();
    });
</script>

<div {...rest} data-ui="show-more" class={cn(className, 'text-foreground')}>
    {#if preview && !open}
        <div data-ui="show-more-preview">{@render preview()}</div>
    {/if}
    <div class="relative" hidden={Boolean(preview) && !open} inert={Boolean(preview) && !open}>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div
            bind:this={region}
            id={regionId}
            role={preview || scrollable ? 'region' : undefined}
            aria-label={preview || scrollable ? label : undefined}
            tabindex={scrollable ? 0 : undefined}
            data-scrollable={scrollable}
            data-veiled={veiled}
            class="transition-[height] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none data-[veiled=true]:[mask-image:linear-gradient(to_bottom,black_calc(100%_-_var(--spacing)_*_9),transparent)] overscroll-contain rounded-[var(--radius-sm)] outline-none focus-visible:shadow-[var(--focus-ring)]"
            style:height={preview || height === undefined ? undefined : `${height}px`}
            style:max-height={preview ? `${heightLimit}px` : height === undefined ? `${visibleLines}lh` : undefined}
            style:overflow-y={preview || scrollable ? 'auto' : 'hidden'}
            style:scrollbar-gutter={capped ? 'stable' : undefined}
        >
            <div
                bind:this={content}
                onfocusin={() => {
                    if (!open && expandable) {
                        expanded = true;
                        onExpandedChange?.(true);
                    }
                }}
            >
                {@render children?.()}
            </div>
        </div>
    </div>

    {#if expandable}
        {#if trigger}
            {@render trigger({ expanded: open, props: triggerProps })}
        {:else}
            <button
                {...triggerProps}
                type="button"
                class="mt-2 inline-flex min-h-[var(--size-control-sm)] items-center gap-1.5 rounded-[var(--radius-md)] px-2 [font-size:var(--font-size-button)] [font-weight:var(--font-weight-button)] text-foreground-muted transition-[background-color,color] duration-[var(--motion-duration-press)] ease-[var(--ease-press)] hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
            >
                <span class="grid text-left">
                    <span
                        class="col-start-1 row-start-1 transition-[opacity,translate] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)] data-[active=false]:opacity-0 data-[active=false]:translate-y-0.5 motion-reduce:transition-none"
                        data-active={!open}
                        aria-hidden={open}
                    >
                        {moreLabel}
                    </span>
                    <span
                        class="col-start-1 row-start-1 transition-[opacity,translate] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)] data-[active=false]:opacity-0 data-[active=false]:translate-y-0.5 motion-reduce:transition-none"
                        data-active={open}
                        aria-hidden={!open}
                    >
                        {lessLabel}
                    </span>
                </span>
                <svg
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    class="transition-transform [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)] data-[open=true]:rotate-180 motion-reduce:transition-none"
                    data-open={open}
                >
                    <path
                        d="m2.5 4.25 3.5 3.5 3.5-3.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        {/if}
    {/if}
</div>
