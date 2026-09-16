<script lang="ts">
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import Check from '@hugeicons/core-free-icons/CheckmarkCircle02Icon';
    import X from '@hugeicons/core-free-icons/CancelCircleIcon';
    import Info from '@hugeicons/core-free-icons/InformationCircleIcon';
    import Warning from '@hugeicons/core-free-icons/Alert02Icon';
    import { cn } from '@mielui/svelte/utils';
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
