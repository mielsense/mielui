<script lang="ts">
    import { panelIn, panelOut } from '@mielui/svelte/transition';
    import { cn, dynamicWidth, travelingHighlight } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { overlaySurface } from '../_internal/surface';
    import type { PopoverContentProps } from '../popover';

    type Props = {
        children: Snippet;
        class?: string;
        dynamic?: boolean;
    } & Omit<PopoverContentProps, 'children' | 'class' | 'surfaceClass'>;

    let {
        children,
        class: className,
        surface,
        dynamic = false,
        allowClickOutside = true,
        portal = true,
        focusTrap = false,
        lockScroll = false,
        dismissLayer = true,
        refElement,
        role = 'menu',
        tabindex = -1,
        ...rest
    }: Props = $props();
    const customAnchor = $derived(
        refElement
            ? {
                  getBoundingClientRect() {
                      return DOMRect.fromRect(refElement?.getBoundingClientRect());
                  }
              }
            : null
    );
</script>

<MenuPrimitive.Portal disabled={!portal}>
    <MenuPrimitive.Content
        {...rest}
        forceMount
        sideOffset={4}
        side={refElement ? 'right' : 'bottom'}
        {customAnchor}
        align="start"
        trapFocus={focusTrap}
        preventScroll={lockScroll}
        onInteractOutside={(event) => {
            if (!allowClickOutside) {
                event.preventDefault();
            }
        }}
    >
        {#snippet child({ props, wrapperProps, open })}
            {#if open}
                {#if dismissLayer && allowClickOutside}
                    <div data-overlay-root aria-hidden="true" class="fixed inset-0 z-[129]"></div>
                {/if}
                <div {...wrapperProps} data-overlay-root class="z-[130]">
                    <div
                        {...props}
                        {role}
                        {tabindex}
                        in:panelIn
                        out:panelOut
                        data-ui="dropdown-menu-content"
                        data-surface={surface}
                        class={cn(
                            className,
                            overlaySurface(surface),
                            'mielui-modal-frame z-[130] flex max-h-[var(--bits-floating-available-height)] max-w-[var(--bits-floating-available-width)] min-w-44 origin-[var(--bits-floating-transform-origin)] flex-col overflow-hidden text-sm text-foreground outline-none shadow-[var(--elevation-float)] [--mielui-modal-inset:calc(var(--spacing)*0.5)]',
                            'min-w-[var(--bits-floating-anchor-width)]'
                        )}
                    >
                        <div
                            use:travelingHighlight
                            use:dynamicWidth={{ enabled: dynamic }}
                            class="mielui-inset-surface flex min-h-0 flex-col overflow-auto overscroll-contain p-1 [&>*]:shrink-0"
                        >
                            {@render children?.()}
                        </div>
                    </div>
                </div>
            {/if}
        {/snippet}
    </MenuPrimitive.Content>
</MenuPrimitive.Portal>
