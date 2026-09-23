<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: DatePickerPrimitive.LabelProps = $props();
</script>

<DatePickerPrimitive.Label
    {...rest}
    bind:ref
    data-ui="date-picker-label"
    class={cn(className, 'text-sm font-medium text-foreground data-disabled:opacity-[var(--opacity-disabled)]')}
/>
