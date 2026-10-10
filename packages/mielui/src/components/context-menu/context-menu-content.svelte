<script lang="ts">
    import { panelIn, panelOut } from '@mielui/svelte/transition';
    import { cn, travelingHighlight } from '@mielui/svelte/utils';
    import { ContextMenu as MenuPrimitive } from 'bits-ui';
    import { overlaySurface } from '../_internal/surface';
    import type { ContextMenuContentProps as Props } from '.';

    let { children, class: className, surface, ...rest }: Props = $props();
</script>

<MenuPrimitive.Portal>
    <MenuPrimitive.Content {...rest} forceMount sideOffset={4} collisionPadding={8} align="start">
        {#snippet child({ props, wrapperProps, open })}
            {#if open}
                <div {...wrapperProps} data-overlay-root class="z-[130]">
                    <div
                        {...props}
                        in:panelIn
                        out:panelOut
                        data-ui="context-menu-content"
                        data-surface={surface}
                        class={cn(
                            className,
                            overlaySurface(surface),
                            'mielui-float-frame z-[130] flex max-h-[var(--bits-floating-available-height)] max-w-[var(--bits-floating-available-width)] min-w-48 origin-[var(--bits-floating-transform-origin)] flex-col overflow-hidden text-sm text-foreground outline-none shadow-[var(--elevation-float)]'
                        )}
                    >
                        <div
                            use:travelingHighlight
                            class="mielui-inset-surface flex min-h-0 flex-col overflow-auto overscroll-contain p-1 [&>*]:shrink-0 [&:has([data-destructive]:is(:hover,:focus-visible,[data-highlighted]))>.mielui-item-highlight]:bg-[var(--color-error-soft)]"
                        >
                            {@render children?.()}
                        </div>
                    </div>
                </div>
            {/if}
        {/snippet}
    </MenuPrimitive.Content>
</MenuPrimitive.Portal>
