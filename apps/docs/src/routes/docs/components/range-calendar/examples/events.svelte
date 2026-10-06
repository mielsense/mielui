<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import * as RangeCalendar from '@mielui/svelte/components/range-calendar';

    let start = $state('not picked');
    let end = $state('not picked');
</script>

<div class="flex flex-col items-center gap-3">
    <RangeCalendar.Root
        calendarLabel="Stay"
        placeholder={new CalendarDate(2026, 9, 1)}
        onStartValueChange={(date) => {
            start = date?.toString() ?? 'not picked';
        }}
        onEndValueChange={(date) => {
            end = date?.toString() ?? 'not picked';
        }}
    />
    <p class="text-sm text-foreground-muted">Check-in {start}. Check-out {end}.</p>
</div>
