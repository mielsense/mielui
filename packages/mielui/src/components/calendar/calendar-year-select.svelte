<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.YearSelectProps = $props();
</script>

<CalendarPrimitive.YearSelect
    {...rest}
    bind:ref
    data-ui="calendar-year-select"
    class={cn(className, 'h-[var(--size-control-sm)] rounded-[var(--radius-md)] border-[length:var(--border-size)] border-border bg-background px-2 text-sm tabular-nums outline-none shadow-[var(--elevation-control-edge)] focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)] transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none enabled:hover:bg-secondary disabled:opacity-[var(--opacity-disabled)]')}
/>
