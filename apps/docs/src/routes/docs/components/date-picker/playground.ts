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
    script,
    stateControls,
    timeAttributes,
    valueDeclaration
} from '$lib/components/docs/playground/calendar';

export const labels = {
    trigger: 'Open the publish calendar',
    content: 'Publish date calendar',
    invalid: 'Enter a valid publish date.'
};

export const controls = {
    ...pickerControls,
    ...formatControls('Appearance'),
    ...labelControls,
    ...stateControls,
    required: toggle('Required', 'State'),
    ...constraintControls,
    closeOnDateSelect: toggle('Close on date select', 'Behavior', true),
    ...navigationControls,
    openOnHover: toggle('Open on hover', 'Behavior')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const withTime = hasTime(values);
    const root = tag(
        'DatePicker.Root',
        {
            calendarLabel: 'Publish date',
            locale: changed(values.locale, DEFAULT_LOCALE),
            ...timeAttributes(values),
            ...formatAttributes(values),
            disabled: values.disabled,
            readonly: values.readonly,
            required: values.required,
            ...constraintAttributes(values),
            closeOnDateSelect: defaultOn(values.closeOnDateSelect),
            ...navigationAttributes(values),
            labels: values.labels && expression('labels')
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
    const trigger = tag(
        'DatePicker.Trigger',
        {
            openOnHover: values.openOnHover
        },
        ' />',
        '                '
    );
    const content = tag('DatePicker.Content', contentAttributes(values), '>', '        ');
    const label = values.label
        ? `
            <DatePicker.Label>Publish date</DatePicker.Label>`
        : '';
    const declarations = [values.labels && labelsDeclaration(labels), valueDeclaration(withTime)];

    return `<script lang="ts">
${dateImport(values, withTime)}
    import * as DatePicker from '@mielui/svelte/components/date-picker';
    import * as Group from '@mielui/svelte/components/group';

${script(values, declarations)}
</script>

<div class="w-full max-w-sm">
    ${root}
        <div class="grid gap-2">${label}
            <Group.Root aria-label="Publish date controls" class="w-full">
                ${input}
                <Group.Separator />
                ${trigger}
            </Group.Root>
        </div>
        ${content}
            <DatePicker.Calendar />
        </DatePicker.Content>
    </DatePicker.Root>
</div>`;
}
