<script lang="ts">
    import { cn, visualViewportBounds } from '@mielui/svelte/utils';
    import type { ToastLabels } from '.';
    import { setToastLabels } from './context';
    import { getToastPrimaryHostId, setToastUIState } from './lib.svelte';
    import NotchHost from './notch-host.svelte';
    import { createToastStack } from './stack.svelte';
    import Toast from './toast.svelte';
    import { toastIn, toastOut } from './transitions';

    let {
        variant = 'default',
        side = 'top',
        labels
    }: {
        variant?: 'default' | 'notch';
        side?: 'top' | 'bottom' | 'left' | 'right';
        /**
         * Overrides the built-in text and accessible names. Every key is optional and English is
         * the fallback.
         */
        labels?: ToastLabels;
    } = $props();

    setToastLabels(() => labels);

    const { state: toastState, hostId } = setToastUIState();
    const isPrimary = $derived(getToastPrimaryHostId() === hostId);

    const stack = createToastStack({
        get toasts() {
            return toastState.data.toasts;
        }
    });
    let portalEl = $state<HTMLDivElement>();

    $effect(() => {
        if (!portalEl || typeof document === 'undefined') {
            return;
        }
        document.body.appendChild(portalEl);
        return () => {
            portalEl?.remove();
        };
    });

    const viewportClass =
        // token-lint-disable-next-line no-literal-length: safe-area fallbacks
        'pointer-events-none fixed inset-x-0 top-[var(--mielui-viewport-top)] z-200 flex h-[var(--mielui-viewport-height)] items-end justify-center px-[max(1rem,env(safe-area-inset-right))] pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:justify-end sm:p-6';
    const stackClass =
        // token-lint-disable-next-line no-literal-length: toast stack max width
        'pointer-events-auto relative w-full max-w-[min(100%,26rem)] transition-[height] [transition-duration:var(--motion-duration-toast-in)] ease-[var(--ease-out)] motion-reduce:transition-none sm:max-w-90';
</script>

{#if isPrimary && variant === 'notch'}
    <NotchHost toasts={toastState.data.toasts} {side} {labels} />
{:else if isPrimary}
    <div bind:this={portalEl} use:visualViewportBounds data-overlay-root class={viewportClass}>
        <div
            role="region"
            aria-label={labels?.region ?? 'Notifications'}
            class={stackClass}
            style:height={`${stack.height}px`}
            onmouseenter={() => {
                stack.hovered = true;
            }}
            onmouseleave={() => {
                stack.hovered = false;
            }}
            onfocusin={() => {
                stack.focused = true;
            }}
            onfocusout={(event) => {
                stack.focused =
                    event.relatedTarget instanceof Node &&
                    event.currentTarget.contains(event.relatedTarget);
            }}
        >
            {#each stack.toasts as toast, i (toast.id)}
                <div
                    inert={stack.hidden(i)}
                    class={cn(
                        'absolute bottom-0 w-full transition-[transform,opacity] [transition-duration:var(--motion-duration-toast-in)] ease-[var(--ease-out)] motion-reduce:transition-none',
                        stack.hidden(i) ? 'pointer-events-none' : 'pointer-events-auto'
                    )}
                    style:transform={stack.transform(i)}
                    style:opacity={stack.opacity(i)}
                    style:z-index={stack.toasts.length - i}
                    bind:clientHeight={stack.heights[toast.id ?? -1]}
                >
                    <div
                        in:toastIn
                        out:toastOut
                        onoutrostart={(event) => {
                            event.currentTarget.inert = true;
                        }}
                    >
                        <Toast {toast} />
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}
