<script lang="ts">
    import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';

    let {
        class: className,
        element = $bindable(null),
        ...rest
    }: WithElement<CalendarPrimitive.YearSelectProps> = $props();
</script>

<span class="relative inline-flex min-w-0">
    <CalendarPrimitive.YearSelect
        {...rest}
        bind:ref={element}
        data-ui="calendar-year-select"
        class={cn(
            className,
            'field-sizing-content h-[var(--size-control-sm)] min-w-0 cursor-[var(--ui-cursor-interactive)] appearance-none rounded-[var(--radius-control)] border-0 bg-transparent ps-2.5 pe-7 text-sm [font-weight:var(--font-weight-label)] text-foreground [color-scheme:light] dark:[color-scheme:dark] tabular-nums outline-none enabled:hover:bg-[var(--color-wash)] focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]'
        )}
    />
    <HugeiconsIcon
        icon={ArrowDown01Icon}
        size={14}
        aria-hidden="true"
        class="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 text-foreground-muted"
    />
</span>
