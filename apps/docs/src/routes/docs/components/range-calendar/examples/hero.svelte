<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as RangeCalendar from '@mielui/svelte/components/range-calendar';

    let value = $state<{ start: DateValue | undefined; end: DateValue | undefined }>({
        start: new CalendarDate(2026, 9, 17),
        end: new CalendarDate(2026, 9, 23)
    });
</script>

<div class="flex max-w-full flex-col items-center gap-4">
    <div
        class="max-w-full rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-border bg-card"
    >
        <RangeCalendar.Root bind:value calendarLabel="Travel dates" />
    </div>
    <p class="text-center text-sm text-foreground-muted">
        {value.start?.toString() ?? 'Start date'}
        <span aria-hidden="true">→</span>
        {value.end?.toString() ?? 'End date'}
    </p>
</div>
