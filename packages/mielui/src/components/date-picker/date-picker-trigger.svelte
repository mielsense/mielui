<script lang="ts">
    import { Calendar03Icon } from '@hugeicons/core-free-icons';
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { button } from '../button/variants';
    import { getDatePickerContext } from './context';
    import { dateTriggerClasses } from './variants';

    let {
        class: className,
        children,
        disabled = false,
        element = $bindable(null),
        'aria-label': ariaLabel,
        ...rest
    }: WithElement<Omit<DatePickerPrimitive.TriggerProps, 'child'>> = $props();
    const context = getDatePickerContext();
</script>

<DatePickerPrimitive.Trigger
    {...rest}
    bind:ref={element}
    disabled={disabled || context.disabled}
    data-ui="date-picker-trigger"
    aria-label={ariaLabel ?? (children ? undefined : context.labels.trigger)}
    class={cn(
        className,
        dateTriggerClasses,
        button({ variant: 'outline', size: children ? 'md' : 'icon' })
    )}
>
    {#if children}
        {@render children()}
    {:else}
        <HugeiconsIcon icon={Calendar03Icon} size={16} aria-hidden="true" />
    {/if}
</DatePickerPrimitive.Trigger>
