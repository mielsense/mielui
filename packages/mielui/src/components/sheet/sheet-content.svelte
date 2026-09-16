<script lang="ts">
    import { overlaySurface } from '../_internal/surface';
    import { useOverlay } from '@mielui/svelte/components/_internal/overlay';
    import { overlayIn, overlayOut, sheetIn, sheetOut } from '@mielui/svelte/transition';
    import { cn, visualViewportBounds } from '@mielui/svelte/utils';
    import type { SheetContentProps } from '.';
    import { getSheetContext } from './context.svelte';

    let {
        class: className,
        surface = 'solid',
        allowClickOutside = true,
        children,
        side = 'right',
        ...rest
    }: SheetContentProps = $props();

    const { id, state: sheetState } = getSheetContext();
    let element = $state<HTMLElement>();
    let portalEl = $state<HTMLDivElement>();

    /**
     * Portal to `<body>` so the sheet escapes ancestor stacking contexts, the same
     * pattern Dialog uses, and the slide always paints over the page.
     */
    $effect(() => {
        if (!portalEl || typeof document === 'undefined') {
            return;
        }
        document.body.appendChild(portalEl);
        return () => {
            portalEl?.remove();
        };
    });

    /** Shared overlay behavior: focus trap, click-outside, Escape, body lock. */
    useOverlay({
        isOpen: () => sheetState.open,
        panelEl: () => element,
        onClose: () => {
            sheetState.open = false;
        },
        allowClickOutside: () => allowClickOutside,
        returnFocus: () => sheetState.triggerRef ?? undefined
    });
</script>

<!-- Keep the host in body before opening so Safari does not reparent active transitions. -->
<div bind:this={portalEl} use:visualViewportBounds data-overlay-root>
    {#if sheetState.open}
        <div
            class="pointer-events-none fixed inset-x-0 top-[var(--mielui-viewport-top)] z-40 h-[var(--mielui-viewport-height)] [&>*]:pointer-events-auto"
        >
            <div
                in:overlayIn
                out:overlayOut
                data-ui="sheet-overlay"
                class={cn(
                    // token-lint-disable-next-line no-literal-length
                    'mielui-overlay-scrim absolute inset-0'
                )}
                aria-hidden="true"
            ></div>
            <div
                bind:this={element}
                data-ui="sheet-content"
                data-surface={surface}
                data-side={side}
                data-motion="sheet"
                data-orientation="vertical"
                in:sheetIn={{ side }}
                out:sheetOut={{ side }}
                class={cn(
                    className,
                    overlaySurface(surface),
                    // token-lint-disable-next-line no-literal-length
                    `fixed top-[calc(var(--mielui-viewport-top)+0.5rem)] bottom-auto z-50 flex h-[calc(var(--mielui-viewport-height)-1rem)] w-[calc(100%-1rem)] max-w-sm flex-col overflow-hidden text-foreground shadow-[var(--elevation-float)] will-change-transform [backface-visibility:hidden] ${
                        side === 'left' ? 'left-2' : 'right-2'
                    }`,
                    'mielui-modal-frame [--mielui-modal-inset:calc(var(--spacing)*0.5)]'
                )}
                role="dialog"
                aria-modal="true"
                id={`sheet-${id}`}
                aria-labelledby={`${id}-title`}
                aria-describedby={`${id}-desc`}
                tabindex="-1"
                {...rest}
            >
                <div
                    data-ui="sheet-surface"
                    class={cn(
                        'mielui-inset-surface relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-5',
                        '[&_[data-ui=sheet-header]]:pr-8'
                    )}
                >
                    {@render children?.()}
                </div>
            </div>
        </div>
    {/if}
</div>
