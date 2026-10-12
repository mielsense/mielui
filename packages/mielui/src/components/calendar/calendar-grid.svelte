<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.GridProps> = $props();
</script>

<CalendarPrimitive.Grid
    {...rest}
    bind:ref={element}
    data-ui="calendar-grid"
    class={cn(className, 'w-full table-fixed border-collapse select-none')}
/>
