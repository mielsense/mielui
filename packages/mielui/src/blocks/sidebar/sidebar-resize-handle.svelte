<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getSidebarPanel } from './context.svelte';
    import { resizeHandle } from './resize';
    import type { SidebarResizeHandleProps } from './types';

    let {
        panel,
        element = $bindable(),
        class: className,
        onkeydown,
        onpointerdown,
        onpointermove,
        onpointerup,
        onpointercancel,
        onlostpointercapture,
        ...rest
    }: SidebarResizeHandleProps = $props();
    const state = getSidebarPanel(() => panel);
    const resize = resizeHandle(state, {
        get onkeydown() {
            return onkeydown;
        },
        get onpointerdown() {
            return onpointerdown;
        },
        get onpointermove() {
            return onpointermove;
        },
        get onpointerup() {
            return onpointerup;
        },
        get onpointercancel() {
            return onpointercancel;
        },
        get onlostpointercapture() {
            return onlostpointercapture;
        }
    });
</script>

{#if !state.mobile && !state.collapsed}
    <button
        type="button"
        {...rest}
        bind:this={element}
        {@attach resize}
        data-ui="sidebar-resize-handle"
        role="separator"
        aria-orientation="vertical"
        aria-label={rest['aria-label'] ?? `Resize ${state.label}`}
        aria-controls={state.domId}
        aria-valuenow={Math.round(state.width)}
        aria-valuemin={state.minWidth}
        aria-valuemax={state.maxWidth}
        tabindex="0"
        class={cn(className, 'absolute inset-y-0 z-40 w-2 touch-none cursor-col-resize outline-none before:absolute before:inset-y-2 before:start-1/2 before:w-[length:var(--border-size)] before:bg-transparent hover:before:bg-primary focus-visible:before:bg-primary focus-visible:before:shadow-[var(--focus-ring)]', state.side === 'start' ? '-end-1' : '-start-1')}
    ></button>
{/if}
