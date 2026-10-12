<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.CellProps> = $props();
</script>

<CalendarPrimitive.Cell
    {...rest}
    bind:ref={element}
    data-ui="calendar-cell"
    class={cn(className, 'relative px-0 py-px text-center align-middle focus-within:z-10')}
/>
