<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell
    {...rest}
    bind:ref
    data-ui="calendar-cell"
    class={cn(className, 'relative p-0 text-center align-middle focus-within:z-10')}
/>
