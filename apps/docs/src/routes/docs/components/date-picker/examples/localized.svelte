<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import type { DatePickerLabels } from '@mielui/svelte/components/date-picker';
    import * as DatePicker from '@mielui/svelte/components/date-picker';

    const labels: DatePickerLabels = {
        trigger: 'Choisir une date',
        content: 'Calendrier',
        invalid: 'Saisissez une date valide.'
    };
</script>

<DatePicker.Root
    locale="fr-FR"
    placeholder={new CalendarDate(2026, 9, 17)}
    weekStartsOn={1}
    calendarLabel="Date du rendez-vous"
    {labels}
>
    <div class="grid w-full max-w-sm gap-2">
        <DatePicker.Label>Date du rendez-vous</DatePicker.Label>
        <div class="flex items-center gap-2">
            <DatePicker.Input name="appointment" />
            <DatePicker.Trigger />
        </div>
    </div>
    <DatePicker.Content align="end">
        <DatePicker.Calendar />
    </DatePicker.Content>
</DatePicker.Root>
