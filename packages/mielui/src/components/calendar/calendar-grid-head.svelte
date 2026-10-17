<script lang="ts">
    import type { WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.GridHeadProps> = $props();
</script>

<CalendarPrimitive.GridHead
    {...rest}
    bind:ref={element}
    data-ui="calendar-grid-head"
    class={className}
/>
