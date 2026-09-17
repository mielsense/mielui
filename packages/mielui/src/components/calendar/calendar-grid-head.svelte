<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.GridHeadProps = $props();
</script>

<CalendarPrimitive.GridHead
    {...rest}
    bind:ref
    data-ui="calendar-grid-head"
    class={cn(className, '')}
/>
