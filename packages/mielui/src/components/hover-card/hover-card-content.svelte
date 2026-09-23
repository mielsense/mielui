<script lang="ts">
    import { panelIn, panelOut } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { LinkPreview } from 'bits-ui';
    import { getContext } from 'svelte';
    import { overlaySurface } from '../_internal/surface';
    import type { HoverCardContentProps } from '.';

    let {
        class: className,
        children,
        side = 'bottom',
        align = 'center',
        surface,
        ...rest
    }: HoverCardContentProps = $props();
    const context = getContext<{
        id: string;
        state: {
            title: boolean;
            description: boolean;
        };
    }>('mielui-hover-card');
</script>

<LinkPreview.Portal>
    <LinkPreview.Content forceMount {side} {align} sideOffset={8} collisionPadding={8} {...rest}>
        {#snippet child({ props, wrapperProps, open })}
            {#if open}
                <div {...wrapperProps} class="z-[130]">
                    <div
                        {...props}
                        role="dialog"
                        aria-modal="false"
                        data-ui="hover-card-content"
                        data-surface={surface}
                        aria-labelledby={context.state.title ? `${context.id}-title` : undefined}
                        aria-describedby={context.state.description ? `${context.id}-description` : undefined}
                        in:panelIn
                        out:panelOut
                        class={cn(className, overlaySurface(surface), 'mielui-modal-frame z-[130] w-64 max-w-[calc(100vw-var(--spacing)*4)] origin-[var(--bits-link-preview-content-transform-origin)] overflow-hidden text-[var(--font-size-body)] text-foreground shadow-[var(--elevation-float)] [--mielui-modal-inset:calc(var(--spacing)*0.5*var(--mielui-border-inset-scale,1))]')}
                    >
                        <div class="mielui-inset-surface p-3">{@render children?.()}</div>
                    </div>
                </div>
            {/if}
        {/snippet}
    </LinkPreview.Content>
</LinkPreview.Portal>
