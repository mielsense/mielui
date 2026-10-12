<script lang="ts">
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.GridHeadProps = $props();
</script>

<CalendarPrimitive.GridHead {...rest} bind:ref data-ui="calendar-grid-head" class={className} />
