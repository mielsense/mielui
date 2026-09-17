<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.GridProps = $props();
</script>

<CalendarPrimitive.Grid
    {...rest}
    bind:ref
    data-ui="calendar-grid"
    class={cn(className, 'w-full table-fixed border-collapse select-none')}
/>
