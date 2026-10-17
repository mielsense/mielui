<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.HeadingProps> = $props();
</script>

<CalendarPrimitive.Heading
    {...rest}
    bind:ref={element}
    data-ui="calendar-heading"
    class={cn(
        className,
        'text-center text-sm font-medium tabular-nums text-foreground [letter-spacing:var(--tracking-header)]'
    )}
/>
