<script lang="ts">
    import {
        CheckmarkCircle02Icon as Check,
        InformationCircleIcon as Info,
        Alert02Icon as Warning,
        CancelCircleIcon as X
    } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { AlertProps } from '.';
    import { alert, alertIcon, alertIconSlot, alertSurface } from './variants';

    let {
        variant = 'info',
        icon,
        announcement = 'off',
        children,
        class: classProp,
        ...rest
    }: AlertProps = $props();

    const Icon = $derived(
        variant === 'success'
            ? Check
            : variant === 'error'
              ? X
              : variant === 'warning'
                ? Warning
                : Info
    );
</script>

<div
    {...rest}
    role={announcement === 'assertive' ? 'alert' : announcement === 'polite' ? 'status' : undefined}
    aria-live={announcement === 'off' ? undefined : announcement}
    aria-atomic={announcement === 'off' ? undefined : true}
    data-ui="alert"
    class={cn(classProp, alert())}
>
    <div data-ui="alert-surface" class={alertSurface()}>
        {#if icon}
            <span data-alert-icon class={alertIconSlot()}>
                {@render icon()}
            </span>
        {:else if icon !== false}
            <span data-alert-icon class={alertIconSlot()}>
                <HugeiconsIcon
                    icon={Icon}
                    class={alertIcon({ variant })}
                    size={16}
                    strokeWidth={2.25}
                    aria-hidden="true"
                />
            </span>
        {/if}
        {@render children?.()}
    </div>
</div>
