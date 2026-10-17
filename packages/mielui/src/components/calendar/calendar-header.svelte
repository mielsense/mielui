<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.HeaderProps> = $props();
</script>

<CalendarPrimitive.Header
    {...rest}
    bind:ref={element}
    data-ui="calendar-header"
    class={cn(className, 'flex min-h-[var(--size-control-sm)] items-center justify-between gap-2')}
/>
