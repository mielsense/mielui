<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Tabs as BitsTabs } from 'bits-ui';
    import { getContext } from 'svelte';
    import type { TabsState, TabsTriggerProps } from '.';
    import { toTabIdPart } from './id';

    let {
        children,
        class: className,
        value,
        disabled = false,
        ...rest
    }: TabsTriggerProps = $props();

    const tabsState = getContext<TabsState>('tabs');

    const active = $derived(tabsState.value === value);

    const segmented = $derived(tabsState.variant === 'segmented');
    const vertical = $derived(tabsState.orientation === 'vertical');
    const radiusClass = $derived(
        segmented
            ? 'rounded-[min(calc(var(--radius-control)-var(--spacing)),calc(var(--size-control-sm)/2))]'
            : 'rounded-[var(--radius-control)]'
    );
</script>

<BitsTabs.Trigger
    id={`${tabsState.id}-trigger-${toTabIdPart(value)}`}
    aria-controls={`${tabsState.id}-content-${toTabIdPart(value)}`}
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
        vertical && 'w-full justify-start text-start',
        'mielui-press relative z-10 inline-flex h-[var(--size-control-sm)] items-center justify-center select-none hover:cursor-[var(--ui-cursor-interactive)] px-3 text-sm [font-weight:var(--font-weight-button)] [letter-spacing:var(--tracking-button)] leading-tight transition-[color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]',
        active ? 'text-foreground' : 'text-foreground-muted hover:text-foreground'
    )}
        >
            {@render children?.()}
        </button>
    {/snippet}
</BitsTabs.Trigger>
