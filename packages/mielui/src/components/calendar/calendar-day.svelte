<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let { class: className, ref = $bindable(null), ...rest }: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
    {...rest}
    bind:ref
    data-ui="calendar-day"
    class={cn(className, 'relative flex h-[var(--calendar-cell-size)] w-full cursor-[var(--ui-cursor-interactive)] items-center justify-center rounded-[var(--radius-md)] text-sm tabular-nums outline-none transition-[background-color,color,box-shadow] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)] hover:bg-secondary focus-visible:shadow-[var(--focus-ring)] data-selected:bg-primary data-selected:text-[var(--color-on-primary)] data-today:font-semibold data-today:underline data-today:underline-offset-4 data-disabled:pointer-events-none data-disabled:opacity-[var(--opacity-disabled)] data-unavailable:line-through data-unavailable:text-foreground-muted data-outside-month:opacity-40 motion-reduce:transition-none')}
/>
