<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Tabs as BitsTabs } from 'bits-ui';
    import type { TabsListProps } from '.';
    import { getTabsContext } from './context.svelte';
    import { createTabIndicators } from './indicators.svelte';

    let { children, class: className, ...rest }: TabsListProps = $props();
    const tabsState = getTabsContext();

    const variant = $derived(tabsState.variant);
    const vertical = $derived(tabsState.orientation === 'vertical');
    let listEl = $state<HTMLDivElement | null>(null);
    let keyboardDriven = $state(false);
    const indicators = createTabIndicators({
        get element() {
            return listEl;
        },
        get state() {
            return tabsState;
        },
        select: tabsState.select
    });

    type HighlightRect = NonNullable<typeof indicators.indicator>;
    type HighlightStyles = {
        opacity?: number;
        transition?: string;
    };

    const settle = $derived(indicators.ready && !keyboardDriven ? undefined : 'none');
</script>

{#snippet highlight(rect: HighlightRect, classes: string, styles: HighlightStyles)}
    <div
        aria-hidden="true"
        class={classes}
        style:translate={`${rect.left}px ${rect.top}px`}
        style:width={`${rect.width}px`}
        style:height={`${rect.height}px`}
        style:opacity={styles.opacity}
        style:transition={styles.transition}
    ></div>
{/snippet}

<BitsTabs.List
    bind:ref={listEl}
    role="tablist"
    aria-orientation={tabsState.orientation}
    data-ui="tabs-list"
    data-variant={variant}
    data-indicator-ready={indicators.indicator ? '' : undefined}
    class={cn(
        className,
        'relative inline-flex',
        vertical ? 'flex-col items-stretch' : 'items-center',
        variant === 'segmented' &&
            'rounded-[min(var(--radius-control),calc(var(--size-control-sm)/2+var(--spacing)))] bg-secondary p-1',
        variant === 'ghost' && 'gap-1',
        variant === 'default' && (vertical ? 'gap-1 pe-1' : 'gap-1 pb-1')
    )}
    onkeydowncapture={() => {
        keyboardDriven = true;
    }}
    onpointermovecapture={() => {
        keyboardDriven = false;
    }}
    onpointerdowncapture={() => {
        keyboardDriven = false;
    }}
    onmouseover={indicators.handleMouseOver}
    onfocusin={indicators.handleMouseOver}
    onmouseleave={indicators.handleMouseLeave}
    onfocusout={indicators.handleMouseLeave}
    {...rest}
>
    {#if variant === 'default' && indicators.hover}
        {@render highlight(
            indicators.hover,
            'pointer-events-none absolute rounded-[var(--radius-control)] top-0 left-0 bg-[var(--color-wash)] transition-[translate,width,height,opacity] [transition-duration:var(--motion-duration-item),var(--motion-duration-item),var(--motion-duration-item),var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none',
            { opacity: indicators.hovering ? 1 : 0 }
        )}
    {/if}
    {#if variant === 'ghost' && indicators.ghostRect}
        {@render highlight(
            indicators.ghostRect,
            'pointer-events-none absolute rounded-[var(--radius-control)] top-0 left-0 bg-[var(--color-wash)] transition-[translate,width,height] [transition-duration:var(--motion-duration-item)] ease-[var(--ease-out)] motion-reduce:transition-none',
            { transition: settle }
        )}
    {/if}
    {#if indicators.indicator}
        {#if variant === 'default'}
            <div
                aria-hidden="true"
                class={cn(
                    'pointer-events-none absolute rounded-full bg-foreground [transition-duration:var(--motion-duration-item)] ease-[var(--ease-out)] motion-reduce:transition-none',
                    vertical
                        ? 'end-0 top-0 w-[var(--size-hairline)] transition-[translate,height]'
                        : 'bottom-0 left-0 h-[var(--size-hairline)] transition-[translate,width]'
                )}
                style:translate={vertical
                    ? `0 ${indicators.indicator.top}px`
                    : `${indicators.indicator.left}px 0`}
                style:width={vertical ? undefined : `${indicators.indicator.width}px`}
                style:height={vertical ? `${indicators.indicator.height}px` : undefined}
                style:transition={settle}
            ></div>
        {:else if variant === 'segmented'}
            {@render highlight(
                indicators.indicator,
                'mielui-glow mielui-glow-neutral pointer-events-none absolute rounded-[min(calc(var(--radius-control)-var(--spacing)),calc(var(--size-control-sm)/2))] top-0 left-0 shadow-[var(--mielui-glow-shadow)] transition-[translate,width,height] [transition-duration:var(--motion-duration-item)] ease-[var(--ease-out)] motion-reduce:transition-none',
                { transition: settle }
            )}
        {/if}
    {/if}
    {@render children?.()}
</BitsTabs.List>
