<script lang="ts">
    import { Cancel01Icon as Close } from '@hugeicons/core-free-icons';
    import Button from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { lockBodyScroll } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import { stayOnPage } from './stay-on-page';

    const OPEN_LAYER =
        '[data-bits-floating-content-wrapper] [data-state="open"], [data-dialog-panel], [data-ui="sheet-content"], [data-ui="popover-content"]';

    let {
        open = $bindable(false),
        returnFocus,
        controls,
        children
    }: {
        open?: boolean;
        returnFocus?: HTMLElement;
        controls?: Snippet;
        children: Snippet;
    } = $props();

    let closeButton = $state<HTMLButtonElement | HTMLAnchorElement>();

    function toBody(node: HTMLElement) {
        document.body.appendChild(node);

        return () => {
            node.remove();
        };
    }

    function layerIsOpen() {
        return Boolean(document.querySelector(OPEN_LAYER));
    }

    $effect(() => {
        if (!open) {
            return;
        }

        const releaseScroll = lockBodyScroll();
        const returnTo = returnFocus;

        function onKeydown(event: KeyboardEvent) {
            if (event.key === 'Escape' && !layerIsOpen()) {
                open = false;
            }
        }

        window.addEventListener('keydown', onKeydown, true);
        closeButton?.focus({ preventScroll: true });

        return () => {
            window.removeEventListener('keydown', onKeydown, true);
            releaseScroll();
            returnTo?.focus({ preventScroll: true });
        };
    });
</script>

{#if open}
    <div
        {@attach toBody}
        role="dialog"
        aria-modal="true"
        aria-label="Preview"
        data-preview-fullscreen
        class="fixed inset-0 z-[90] flex flex-col bg-background text-foreground"
    >
        <div
            class="flex min-h-12 shrink-0 items-center justify-between gap-3 px-3 [--size-icon-md:var(--size-control-sm)]"
        >
            <div class="flex min-w-0 items-center gap-1 overflow-x-auto p-1">
                {@render controls?.()}
            </div>
            <Button
                bind:element={closeButton}
                size="icon"
                variant="ghost"
                class="shrink-0 text-foreground-muted hover:text-foreground"
                aria-label="Close full screen"
                onclick={() => {
                    open = false;
                }}
            >
                <HugeiconsIcon icon={Close} size={16} />
            </Button>
        </div>
        <div
            role="presentation"
            onclickcapture={stayOnPage}
            class="flex min-h-0 flex-1 items-center justify-center overflow-auto p-6 has-[iframe]:p-0 sm:p-10"
        >
            {@render children()}
        </div>
    </div>
{/if}
