<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Tabs as BitsTabs } from 'bits-ui';
    import { getContext } from 'svelte';
    import type { TabsListProps, TabsState } from '.';
    import { createTabIndicators } from './indicators.svelte';

    let { children, class: className, ...rest }: TabsListProps = $props();
    const tabsState = getContext<TabsState>('tabs');
    const select = getContext<(value: string) => void>('tabs-selection');

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
        select
    });
</script>

<BitsTabs.List
    bind:ref={listEl}
    role="tablist"
    aria-orientation={tabsState.orientation}
    data-ui="tabs-list"
    data-variant={variant}
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
        <div
            aria-hidden="true"
            class="pointer-events-none absolute rounded-[var(--radius-control)] top-0 left-0 bg-[var(--color-wash)] transition-[translate,width,height,opacity] [transition-duration:var(--motion-duration-item),var(--motion-duration-item),var(--motion-duration-item),var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none"
            style:translate={`${indicators.hover.left}px ${indicators.hover.top}px`}
            style:width={`${indicators.hover.width}px`}
            style:height={`${indicators.hover.height}px`}
            style:opacity={indicators.hovering ? 1 : 0}
        ></div>
    {/if}
    {#if variant === 'ghost' && indicators.ghostRect}
        <div
            aria-hidden="true"
            class="pointer-events-none absolute rounded-[var(--radius-control)] top-0 left-0 bg-[var(--color-wash)] transition-[translate,width,height] [transition-duration:var(--motion-duration-item)] ease-[var(--ease-out)] motion-reduce:transition-none"
            style:translate={`${indicators.ghostRect.left}px ${indicators.ghostRect.top}px`}
            style:width={`${indicators.ghostRect.width}px`}
            style:height={`${indicators.ghostRect.height}px`}
            style:transition={indicators.ready && !keyboardDriven ? undefined : 'none'}
        ></div>
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
                style:transition={indicators.ready && !keyboardDriven ? undefined : 'none'}
            ></div>
        {:else if variant === 'segmented'}
            <div
                aria-hidden="true"
                class="mielui-glow mielui-glow-neutral pointer-events-none absolute rounded-[min(calc(var(--radius-control)-var(--spacing)),calc(var(--size-control-sm)/2))] top-0 left-0 shadow-[var(--mielui-glow-shadow)] transition-[translate,width,height] [transition-duration:var(--motion-duration-item)] ease-[var(--ease-out)] motion-reduce:transition-none"
                style:translate={`${indicators.indicator.left}px ${indicators.indicator.top}px`}
                style:width={`${indicators.indicator.width}px`}
                style:height={`${indicators.indicator.height}px`}
                style:transition={indicators.ready && !keyboardDriven ? undefined : 'none'}
            ></div>
        {/if}
    {/if}
    {@render children?.()}
</BitsTabs.List>
