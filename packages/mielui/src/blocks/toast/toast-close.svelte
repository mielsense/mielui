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
    class={cn(className, 'absolute top-1.5 right-1.5 z-10 inline-flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none')}
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
