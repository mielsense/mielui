<script lang="ts">
    import type { PopoverContentProps } from '@mielui/svelte/components/popover';
    import { cn, inertOutside } from '@mielui/svelte/utils';
    import { Combobox as ComboboxPrimitive, mergeProps } from 'bits-ui';
    import { overlaySurface } from '../_internal/surface';
    import ComboboxSearch from './combobox-search.svelte';
    import { getComboboxContext } from './context.svelte';

    let {
        children,
        id,
        class: className,
        surface,
        surfaceClass,
        allowClickOutside = true,
        dismissLayer = true,
        portal = true,
        refElement,
        role = 'none',
        tabindex = -1,
        focusTrap: _focusTrap,
        lockScroll = true,
        ...rest
    }: PopoverContentProps = $props();
    const context = getComboboxContext();
    const { state } = context;
    const side = $derived.by(() => {
        const placement = refElement ? 'right-start' : context.placement;
        if (placement.startsWith('top')) {
            return 'top';
        }
        if (placement.startsWith('left')) {
            return 'left';
        }
        if (placement.startsWith('right')) {
            return 'right';
        }
        return 'bottom';
    });
    const align = $derived(
        refElement || context.placement.endsWith('start')
            ? 'start'
            : context.placement.endsWith('end')
              ? 'end'
              : 'center'
    );
    const anchor = $derived(
        refElement
            ? {
                  getBoundingClientRect() {
                      return DOMRect.fromRect(refElement?.getBoundingClientRect());
                  }
              }
            : context.anchor
    );

    $effect(() => {
        if (state.open && context.inert && !context.hoverable && context.panel && context.anchor) {
            return inertOutside([context.panel, context.anchor]);
        }
    });
</script>

<ComboboxPrimitive.Portal disabled={!portal}>
    {#if state.open && context.inert && !context.hoverable && allowClickOutside && dismissLayer && state.appearance !== 'input'}
        <div data-overlay-root aria-hidden="true" class="fixed inset-0 z-[129]"></div>
    {/if}
    <ComboboxPrimitive.Content
        {...rest}
        dir={rest.dir === 'auto' ? undefined : rest.dir ?? undefined}
        id={id ?? undefined}
        forceMount
        {side}
        {align}
        sideOffset={6}
        collisionPadding={8}
        customAnchor={anchor}
        preventScroll={state.open && lockScroll && !context.hoverable}
        onInteractOutside={(event) => {
            if (!allowClickOutside || (event.target instanceof Node && context.anchor?.contains(event.target))) {
                event.preventDefault();
                return;
            }
            context.suppressReturnFocus();
        }}
    >
        {#snippet child({ props, wrapperProps, open })}
            <div
                {...wrapperProps}
                data-overlay-root
                class={cn('z-[130]', !open && 'pointer-events-none!')}
            >
                <div
                    {...mergeProps(props, { onmouseenter: context.cancelHover, onmouseleave: context.hoverLeave })}
                    bind:this={context.panel}
                    dir={rest.dir}
                    {role}
                    {tabindex}
                    inert={!open}
                    aria-hidden={!open || undefined}
                    data-ui="combobox-content"
                    data-surface={surface}
                    class={cn(
                        className,
                        overlaySurface(surface),
                        'mielui-float-frame z-[130] flex max-h-[var(--bits-combobox-content-available-height)] max-w-[var(--bits-combobox-content-available-width)] w-[var(--bits-combobox-anchor-width)] min-w-[var(--bits-combobox-anchor-width)] flex-col overflow-hidden text-sm text-foreground shadow-[var(--elevation-float)] outline-none origin-[var(--bits-combobox-content-transform-origin)] motion-reduce:transition-none',
                        open
                            ? 'visible translate-y-0 scale-100 opacity-100 blur-none transition-[opacity,filter,scale,translate] [transition-duration:var(--motion-duration-hover),var(--motion-duration-hover),var(--motion-duration-panel-in),var(--motion-duration-panel-in)] [transition-timing-function:var(--ease-out),var(--ease-out),var(--ease-spring-panel),var(--ease-spring-panel)]'
                            : 'invisible -translate-y-[var(--motion-menu-y)] data-[side=top]:translate-y-[var(--motion-menu-y)] scale-[var(--motion-menu-scale-start)] opacity-0 blur-[var(--motion-menu-blur)] transition-[opacity,filter,scale,translate,visibility] [transition-duration:var(--motion-duration-panel-out)] ease-[var(--ease-out)]'
                    )}
                >
                    <div
                        class={cn(surfaceClass, 'mielui-inset-surface flex min-h-0 flex-1 flex-col overflow-hidden p-0')}
                    >
                        {#if state.searchPlacement === 'menu'}
                            <ComboboxSearch />
                        {/if}
                        {@render children?.()}
                    </div>
                </div>
            </div>
        {/snippet}
    </ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
