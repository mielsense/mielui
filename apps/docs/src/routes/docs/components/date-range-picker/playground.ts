import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

type Attributes = Parameters<typeof attributes>[0];

export const controls = {
    side: select('Side', ['bottom', 'top', 'left', 'right'], 'bottom'),
    align: select('Align', ['start', 'center', 'end'], 'end', 'Appearance'),
    sideOffset: number('Side offset', 6, {
        min: 0,
        max: 32,
        step: 1,
        group: 'Appearance'
    }),
    surface: select('Surface', ['theme', 'solid', 'glass'], 'theme', 'Appearance'),
    granularity: select('Granularity', ['day', 'hour', 'minute', 'second'], 'day', 'Appearance'),
    hourCycle: select('Hour cycle', ['locale', '12', '24'], 'locale', 'Appearance'),
    weekdayFormat: select('Weekday format', ['narrow', 'short', 'long'], 'short', 'Appearance'),
    monthFormat: select(
        'Month format',
        ['long', 'short', 'narrow', 'numeric', '2-digit'],
        'long',
        'Appearance'
    ),
    yearFormat: select('Year format', ['numeric', '2-digit'], 'numeric', 'Appearance'),
    locale: select('Locale', ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'ja-JP'], 'en-US', 'Appearance'),
    weekStartsOn: select(
        'Week starts on',
        ['locale', 'sunday', 'monday', 'saturday'],
        'locale',
        'Appearance'
    ),
    numberOfMonths: number('Months', 1, {
        min: 1,
        max: 3,
        step: 1,
        group: 'Appearance'
    }),
    fixedWeeks: toggle('Fixed weeks', 'Appearance', true),
    label: toggle('Label', 'Content', true),
    labels: toggle('Custom labels', 'Content'),
    disabled: toggle('Disabled', 'State'),
    readonly: toggle('Read only', 'State'),
    required: toggle('Required', 'State'),
    bounds: toggle('Min and max dates', 'Behavior'),
    weekends: toggle('Disable weekends', 'Behavior'),
    unavailable: toggle('Unavailable dates', 'Behavior'),
    closeOnRangeSelect: toggle('Close on range select', 'Behavior', true),
    limit: toggle('Two to seven days', 'Behavior'),
    excludeDisabled: toggle('Exclude disabled dates', 'Behavior'),
    preventDeselect: toggle('Prevent deselect', 'Behavior'),
    pagedNavigation: toggle('Paged navigation', 'Behavior'),
    disableDaysOutsideMonth: toggle('Disable days outside month', 'Behavior', true),
    openOnHover: toggle('Open on hover', 'Behavior')
};

export const WEEK_START: Record<
    PlaygroundValues<typeof controls>['weekStartsOn'],
    0 | 1 | 6 | undefined
> = {
    locale: undefined,
    sunday: 0,
    monday: 1,
    saturday: 6
};

export const HOUR_CYCLE: Record<
    PlaygroundValues<typeof controls>['hourCycle'],
    12 | 24 | undefined
> = {
    locale: undefined,
    '12': 12,
    '24': 24
};

function tag(indent: string, name: string, leading: string[], props: Attributes, end: '>' | '/>') {
    const parts = [
        ...leading,
        ...Object.entries(props).map(([key, value]) => {
            return attributes({
                [key]: value
            }).trim();
        })
    ].filter((part) => part !== '');
    const line = `${indent}<${[name, ...parts].join(' ')}${end === '>' ? '>' : ' />'}`;

    if (line.length <= 100) {
        return line;
    }

    return [`${indent}<${name}`, ...parts.map((part) => `${indent}    ${part}`), indent + end].join(
        '\n'
    );
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const withTime = values.granularity !== 'day';
    const dateClass = withTime ? 'CalendarDateTime' : 'CalendarDate';
    const root = tag(
        '    ',
        'DateRangePicker.Root',
        ['bind:value'],
        {
            calendarLabel: 'Travel dates',
            locale: values.locale !== 'en-US' && values.locale,
            granularity: withTime && values.granularity !== 'minute' && values.granularity,
            hourCycle: withTime ? HOUR_CYCLE[values.hourCycle] : undefined,
            weekdayFormat: values.weekdayFormat !== 'short' && values.weekdayFormat,
            monthFormat: values.monthFormat !== 'long' && values.monthFormat,
            yearFormat: values.yearFormat !== 'numeric' && values.yearFormat,
            weekStartsOn: WEEK_START[values.weekStartsOn],
            numberOfMonths: values.numberOfMonths !== 1 && values.numberOfMonths,
            fixedWeeks: values.fixedWeeks ? undefined : expression('false'),
            disabled: values.disabled,
            readonly: values.readonly,
            required: values.required,
            minValue: values.bounds && expression('new CalendarDate(2026, 9, 7)'),
            maxValue: values.bounds && expression('new CalendarDate(2026, 10, 16)'),
            isDateDisabled: values.weekends && expression('isWeekendDay'),
            isDateUnavailable: values.unavailable && expression('isBooked'),
            closeOnRangeSelect: values.closeOnRangeSelect ? undefined : expression('false'),
            minDays: values.limit && 2,
            maxDays: values.limit && 7,
            excludeDisabled: values.excludeDisabled,
            preventDeselect: values.preventDeselect,
            pagedNavigation: values.pagedNavigation,
            disableDaysOutsideMonth: values.disableDaysOutsideMonth
                ? undefined
                : expression('false'),
            labels: values.labels && expression('labels')
        },
        '>'
    );
    const trigger = tag(
        '                ',
        'DateRangePicker.Trigger',
        [],
        {
            openOnHover: values.openOnHover
        },
        '/>'
    );
    const content = tag(
        '        ',
        'DateRangePicker.Content',
        [],
        {
            side: values.side !== 'bottom' && values.side,
            align: values.align !== 'start' && values.align,
            sideOffset: values.sideOffset !== 6 && values.sideOffset,
            surface: values.surface !== 'theme' && values.surface
        },
        '>'
    );
    const label = values.label
        ? `
            <DateRangePicker.Label>Travel dates</DateRangePicker.Label>`
        : '';
    const dateImports = [
        (!withTime || values.bounds) && 'CalendarDate',
        withTime && 'CalendarDateTime',
        'type DateValue',
        values.weekends && 'isWeekend'
    ].filter((name) => name !== false);
    const script = [
        values.unavailable && '    const booked = [8, 9, 22];',
        values.labels &&
            `    const labels = {
        trigger: 'Open the travel calendar',
        content: 'Travel dates calendar',
        invalid: 'Enter a valid travel date.'
    };`,
        `    let value = $state<{
        start: DateValue | undefined;
        end: DateValue | undefined;
    }>({
        start: new ${dateClass}(2026, 9, 17${withTime ? ', 9, 30' : ''}),
        end: new ${dateClass}(2026, 9, 23${withTime ? ', 18, 0' : ''})
    });`,
        values.weekends &&
            `
    function isWeekendDay(date: DateValue) {
        return isWeekend(date, '${values.locale}');
    }`,
        values.unavailable &&
            `
    function isBooked(date: DateValue) {
        return date.month === 9 && booked.includes(date.day);
    }`
    ].filter((line) => line !== false);

    const inlineImport = `    import { ${dateImports.join(', ')} } from '@internationalized/date';`;
    const dateImport =
        inlineImport.length <= 100
            ? inlineImport
            : `    import {
        ${dateImports.join(',\n        ')}
    } from '@internationalized/date';`;

    return `<script lang="ts">
${dateImport}
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';

${script.join('\n')}
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
