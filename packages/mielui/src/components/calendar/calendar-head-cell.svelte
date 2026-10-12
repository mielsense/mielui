<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.HeadCellProps> = $props();
</script>

<CalendarPrimitive.HeadCell
    {...rest}
    bind:ref={element}
    data-ui="calendar-head-cell"
    class={cn(
        className,
        'h-8 max-w-[var(--calendar-cell-size)] truncate p-0 text-center text-xs [font-weight:var(--font-weight-body)] text-foreground-muted'
    )}
/>
