<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let { class: className, ref = $bindable(null), ...rest }: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
    {...rest}
    bind:ref
    data-ui="calendar-day"
    class={cn(
        className,
        'relative flex h-[var(--calendar-cell-size)] w-full cursor-[var(--ui-cursor-interactive)] items-center justify-center rounded-[var(--radius-control)] text-sm tabular-nums outline-none transition-[background-color,color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] hover:bg-[var(--color-wash)] focus-visible:z-10 focus-visible:shadow-[var(--focus-ring)] data-disabled:pointer-events-none data-disabled:opacity-[var(--opacity-disabled)] data-unavailable:line-through data-unavailable:text-foreground-muted data-outside-month:opacity-40 motion-reduce:transition-none',
        'data-today:[font-weight:var(--font-weight-label)] data-today:after:absolute data-today:after:bottom-1 data-today:after:left-1/2 data-today:after:size-1 data-today:after:-translate-x-1/2 data-today:after:rounded-full data-today:after:bg-foreground',
        'mielui-glow [--mielui-glow-color:var(--color-primary)] [--mielui-glow-light:0.6] not-data-selected:bg-none not-data-selected:before:hidden data-selected:text-[var(--color-on-primary)] data-selected:shadow-[var(--mielui-glow-shadow)] data-selected:after:bg-[var(--color-on-primary)] data-selected:focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]'
    )}
/>
