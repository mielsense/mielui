<script lang="ts">
    import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';

    let {
        class: className,
        ref = $bindable(null),
        ...rest
    }: CalendarPrimitive.YearSelectProps = $props();
</script>

<span class="relative inline-flex min-w-0">
    <CalendarPrimitive.YearSelect
        {...rest}
        bind:ref
        data-ui="calendar-year-select"
        class={cn(className, 'h-[var(--size-control-sm)] rounded-[var(--radius-md)] border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] ps-2.5 pe-7 text-sm text-[var(--color-field-foreground)] appearance-none [color-scheme:light] dark:[color-scheme:dark] tabular-nums outline-none focus-visible:shadow-[var(--focus-ring)] transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none enabled:hover:bg-[var(--color-field-hover)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]')}
    />
    <HugeiconsIcon
        icon={ArrowDown01Icon}
        size={14}
        aria-hidden="true"
        class="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 text-foreground-muted"
    />
</span>
