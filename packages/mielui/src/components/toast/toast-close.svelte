<script lang="ts">
    import X from '@lucide/svelte/icons/x';
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { getToastContext } from './context.svelte';

    let { children, class: className, onclick, ...rest }: HTMLButtonAttributes = $props();
    const context = getToastContext();
</script>

<button
    aria-label="Dismiss notification"
    {...rest}
    type="button"
    data-ui="toast-close"
    class={cn(className, 'inline-flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none')}
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
        <X size={14} aria-hidden="true" />
    {/if}
</button>
