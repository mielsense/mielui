<script lang="ts">
    import {
        CheckmarkCircle02Icon as Check,
        InformationCircleIcon as Info,
        Alert02Icon as Warning,
        CancelCircleIcon as X
    } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { AlertProps, AlertVariant } from '.';
    import { alert, alertIcon, alertIconSlot, alertSurface } from './variants';

    let {
        variant = 'info',
        icon,
        announcement = 'off',
        children,
        class: className,
        ...rest
    }: AlertProps = $props();

    const icons = {
        info: Info,
        error: X,
        success: Check,
        warning: Warning
    } satisfies Record<AlertVariant, typeof Info>;
    const roles = {
        off: undefined,
        polite: 'status',
        assertive: 'alert'
    } as const;

    const live = $derived(announcement !== 'off');
</script>

<div
    {...rest}
    role={roles[announcement]}
    aria-live={live ? announcement : undefined}
    aria-atomic={live || undefined}
    data-ui="alert"
    class={cn(className, alert())}
>
    <div data-ui="alert-surface" class={alertSurface()}>
        {#if icon}
            <span data-alert-icon class={alertIconSlot()}> {@render icon()} </span>
        {:else if icon !== false}
            <span data-alert-icon class={alertIconSlot()}>
                <HugeiconsIcon
                    icon={icons[variant]}
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
