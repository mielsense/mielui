<script lang="ts">
    import { PinIcon } from '@hugeicons/core-free-icons';
    import { Button } from '../../components/button';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { getSidebarPanel } from './context.svelte';
    import type { SidebarPinProps } from './types';

    let {
        panel,
        children,
        onclick,
        element = $bindable(),
        size = 'icon',
        variant = 'ghost',
        ...rest
    }: SidebarPinProps = $props();
    const state = getSidebarPanel(() => panel);

    function activate(event: MouseEvent) {
        onclick?.(event);
        if (event.defaultPrevented) {
            return;
        }
        state.setPinned(!state.pinned);
    }
</script>

{#if !(state.mobile || state.collapsible === 'none')}
    <Button
        {...rest}
        bind:element
        {size}
        {variant}
        aria-label={rest['aria-label'] ?? `${state.pinned ? 'Unpin' : 'Pin'} ${state.label}`}
        aria-pressed={state.pinned}
        data-ui="sidebar-pin"
        onclick={activate}
    >
        {#if children}
            {@render children()}
        {:else}
            <HugeiconsIcon icon={PinIcon} size={16} />
        {/if}
    </Button>
{/if}
