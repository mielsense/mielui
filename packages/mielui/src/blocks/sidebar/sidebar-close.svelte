<script lang="ts">
    import { Cancel01Icon } from '@hugeicons/core-free-icons';
    import { Button } from '../../components/button';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { getSidebarPanel } from './context.svelte';
    import type { SidebarCloseProps } from './types';

    let {
        panel,
        children,
        onclick,
        element = $bindable(),
        size = 'icon',
        variant = 'ghost',
        ...rest
    }: SidebarCloseProps = $props();
    const state = getSidebarPanel(() => panel);

    function activate(event: MouseEvent) {
        onclick?.(event);
        if (event.defaultPrevented) {
            return;
        }
        state.close();
        state.restoreFocus();
    }
</script>

{#if !(!state.mobile && state.collapsible === 'none')}
    <Button
        {...rest}
        bind:element
        {size}
        {variant}
        aria-label={rest['aria-label'] ?? `Close ${state.label}`}
        aria-controls={state.domId}
        data-ui="sidebar-close"
        onclick={activate}
    >
        {#if children}
            {@render children()}
        {:else}
            <HugeiconsIcon icon={Cancel01Icon} size={16} />
        {/if}
    </Button>
{/if}
