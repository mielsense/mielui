<script lang="ts">
    import { Cancel01Icon as X } from '@hugeicons/core-free-icons';
    import { cn, pressable } from '@mielui/svelte/utils';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { findToastLabels, getToastContext } from './context';

    let { children, class: className, onclick, ...rest }: HTMLButtonAttributes = $props();
    const context = getToastContext();
    const labels = findToastLabels();
</script>

<button
    aria-label={labels?.()?.dismiss ?? 'Dismiss notification'}
    {...rest}
    type="button"
    use:pressable
    data-ui="toast-close"
    class={cn(
        className,
        'mielui-press absolute top-1.5 right-1.5 z-10 inline-flex size-[var(--size-control-sm)] shrink-0 items-center justify-center rounded-[var(--radius-control)] text-foreground-muted transition-[scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)] hover:bg-[var(--color-wash)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none'
    )}
    onclick={(event) => {
        onclick?.(event);
        if (!event.defaultPrevented) {
            context.toast.exit?.();
        }
    }}
>
    {#if children}
        {@render children()}
    {:else}
        <HugeiconsIcon icon={X} size={14} aria-hidden="true" />
    {/if}
</button>
