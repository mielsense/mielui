<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.HeaderProps = $props();
</script>

<CalendarPrimitive.Header
    {...rest}
    bind:ref
    data-ui="calendar-header"
    class={cn(className, 'flex min-h-[var(--size-control-sm)] items-center justify-between gap-2')}
/>
