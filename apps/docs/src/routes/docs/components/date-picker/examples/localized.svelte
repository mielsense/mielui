<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import * as DatePicker from '@mielui/svelte/components/date-picker';
</script>

<DatePicker.Root locale="fr-FR" placeholder={new CalendarDate(2026, 9, 17)} weekStartsOn={1}>
    <div class="grid w-full max-w-sm gap-2">
        <DatePicker.Label>Date du rendez-vous</DatePicker.Label>
        <div class="flex items-center gap-2">
            <DatePicker.Input name="appointment" />
            <DatePicker.Trigger aria-label="Choisir une date" />
        </div>
    </div>
    <DatePicker.Content align="end" aria-label="Choisir une date">
        <DatePicker.Calendar />
    </DatePicker.Content>
</DatePicker.Root>
