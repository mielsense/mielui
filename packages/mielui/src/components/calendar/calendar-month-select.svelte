<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.MonthSelectProps = $props();
</script>

<CalendarPrimitive.MonthSelect
    {...rest}
    bind:ref
    data-ui="calendar-month-select"
    class={cn(className, 'h-[var(--size-control-sm)] min-w-0 rounded-[var(--radius-md)] border-[length:var(--border-size)] border-border bg-background px-2 text-sm outline-none focus-visible:shadow-[var(--focus-ring)] disabled:opacity-[var(--opacity-disabled)]')}
/>
