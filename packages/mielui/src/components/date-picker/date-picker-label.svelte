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
    class={cn(
        className,
        'w-fit [font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] leading-label text-foreground data-disabled:opacity-[var(--opacity-disabled)]'
    )}
/>
