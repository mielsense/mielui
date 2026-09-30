<script lang="ts">
    import { PanelLeftIcon } from '@hugeicons/core-free-icons';
    import { Button } from '../../components/button';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { getSidebarPanel } from './context.svelte';
    import type { SidebarTriggerProps } from './types';

    let {
        panel,
        children,
        onclick,
        element = $bindable(),
        size = 'icon',
        variant = 'ghost',
        ...rest
    }: SidebarTriggerProps = $props();
    const state = getSidebarPanel(() => panel);

    function activate(event: MouseEvent) {
        onclick?.(event);
        if (event.defaultPrevented) {
            return;
        }
        state.rememberTrigger(event.currentTarget as HTMLElement);
        state.toggle();
    }
</script>

{#if !(!state.mobile && state.collapsible === 'none')}
    <Button
        {...rest}
        bind:element
        {size}
        {variant}
        aria-label={rest['aria-label'] ?? `${state.mobile ? state.mobileOpen ? 'Close' : 'Open' : state.open ? 'Collapse' : 'Expand'} ${state.label}`}
        aria-expanded={state.mobile ? state.mobileOpen : state.open}
        aria-controls={state.domId}
        data-ui="sidebar-trigger"
        onclick={activate}
    >
        {#if children}
            {@render children()}
        {:else}
            <HugeiconsIcon icon={PanelLeftIcon} size={16} />
        {/if}
    </Button>
{/if}
