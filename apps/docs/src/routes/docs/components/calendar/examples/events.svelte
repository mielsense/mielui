<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as Calendar from '@mielui/svelte/components/calendar';

    let value = $state<DateValue | undefined>(new CalendarDate(2026, 9, 17));
    let month = $state('September 2026');
</script>

<div class="flex flex-col items-center gap-3">
    <Calendar.Root
        bind:value
        calendarLabel="Delivery date"
        preventDeselect
        onPlaceholderChange={(date) => {
            month = date.toDate('UTC').toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC'
            });
        }}
    />
    <p class="text-sm text-foreground-muted">
        Showing {month}. Selected {value?.toString() ?? 'nothing'}, and a second click keeps it.
    </p>
</div>
