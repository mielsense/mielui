<script lang="ts">
    import { Cancel01Icon as X } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { getToastContext } from './context.svelte';

    let { children, class: className, onclick, ...rest }: HTMLButtonAttributes = $props();
    const context = getToastContext();
</script>

<button
    aria-label="Dismiss notification"
    {...rest}
    type="button"
    data-ui="toast-close"
    class={cn(className, 'mielui-press absolute top-[calc(var(--mielui-modal-inset)+var(--spacing)*2.5)] right-[calc(var(--mielui-modal-inset)+var(--spacing)*2)] z-10 inline-flex size-[var(--size-control-sm)] shrink-0 items-center justify-center rounded-[var(--radius-control)] text-foreground-muted transition-[background-color,color,box-shadow,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] hover:bg-[var(--color-wash)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none')}
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
