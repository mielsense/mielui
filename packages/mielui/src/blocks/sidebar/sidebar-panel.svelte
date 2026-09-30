<script lang="ts">
    import { motion } from '@humanspeak/svelte-motion';
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import { overlaySurface } from '../../components/_internal/surface';
    import * as Sheet from '../../components/sheet';
    import { getSidebarRoot } from './context.svelte';
    import { createPanel } from './panel.svelte';
    import type { SidebarPanelProps } from './types';

    let {
        id,
        label,
        side = 'start',
        variant = 'default',
        collapsible = 'rail',
        open = $bindable(true),
        mobileOpen = $bindable(false),
        pinned = $bindable(true),
        width = $bindable(256),
        railWidth = 56,
        minWidth = 160,
        maxWidth = 480,
        children,
        rail,
        class: className,
        element = $bindable(),
        onOpenChange,
        onMobileOpenChange,
        onPinnedChange,
        onWidthChange,
        ...rest
    }: SidebarPanelProps = $props();
    const root = getSidebarRoot();
    const controller = createPanel(
        () => ({
            id,
            label,
            side,
            variant,
            collapsible,
            open,
            mobileOpen,
            pinned,
            width,
            railWidth,
            minWidth,
            maxWidth,
            rail,
            onOpenChange,
            onMobileOpenChange,
            onPinnedChange,
            onWidthChange
        }),
        {
            open(value) {
                open = value;
            },
            mobileOpen(value) {
                mobileOpen = value;
            },
            pinned(value) {
                pinned = value;
            },
            width(value) {
                width = value;
            }
        },
        () => element
    );
    const panel = controller.state;
    let shown = $state(untrack(() => !controller.hidden));
    $effect(() => {
        if (!controller.hidden) {
            shown = true;
        } else if (controller.transition.duration === 0) {
            shown = false;
        }
    });
    function finishMotion() {
        if (controller.hidden) {
            shown = false;
        }
    }
</script>

{#snippet body()}
    {@render children?.()}
{/snippet}

{#if root.mobile}
    <Sheet.Root open={mobileOpen} onOpenChange={panel.setMobileOpen}>
        <Sheet.Content
            {...rest}
            {...{ id: panel.domId, dir: root.direction, 'aria-label': label, style: `${root.themeStyle}${rest.style ?? ''};--sidebar-width:${panel.width}px;` }}
            side={controller.physicalSide}
            class={cn(className, 'w-[var(--sidebar-width)] max-w-[calc(100%-var(--spacing)*4)] [&_[data-ui=sheet-surface]]:gap-0 [&_[data-ui=sheet-surface]]:overflow-hidden [&_[data-ui=sheet-surface]]:p-0')}
        >
            <div
                bind:this={element}
                data-ui="sidebar-panel"
                data-side={side}
                data-variant={variant}
                data-collapsed="false"
                class="group/sidebar flex h-full min-h-0 flex-col"
            >
                {@render body()}
            </div>
        </Sheet.Content>
    </Sheet.Root>
{:else}
    <motion.div
        initial={false}
        animate={{ width: controller.footprint }}
        transition={controller.transition}
        data-ui="sidebar-slot"
        data-side={side}
        class={cn('relative flex min-h-0 shrink-0', controller.overlay ? 'z-30' : undefined)}
    >
        <motion.div
            initial={false}
            animate={{ opacity: controller.hidden ? 0 : 1, x: controller.hidden ? controller.physicalSide === 'left' ? -12 : 12 : 0 }}
            transition={controller.transition}
            onAnimationComplete={finishMotion}
            class={cn('absolute inset-y-0', side === 'start' ? 'start-0' : 'end-0')}
            style={`width:${controller.panelWidth}px;visibility:${shown ? 'visible' : 'hidden'};`}
        >
            <aside
                {...rest}
                bind:this={element}
                id={panel.domId}
                aria-label={label}
                aria-hidden={controller.hidden}
                inert={controller.hidden}
                data-ui="sidebar-panel"
                data-side={side}
                data-variant={variant}
                data-collapsed={panel.collapsed && collapsible === 'rail'}
                data-pinned={pinned}
                data-overlay-root={controller.overlay ? '' : undefined}
                class={cn(className, 'group/sidebar absolute inset-y-0 flex min-h-0 flex-col text-foreground', side === 'start' ? 'start-0' : 'end-0', controller.framed ? 'mielui-inset-frame' : 'bg-background', variant === 'floating' || controller.overlay ? 'shadow-[var(--elevation-float)]' : undefined, controller.overlay ? overlaySurface(undefined) : undefined, controller.hidden ? 'pointer-events-none' : undefined)}
                style:width={`${controller.panelWidth}px`}
                style:overflow="visible"
            >
                <div
                    aria-hidden={controller.customRail}
                    inert={controller.customRail}
                    class={cn('flex min-h-0 flex-1 flex-col', controller.customRail ? 'hidden' : undefined)}
                >
                    {@render body()}
                </div>
                {#if controller.customRail}
                    <div class="flex min-h-0 flex-1 flex-col">{@render rail?.()}</div>
                {/if}
            </aside>
        </motion.div>
    </motion.div>
{/if}
