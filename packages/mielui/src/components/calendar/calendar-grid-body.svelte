<script lang="ts">
    import type { WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.GridBodyProps> = $props();
</script>

<CalendarPrimitive.GridBody
    {...rest}
    bind:ref={element}
    data-ui="calendar-grid-body"
    class={className}
/>
