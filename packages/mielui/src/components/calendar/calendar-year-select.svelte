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
    class={cn(className, 'h-[var(--size-control-sm)] rounded-[var(--radius-md)] border-[length:var(--border-size)] border-border bg-background px-2 text-sm tabular-nums outline-none focus-visible:shadow-[var(--focus-ring)] disabled:opacity-[var(--opacity-disabled)]')}
/>
