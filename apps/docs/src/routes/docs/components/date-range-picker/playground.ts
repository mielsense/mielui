import {
    constraintAttributes,
    contentAttributes,
    dateImport,
    hasTime,
    pickerAttributes,
    pickerControls,
    rangeAttributes,
    rangeControls,
    rangeDeclaration,
    script
} from '#lib/components/docs/playground/calendar.js';
import { type PlaygroundValues, tag } from '#lib/components/docs/playground.js';

export const controls = {
    ...pickerControls,
    ...rangeControls
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const withTime = hasTime(values);
    const root = tag(
        'DateRangePicker.Root',
        {
            calendarLabel: 'Travel dates',
            ...pickerAttributes(values),
            ...constraintAttributes(values),
            ...rangeAttributes(values)
        },
        '>',
        '    ',
        ['bind:value']
    );
    const content = tag('DateRangePicker.Content', contentAttributes(values), '>', '        ');
    const label = values.label
        ? `
            <DateRangePicker.Label>Travel dates</DateRangePicker.Label>`
        : '';

    return `<script lang="ts">
${dateImport(values, withTime)}
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';

${script(values, [rangeDeclaration(withTime)])}
</script>

<div class="w-full max-w-lg">
    ${root}
        <div class="grid gap-2">${label}
            <div class="flex flex-wrap items-center gap-2">
                <DateRangePicker.Input type="start" name="startDate" aria-label="Start date" />
                <DateRangePicker.Input type="end" name="endDate" aria-label="End date" />
                <DateRangePicker.Trigger />
            </div>
        </div>
        ${content}
            <DateRangePicker.Calendar />
        </DateRangePicker.Content>
    </DateRangePicker.Root>
</div>`;
}
