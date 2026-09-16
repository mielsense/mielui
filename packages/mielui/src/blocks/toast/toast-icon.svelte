<script lang="ts">
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import Check from '@hugeicons/core-free-icons/CheckmarkCircle02Icon';
    import CircleX from '@hugeicons/core-free-icons/CancelCircleIcon';
    import Info from '@hugeicons/core-free-icons/InformationCircleIcon';
    import Loader from '@hugeicons/core-free-icons/Loading03Icon';
    import Warning from '@hugeicons/core-free-icons/Alert02Icon';
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
