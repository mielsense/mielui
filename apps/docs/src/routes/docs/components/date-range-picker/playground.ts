import {
    changed,
    defaultOn,
    expression,
    type PlaygroundValues,
    tag,
    toggle
} from '$lib/components/docs/playground';
import {
    constraintAttributes,
    constraintControls,
    contentAttributes,
    DEFAULT_LOCALE,
    dateImport,
    formatAttributes,
    formatControls,
    hasTime,
    labelControls,
    labelsDeclaration,
    navigationAttributes,
    navigationControls,
    pickerControls,
    rangeAttributes,
    rangeControls,
    rangeDeclaration,
    script,
    stateControls,
    timeAttributes
} from '$lib/components/docs/playground/calendar';

export const labels = {
    trigger: 'Open the travel calendar',
    content: 'Travel dates calendar',
    invalid: 'Enter a valid travel date.'
};

export const controls = {
    ...pickerControls,
    ...formatControls('Appearance'),
    ...labelControls,
    ...stateControls,
    required: toggle('Required', 'State'),
    ...constraintControls,
    closeOnRangeSelect: toggle('Close on range select', 'Behavior', true),
    ...rangeControls,
    ...navigationControls,
    openOnHover: toggle('Open on hover', 'Behavior')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const withTime = hasTime(values);
    const root = tag(
        'DateRangePicker.Root',
        {
            calendarLabel: 'Travel dates',
            locale: changed(values.locale, DEFAULT_LOCALE),
            ...timeAttributes(values),
            ...formatAttributes(values),
            disabled: values.disabled,
            readonly: values.readonly,
            required: values.required,
            ...constraintAttributes(values),
            closeOnRangeSelect: defaultOn(values.closeOnRangeSelect),
            ...rangeAttributes(values),
            ...navigationAttributes(values),
            labels: values.labels && expression('labels')
        },
        '>',
        '    ',
        ['bind:value']
    );
    const trigger = tag(
        'DateRangePicker.Trigger',
        {
            openOnHover: values.openOnHover
        },
        ' />',
        '                '
    );
    const content = tag('DateRangePicker.Content', contentAttributes(values), '>', '        ');
    const label = values.label
        ? `
            <DateRangePicker.Label>Travel dates</DateRangePicker.Label>`
        : '';
    const declarations = [values.labels && labelsDeclaration(labels), rangeDeclaration(withTime)];

    return `<script lang="ts">
${dateImport(values, withTime)}
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';

${script(values, declarations)}
</script>

<div class="w-full max-w-lg">
    ${root}
        <div class="grid gap-2">${label}
            <div class="flex flex-wrap items-center gap-2">
                <DateRangePicker.Input type="start" name="startDate" aria-label="Start date" />
                <DateRangePicker.Input type="end" name="endDate" aria-label="End date" />
                ${trigger}
            </div>
        </div>
        ${content}
            <DateRangePicker.Calendar />
        </DateRangePicker.Content>
    </DateRangePicker.Root>
</div>`;
}
