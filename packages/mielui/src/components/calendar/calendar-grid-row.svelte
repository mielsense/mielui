<script lang="ts">
    import type { WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.GridRowProps> = $props();
</script>

<CalendarPrimitive.GridRow
    {...rest}
    bind:ref={element}
    data-ui="calendar-grid-row"
    class={className}
/>
