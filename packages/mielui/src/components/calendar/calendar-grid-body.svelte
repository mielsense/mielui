<script lang="ts">
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.GridBodyProps = $props();
</script>

<CalendarPrimitive.GridBody {...rest} bind:ref data-ui="calendar-grid-body" class={className} />
