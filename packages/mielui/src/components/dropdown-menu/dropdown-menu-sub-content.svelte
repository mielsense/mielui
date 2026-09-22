<script lang="ts">
    import { panelIn, panelOut } from '@mielui/svelte/transition';
    import { cn, dynamicWidth, travelingHighlight } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { overlaySurface } from '../_internal/surface';

    type Props = {
        surface?: 'solid' | 'glass';
        children: Snippet;
        class?: string;
        dynamic?: boolean;
    };

    let { children, class: className, surface, dynamic = false, ...rest }: Props = $props();
</script>

<MenuPrimitive.Portal>
    <MenuPrimitive.SubContent {...rest} forceMount sideOffset={4} align="start">
        {#snippet child({ props, wrapperProps, open })}
            {#if open}
                <div {...wrapperProps} data-overlay-root class="z-[130]">
                    <div
                        {...props}
                        in:panelIn
                        out:panelOut
                        data-ui="dropdown-menu-sub-content"
                        data-surface={surface}
                        class={cn(
                            className,
                            overlaySurface(surface),
                            'mielui-modal-frame z-[130] flex max-h-[var(--bits-floating-available-height)] max-w-[var(--bits-floating-available-width)] min-w-44 origin-[var(--bits-floating-transform-origin)] flex-col overflow-hidden text-sm text-foreground outline-none shadow-[var(--elevation-float)] [--mielui-modal-inset:calc(var(--spacing)*0.5)]'
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
    </MenuPrimitive.SubContent>
</MenuPrimitive.Portal>
