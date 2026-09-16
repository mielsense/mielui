<script lang="ts">
    import { cn, dynamicWidth, travelingHighlight } from '@mielui/svelte/utils';
    import { Select as BitsSelect } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { overlaySurface } from '../_internal/surface';

    let {
        surface = 'solid',
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
    <BitsSelect.Content forceMount sideOffset={6} align="start">
        {#snippet child({ props, wrapperProps, open })}
            <div {...wrapperProps} data-overlay-root class="z-[130]">
                <div
                    {...props}
                    data-ui="select-content"
                    inert={!open}
                    aria-hidden={!open || undefined}
                    data-state={open ? 'open' : 'closed'}
                    class={cn(className, 'mielui-modal-frame z-[130] flex min-w-[var(--bits-select-anchor-width)] max-h-[var(--bits-select-content-available-height)] flex-col overflow-hidden text-sm text-foreground shadow-[var(--elevation-float)] [--mielui-modal-inset:calc(var(--spacing)*0.5)] outline-none origin-[var(--bits-select-content-transform-origin)] transition-[opacity,scale,filter,visibility] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none',
                        open ? 'visible scale-100 opacity-100 blur-none' : 'invisible scale-[0.98] opacity-0 blur-[2px]', overlaySurface(surface))}
                >
                    <div
                        use:travelingHighlight
                        use:dynamicWidth={{ enabled: dynamic }}
                        class="mielui-inset-surface min-h-0 flex-1 overflow-auto overscroll-contain p-1"
                    >
                        <BitsSelect.Viewport>
                            {@render children?.()}
                        </BitsSelect.Viewport>
                    </div>
                </div>
            </div>
        {/snippet}
    </BitsSelect.Content>
</BitsSelect.Portal>
