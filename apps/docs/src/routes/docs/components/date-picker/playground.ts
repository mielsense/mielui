import { type PlaygroundValues, tag } from '$lib/components/docs/playground';
import {
    constraintAttributes,
    contentAttributes,
    dateImport,
    hasTime,
    pickerAttributes,
    pickerControls,
    script,
    valueDeclaration
} from '$lib/components/docs/playground/calendar';

export const controls = pickerControls;

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const withTime = hasTime(values);
    const root = tag(
        'DatePicker.Root',
        {
            calendarLabel: 'Publish date',
            ...pickerAttributes(values),
            ...constraintAttributes(values)
        },
        '>',
        '    ',
        ['bind:value']
    );
    const input = tag(
        'DatePicker.Input',
        {
            name: 'publishDate',
            'aria-label': !values.label && 'Publish date'
        },
        ' />',
        '                '
    );
    const content = tag('DatePicker.Content', contentAttributes(values), '>', '        ');
    const label = values.label
        ? `
            <DatePicker.Label>Publish date</DatePicker.Label>`
        : '';

    return `<script lang="ts">
${dateImport(values, withTime)}
    import * as DatePicker from '@mielui/svelte/components/date-picker';
    import * as Group from '@mielui/svelte/components/group';

${script(values, [valueDeclaration(withTime)])}
</script>

<div class="w-full max-w-sm">
    ${root}
        <div class="grid gap-2">${label}
            <Group.Root aria-label="Publish date controls" class="w-full">
                ${input}
                <Group.Separator />
                <DatePicker.Trigger />
            </Group.Root>
        </div>
        ${content}
            <DatePicker.Calendar />
        </DatePicker.Content>
    </DatePicker.Root>
</div>`;
}
