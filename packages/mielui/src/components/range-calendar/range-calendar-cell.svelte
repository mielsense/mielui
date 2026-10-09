<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { RangeCalendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell
    {...rest}
    bind:ref
    data-ui="range-calendar-cell"
    class={cn(
        className,
        'relative px-0 py-px text-center align-middle focus-within:z-10',
        'bg-clip-content bg-origin-content [--range-band-dir:to_right] [--range-band-end:transparent] [--range-band-start:transparent] rtl:[--range-band-dir:to_left] [td:has(:is([data-selected],[data-highlighted]))+&]:[--range-band-start:var(--color-wash)] has-[+td_:is([data-selected],[data-highlighted])]:[--range-band-end:var(--color-wash)] has-[:is([data-selection-start],[data-selection-end])]:bg-[image:linear-gradient(var(--range-band-dir),var(--range-band-start)_50%,var(--range-band-end)_50%)]'
    )}
/>
