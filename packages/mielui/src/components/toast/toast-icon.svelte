<script lang="ts">
    import Check from '@lucide/svelte/icons/circle-check';
    import CircleX from '@lucide/svelte/icons/circle-x';
    import Info from '@lucide/svelte/icons/info';
    import Loader from '@lucide/svelte/icons/loader-circle';
    import Warning from '@lucide/svelte/icons/triangle-alert';
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { getToastContext } from './context.svelte';
    import { toastIcon } from './variants';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
    const context = getToastContext();
    const icons = {
        success: Check,
        error: CircleX,
        warning: Warning,
        info: Info,
        loading: Loader,
        default: null
    };
    const Icon = $derived(icons[context.toast.type ?? 'default']);
</script>

{#if children || Icon}
    <span
        {...rest}
        data-ui="toast-icon"
        aria-hidden="true"
        class={cn('inline-flex size-4 shrink-0 items-center justify-center', toastIcon({ type: context.toast.type }), className)}
    >
        {#if children}
            {@render children()}
        {:else if Icon}
            <Icon
                size={16}
                class={context.toast.type === 'loading' ? 'animate-spin motion-reduce:animate-none' : ''}
            />
        {/if}
    </span>
{/if}
