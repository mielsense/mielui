<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Tabs as BitsTabs } from 'bits-ui';
    import type { TabsTriggerProps } from '.';
    import { getTabsContext } from './context';
    import { tabContentId, tabTriggerId } from './id';

    let {
        children,
        class: className,
        value,
        disabled = false,
        ...rest
    }: TabsTriggerProps = $props();

    const tabsState = getTabsContext();

    const active = $derived(tabsState.value === value);

    const segmented = $derived(tabsState.variant === 'segmented');
    const vertical = $derived(tabsState.orientation === 'vertical');
    const fallbackClasses = {
        ghost: '[[data-ui=tabs-list]:not([data-indicator-ready])_&]:bg-[var(--color-wash)]',
        segmented:
            '[[data-ui=tabs-list]:not([data-indicator-ready])_&]:bg-[var(--color-card)] [[data-ui=tabs-list]:not([data-indicator-ready])_&]:shadow-[0_0_0_var(--border-size)_var(--color-border)] dark:[[data-ui=tabs-list]:not([data-indicator-ready])_&]:bg-[color-mix(in_srgb,var(--color-foreground)_16%,var(--color-card))]',
        horizontal:
            '[[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:absolute [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:inset-x-0 [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:-bottom-1 [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:h-[var(--size-hairline)] [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:rounded-full [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:bg-foreground',
        vertical:
            '[[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:absolute [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:inset-y-0 [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:-end-1 [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:w-[var(--size-hairline)] [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:rounded-full [[data-ui=tabs-list]:not([data-indicator-ready])_&]:after:bg-foreground'
    };
    const fallbackClass = $derived.by(() => {
        if (!active) {
            return undefined;
        }
        if (tabsState.variant === 'default') {
            return vertical ? fallbackClasses.vertical : fallbackClasses.horizontal;
        }

        return fallbackClasses[tabsState.variant];
    });
    const radiusClass = $derived(
        segmented
            ? 'rounded-[min(calc(var(--radius-control)-var(--spacing)),calc(var(--size-control-sm)/2))]'
            : 'rounded-[var(--radius-control)]'
    );
</script>

<BitsTabs.Trigger
    id={tabTriggerId(tabsState.id, value)}
    aria-controls={tabContentId(tabsState.id, value)}
    {value}
    {disabled}
    {...rest}
>
    {#snippet child({ props })}
        <button
            {...props}
            type="button"
            use:pressable
            data-ui="tabs-trigger"
            data-state={active ? 'active' : 'inactive'}
            {disabled}
            class={cn(
                className,
                radiusClass,
                fallbackClass,
                vertical && 'w-full justify-start text-start',
                'mielui-press relative z-10 inline-flex h-[var(--size-control-sm)] items-center justify-center select-none hover:cursor-[var(--ui-cursor-interactive)] px-3 text-sm [letter-spacing:var(--tracking-button)] leading-tight transition-[color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]',
                active ? 'text-foreground' : 'text-foreground-muted hover:text-foreground',
                active || tabsState.variant === 'default'
                    ? '[font-weight:var(--font-weight-button)]'
                    : '[font-weight:var(--font-weight-body)]'
            )}
        >
            {@render children?.()}
        </button>
    {/snippet}
</BitsTabs.Trigger>
