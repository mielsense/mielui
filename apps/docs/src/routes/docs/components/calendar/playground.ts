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
    weekdayFormat: select('Weekday format', ['narrow', 'short', 'long'], 'short'),
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
    header: select('Header', ['arrows', 'selects'], 'arrows', 'Content'),
    disabled: toggle('Disabled', 'State'),
    readonly: toggle('Read only', 'State'),
    bounds: toggle('Min and max dates', 'Behavior'),
    weekends: toggle('Disable weekends', 'Behavior'),
    unavailable: toggle('Unavailable dates', 'Behavior'),
    preventDeselect: toggle('Prevent deselect', 'Behavior'),
    pagedNavigation: toggle('Paged navigation', 'Behavior'),
    disableDaysOutsideMonth: toggle('Disable days outside month', 'Behavior', true)
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
    const custom = values.header === 'selects';
    const weekStart = WEEK_START[values.weekStartsOn];
    const root = tag(
        '    ',
        'Calendar.Root',
        ['bind:value'],
        {
            calendarLabel: 'Meeting date',
            locale: values.locale !== 'en-US' && values.locale,
            weekdayFormat: values.weekdayFormat !== 'short' && values.weekdayFormat,
            monthFormat: values.monthFormat !== 'long' && values.monthFormat,
            yearFormat: values.yearFormat !== 'numeric' && values.yearFormat,
            weekStartsOn: weekStart,
            numberOfMonths: values.numberOfMonths !== 1 && values.numberOfMonths,
            fixedWeeks: values.fixedWeeks ? undefined : expression('false'),
            disabled: values.disabled,
            readonly: values.readonly,
            minValue: values.bounds && expression('new CalendarDate(2026, 9, 7)'),
            maxValue: values.bounds && expression('new CalendarDate(2026, 10, 16)'),
            isDateDisabled: values.weekends && expression('isWeekendDay'),
            isDateUnavailable: values.unavailable && expression('isBooked'),
            preventDeselect: values.preventDeselect,
            pagedNavigation: values.pagedNavigation,
            disableDaysOutsideMonth: values.disableDaysOutsideMonth
                ? undefined
                : expression('false')
        },
        custom ? '>' : '/>'
    );
    const month = tag(
        '                ',
        'Calendar.Month',
        ['{month}', '{weekdays}'],
        {
            locale: values.locale !== 'en-US' && values.locale,
            showHeading: values.numberOfMonths > 1
        },
        '/>'
    );
    const children = custom
        ? `
        {#snippet children({ months, weekdays })}
            <Calendar.Header>
                <Calendar.MonthSelect />
                <Calendar.YearSelect />
            </Calendar.Header>
            <div class="flex max-w-full flex-wrap justify-center gap-3">
                {#each months as month (month.value.toString())}
    ${month}
                {/each}
            </div>
        {/snippet}
    </Calendar.Root>`
        : '';
    const dateImports = ['CalendarDate', 'type DateValue', values.weekends && 'isWeekend'].filter(
        (name) => name !== false
    );
    const script = [
        values.unavailable && '    const booked = [8, 9, 22];',
        '    let value = $state<DateValue | undefined>(new CalendarDate(2026, 9, 17));',
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

    return `<script lang="ts">
    import { ${dateImports.join(', ')} } from '@internationalized/date';
    import * as Calendar from '@mielui/svelte/components/calendar';

${script.join('\n')}
</script>

<div class="mielui-plate max-w-full">
${root}${children}
</div>`;
}
