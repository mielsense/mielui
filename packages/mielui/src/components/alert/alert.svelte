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
    import { alert, alertIcon } from './variants';

    let { variant = 'info', children, class: classProp, ...rest }: AlertProps = $props();

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

<div role="alert" data-ui="alert" {...rest} class={cn(classProp, alert())}>
    <HugeiconsIcon
        icon={Icon}
        class={alertIcon({ variant })}
        size={16}
        strokeWidth={2.25}
        aria-hidden="true"
    />
    {@render children?.()}
</div>
