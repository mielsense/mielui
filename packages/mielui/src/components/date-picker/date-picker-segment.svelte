<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: DatePickerPrimitive.SegmentProps = $props();
</script>

<DatePickerPrimitive.Segment
    {...rest}
    bind:ref
    data-ui="date-picker-segment"
    class={cn(
        className,
        'rounded-[var(--radius-sm)] px-1 py-0.5 text-sm tabular-nums text-foreground outline-none transition-[background-color,color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none aria-[valuetext=Empty]:not-focus:text-foreground-muted focus:bg-[var(--color-wash)] data-[segment=literal]:px-0 data-[segment=literal]:text-foreground-muted data-disabled:cursor-not-allowed'
    )}
/>
