<script lang="ts">
    import { cn, dynamicWidth, travelingHighlight } from '@mielui/svelte/utils';
    import { Select as BitsSelect } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { overlaySurface } from '../_internal/surface';
    import { getSelectContext } from './context.svelte';

    const context = getSelectContext();

    let {
        surface,
        children,
        class: className,
        dynamic = false
    }: {
        surface?: 'solid' | 'glass';
        children: Snippet;
        class?: string;
        dynamic?: boolean;
    } = $props();
</script>

<BitsSelect.Portal>
    <BitsSelect.Content
        id={`${context.id}-content`}
        forceMount
        sideOffset={6}
        align="start"
        collisionPadding={8}
    >
        {#snippet child({ props, wrapperProps, open })}
            <div
                {...wrapperProps}
                data-overlay-root
                class={cn('z-[130]', !open && 'pointer-events-none!')}
            >
                <div
                    {...props}
                    data-ui="select-content"
                    aria-labelledby={context.triggerId}
                    inert={!open}
                    aria-hidden={!open || undefined}
                    data-state={open ? 'open' : 'closed'}
                    class={cn(
                        className,
                        'mielui-float-frame z-[130] flex min-w-[var(--bits-select-anchor-width)] max-h-[var(--bits-select-content-available-height)] flex-col overflow-hidden text-sm text-foreground shadow-[var(--elevation-float)] outline-none origin-[var(--bits-select-content-transform-origin)] transition-[opacity,filter,visibility,scale,translate] motion-reduce:transition-none',
                        open
                            ? 'visible translate-y-0 scale-100 opacity-100 blur-none [transition-duration:var(--motion-duration-hover),var(--motion-duration-hover),0s,var(--motion-duration-panel-in),var(--motion-duration-panel-in)] [transition-timing-function:var(--ease-out),var(--ease-out),linear,var(--ease-spring-panel),var(--ease-spring-panel)]'
                            : 'invisible -translate-y-[var(--motion-menu-y)] data-[side=top]:translate-y-[var(--motion-menu-y)] scale-[var(--motion-menu-scale-start)] opacity-0 blur-[var(--motion-menu-blur)] [transition-duration:var(--motion-duration-panel-out)] ease-[var(--ease-out)]',
                        overlaySurface(surface)
                    )}
                >
                    <div
                        use:travelingHighlight
                        use:dynamicWidth={{ enabled: dynamic }}
                        class="mielui-inset-surface min-h-0 flex-1 overflow-auto overscroll-contain p-1"
                    >
                        <BitsSelect.Viewport> {@render children?.()} </BitsSelect.Viewport>
                    </div>
                </div>
            </div>
        {/snippet}
    </BitsSelect.Content>
</BitsSelect.Portal>
