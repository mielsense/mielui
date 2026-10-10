<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { RangeCalendar as CalendarPrimitive } from 'bits-ui';

    let { class: className, ref = $bindable(null), ...rest }: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
    {...rest}
    bind:ref
    data-ui="range-calendar-day"
    class={cn(
        className,
        'relative flex h-[var(--calendar-cell-size)] w-full cursor-[var(--ui-cursor-interactive)] items-center justify-center rounded-[var(--radius-control)] text-sm tabular-nums outline-none transition-[background-color,color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] hover:bg-[var(--color-wash)] focus-visible:z-10 focus-visible:shadow-[var(--focus-ring)] data-disabled:pointer-events-none data-disabled:opacity-[var(--opacity-disabled)] data-unavailable:line-through data-unavailable:text-foreground-muted data-outside-month:opacity-40 motion-reduce:transition-none',
        'data-today:[font-weight:var(--font-weight-label)] data-today:after:absolute data-today:after:bottom-1 data-today:after:left-1/2 data-today:after:size-1 data-today:after:-translate-x-1/2 data-today:after:rounded-full data-today:after:bg-foreground',
        'data-selected:rounded-none data-selected:bg-[var(--color-wash)] data-highlighted:rounded-none data-highlighted:bg-[var(--color-wash)] [td:first-child_&]:rounded-s-[var(--radius-control)] [td:last-child_&]:rounded-e-[var(--radius-control)] [td:not(:has(:is([data-highlighted],[data-selected])))+td_&[data-highlighted]]:rounded-s-[var(--radius-control)] [td:not(:has(+td_:is([data-highlighted],[data-selected])))_&[data-highlighted]]:rounded-e-[var(--radius-control)]',
        'mielui-glow [--mielui-glow-color:var(--color-primary)] [--mielui-glow-light:0.6] [&:not([data-selection-start],[data-selection-end])]:bg-none [&:not([data-selection-start],[data-selection-end])]:before:hidden [&:is([data-selection-start],[data-selection-end])[data-ui]]:rounded-[var(--radius-control)] [&:is([data-selection-start],[data-selection-end])[data-ui]]:text-[var(--color-on-primary)] [&:is([data-selection-start],[data-selection-end])[data-ui]]:shadow-[var(--mielui-glow-shadow)] [&:is([data-selection-start],[data-selection-end])[data-ui]]:after:bg-[var(--color-on-primary)] [&:is([data-selection-start],[data-selection-end])[data-ui]:focus-visible]:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]'
    )}
/>
