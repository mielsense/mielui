<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { DateRangePicker as DatePickerPrimitive } from 'bits-ui';
    import { dateLabelClasses } from '../date-picker/variants';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<DatePickerPrimitive.LabelProps> = $props();
</script>

<DatePickerPrimitive.Label
    {...rest}
    bind:ref={element}
    data-ui="date-range-picker-label"
    class={cn(className, dateLabelClasses)}
/>
