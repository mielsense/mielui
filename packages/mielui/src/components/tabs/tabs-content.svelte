<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Tabs as BitsTabs } from 'bits-ui';
    import { getContext } from 'svelte';
    import type { TabsContentProps, TabsState } from '.';
    import { toTabIdPart } from './id';

    let {
        children,
        class: className,
        value,
        forceMount = false,
        ...rest
    }: TabsContentProps = $props();

    const tabsState = getContext<TabsState>('tabs');

    const active = $derived(tabsState.value === value);
</script>

{#if forceMount || active}
    <BitsTabs.Content
        id={`${tabsState.id}-content-${toTabIdPart(value)}`}
        aria-labelledby={`${tabsState.id}-trigger-${toTabIdPart(value)}`}
        {value}
        data-ui="tabs-content"
        data-state={active ? 'active' : 'inactive'}
        hidden={!active}
        tabindex={0}
        class={cn(
            className,
            tabsState.orientation === 'vertical' && 'min-w-0 flex-1',
            'focus-visible:outline-none'
        )}
        {...rest}
    >
        {@render children?.()}
    </BitsTabs.Content>
{/if}
