<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.HeadingProps = $props();
</script>

<CalendarPrimitive.Heading
    {...rest}
    bind:ref
    data-ui="calendar-heading"
    class={cn(className, 'text-center text-sm font-medium tabular-nums')}
/>
