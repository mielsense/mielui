<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { fromAction } from 'svelte/attachments';
    import * as Tooltip from '../../components/tooltip';
    import { getSidebarPanel } from './context.svelte';
    import { navigationClass } from './navigation';
    import type { SidebarButtonProps } from './types';

    let {
        label,
        leading,
        trailing,
        children,
        class: className,
        element = $bindable(),
        type = 'button',
        ...rest
    }: SidebarButtonProps = $props();
    const panel = getSidebarPanel();
    const tooltipSide = $derived(
        (panel.side === 'start') === (panel.direction === 'ltr') ? 'right' : 'left'
    );
</script>

<Tooltip.Root placement={tooltipSide}>
    <Tooltip.Trigger class="flex w-full">
        <button
            {...rest}
            {type}
            bind:this={element}
            {@attach fromAction(pressable)}
            aria-label={rest['aria-label'] ?? label}
            data-ui="sidebar-button"
            class={cn(className, navigationClass, panel.collapsed ? 'justify-center px-0' : undefined)}
        >
            {#if leading}
                <span
                    aria-hidden="true"
                    class="inline-flex size-5 shrink-0 items-center justify-center"
                >
                    {@render leading()}
                </span>
            {/if}
            <span
                class={cn('min-w-0 flex-1 truncate text-start', panel.collapsed ? leading ? 'hidden' : 'sr-only' : undefined)}
            >
                {#if children}
                    {@render children()}
                {:else}
                    {label}
                {/if}
            </span>
            {#if panel.collapsed && !leading}
                <span
                    aria-hidden="true"
                    class="inline-flex size-5 shrink-0 items-center justify-center"
                >
                    {label.slice(0, 1)}
                </span>
            {/if}
            {#if trailing}
                <span
                    class={cn('ms-auto inline-flex shrink-0 items-center text-foreground-muted', panel.collapsed ? 'hidden' : undefined)}
                >
                    {@render trailing()}
                </span>
            {/if}
        </button>
    </Tooltip.Trigger>
    <Tooltip.Content>
        {#if panel.collapsed}
            {label}
        {/if}
    </Tooltip.Content>
</Tooltip.Root>
