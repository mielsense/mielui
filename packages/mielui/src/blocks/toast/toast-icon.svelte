<script lang="ts">
    import {
        CheckmarkCircle02Icon as Check,
        CancelCircleIcon as CircleX,
        InformationCircleIcon as Info,
        Loading03Icon as Loader,
        Alert02Icon as Warning
    } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
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
        use:morph={{ key: context.toast.type }}
        aria-hidden="true"
        class={cn(className, 'inline-flex size-4 shrink-0 items-center justify-center', toastIcon({ type: context.toast.type }))}
    >
        {#if children}
            {@render children()}
        {:else if Icon}
            <HugeiconsIcon
                icon={Icon}
                size={16}
                class={context.toast.type === 'loading' ? 'animate-spin motion-reduce:animate-none' : ''}
            />
        {/if}
    </span>
{/if}
