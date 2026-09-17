<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.HeadCellProps = $props();
</script>

<CalendarPrimitive.HeadCell
    {...rest}
    bind:ref
    data-ui="calendar-head-cell"
    class={cn(className, 'h-8 p-0 text-center text-xs font-normal text-foreground-muted')}
/>
