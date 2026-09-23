<script lang="ts">
    import { Calendar03Icon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { button } from '../button/variants';
    import { getDatePickerContext } from '../date-picker/context.svelte';

    let {
        class: className,
        children,
        disabled = false,
        ref = $bindable(null),
        'aria-label': ariaLabel,
        ...rest
    }: Omit<DatePickerPrimitive.TriggerProps, 'child'> = $props();
    const context = getDatePickerContext();
</script>

<DatePickerPrimitive.Trigger
    {...rest}
    bind:ref
    disabled={disabled || context.disabled}
    data-ui="date-picker-trigger"
    aria-label={ariaLabel ?? (children ? undefined : 'Choose date')}
    class={cn(className, 'shrink-0 hover:bg-[color-mix(in_srgb,var(--color-secondary)_88%,var(--color-foreground))] data-[state=open]:bg-[color-mix(in_srgb,var(--color-secondary)_88%,var(--color-foreground))]', !children && 'h-[var(--size-control-md)] w-[var(--size-control-md)]', button({ variant: 'outline', size: children ? 'md' : 'icon' }))}
>
    {#if children}
        {@render children()}
    {:else}
        <HugeiconsIcon icon={Calendar03Icon} size={16} aria-hidden="true" />
    {/if}
</DatePickerPrimitive.Trigger>
