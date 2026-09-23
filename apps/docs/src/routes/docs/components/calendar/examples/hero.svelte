<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as Calendar from '@mielui/svelte/components/calendar';

    let value = $state<DateValue | undefined>(new CalendarDate(2026, 9, 17));
</script>

<div class="flex flex-col items-center gap-4">
    <div
        class="max-w-full rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-border bg-card"
    >
        <Calendar.Root bind:value calendarLabel="Meeting date" />
    </div>
    <p class="text-sm text-foreground-muted">
        Meeting date<span class="ms-2 font-mono text-foreground">
            {value?.toString() ?? 'Not selected'}
        </span>
    </p>
</div>
