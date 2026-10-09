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
    onmouseover={indicators.handleMouseOver}
    onfocusin={indicators.handleMouseOver}
    onmouseleave={indicators.handleMouseLeave}
    onfocusout={indicators.handleMouseLeave}
    {...rest}
>
    {#if variant === 'default' && indicators.hover}
        <div
            aria-hidden="true"
            class="pointer-events-none absolute rounded-[var(--radius-control)] bg-[var(--color-wash)] transition-[left,top,width,height,opacity] [transition-duration:var(--motion-duration-spring),var(--motion-duration-spring),var(--motion-duration-spring),var(--motion-duration-spring),var(--motion-duration-hover)] [transition-timing-function:var(--ease-spring-layout),var(--ease-spring-layout),var(--ease-spring-layout),var(--ease-spring-layout),var(--ease-out)] motion-reduce:transition-none"
            style:left={`${indicators.hover.left}px`}
            style:top={`${indicators.hover.top}px`}
            style:width={`${indicators.hover.width}px`}
            style:height={`${indicators.hover.height}px`}
            style:opacity={indicators.hovering ? 1 : 0}
        ></div>
    {/if}
    {#if variant === 'ghost' && indicators.ghostRect}
        <div
            aria-hidden="true"
            class="pointer-events-none absolute rounded-[var(--radius-control)] bg-[var(--color-wash)] transition-[left,top,width,height] [transition-duration:var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none"
            style:left={`${indicators.ghostRect.left}px`}
            style:top={`${indicators.ghostRect.top}px`}
            style:width={`${indicators.ghostRect.width}px`}
            style:height={`${indicators.ghostRect.height}px`}
            style:transition={indicators.ready ? undefined : 'none'}
        ></div>
    {/if}
    {#if indicators.indicator}
        {#if variant === 'default'}
            <div
                aria-hidden="true"
                class={cn(
                    'pointer-events-none absolute rounded-full bg-foreground [transition-duration:var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none',
                    vertical
                        ? 'end-0 w-[var(--size-hairline)] transition-[top,height]'
                        : 'bottom-0 h-[var(--size-hairline)] transition-[left,width]'
                )}
                style:left={vertical ? undefined : `${indicators.indicator.left}px`}
                style:top={vertical ? `${indicators.indicator.top}px` : undefined}
                style:width={vertical ? undefined : `${indicators.indicator.width}px`}
                style:height={vertical ? `${indicators.indicator.height}px` : undefined}
                style:transition={indicators.ready ? undefined : 'none'}
            ></div>
        {:else if variant === 'segmented'}
            <div
                aria-hidden="true"
                class="mielui-glow mielui-glow-neutral pointer-events-none absolute rounded-[min(calc(var(--radius-control)-var(--spacing)),calc(var(--size-control-sm)/2))] shadow-[var(--mielui-glow-shadow)] transition-[left,top,width,height] [transition-duration:var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none"
                style:left={`${indicators.indicator.left}px`}
                style:top={`${indicators.indicator.top}px`}
                style:width={`${indicators.indicator.width}px`}
                style:height={`${indicators.indicator.height}px`}
                style:transition={indicators.ready ? undefined : 'none'}
            ></div>
        {/if}
    {/if}
    {@render children?.()}
</BitsTabs.List>
