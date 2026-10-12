<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Tabs as BitsTabs } from 'bits-ui';
    import type { TabsContentProps } from '.';
    import { getTabsContext } from './context.svelte';
    import { tabContentId, tabTriggerId } from './id';

    let {
        children,
        class: className,
        value,
        forceMount = false,
        ...rest
    }: TabsContentProps = $props();

    const tabsState = getTabsContext();

    const active = $derived(tabsState.value === value);
</script>

{#if forceMount || active}
    <BitsTabs.Content
        id={tabContentId(tabsState.id, value)}
        aria-labelledby={tabTriggerId(tabsState.id, value)}
        {value}
        data-ui="tabs-content"
        data-state={active ? 'active' : 'inactive'}
        hidden={!active}
        tabindex={0}
        class={cn(
            className,
            tabsState.orientation === 'vertical' && 'min-w-0 flex-1',
            'rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]'
        )}
        {...rest}
    >
        {@render children?.()}
    </BitsTabs.Content>
{/if}
