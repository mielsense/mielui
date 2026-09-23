<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.GridRowProps = $props();
</script>

<CalendarPrimitive.GridRow
    {...rest}
    bind:ref
    data-ui="calendar-grid-row"
    class={cn(className, '')}
/>
