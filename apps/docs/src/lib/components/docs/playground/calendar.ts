import { CalendarDate, CalendarDateTime, type DateValue, isWeekend } from '@internationalized/date';
import { type AttributeValues, changed, compact, defaultOn, expression, quote, tag } from './code';
import { number, type PlaygroundValues, select, toggle } from './controls';

const BOOKED_MONTH = 9;
const BOOKED_DAYS = [8, 9, 22];

export const DEFAULT_LOCALE = 'en-US';
export const MIN_DAYS = 2;
export const MAX_DAYS = 7;

export const minDate = new CalendarDate(2026, 9, 7);
export const maxDate = new CalendarDate(2026, 10, 16);
export const startDate = new CalendarDate(2026, 9, 17);
export const endDate = new CalendarDate(2026, 9, 23);
export const startTime = new CalendarDateTime(2026, 9, 17, 9, 30);
export const endTime = new CalendarDateTime(2026, 9, 23, 18, 0);

/** The format controls of every calendar. Left ungrouped, the weekday select is in the toolbar. */
export function formatControls(weekdayFormatGroup?: string) {
    return {
        weekdayFormat: select(
            'Weekday format',
            ['narrow', 'short', 'long'],
            'short',
            weekdayFormatGroup
        ),
        monthFormat: select(
            'Month format',
            ['long', 'short', 'narrow', 'numeric', '2-digit'],
            'long',
            'Appearance'
        ),
        yearFormat: select('Year format', ['numeric', '2-digit'], 'numeric', 'Appearance'),
        locale: select(
            'Locale',
            ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'ja-JP'],
            DEFAULT_LOCALE,
            'Appearance'
        ),
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
        fixedWeeks: toggle('Fixed weeks', 'Appearance', true)
    };
}

export const headerControls = {
    header: select('Header', ['arrows', 'selects'], 'arrows', 'Content')
};

export const stateControls = {
    disabled: toggle('Disabled', 'State'),
    readonly: toggle('Read only', 'State')
};

export const constraintControls = {
    bounds: toggle('Min and max dates', 'Behavior'),
    weekends: toggle('Disable weekends', 'Behavior'),
    unavailable: toggle('Unavailable dates', 'Behavior')
};

export const rangeControls = {
    limit: toggle('Two to seven days', 'Behavior'),
    excludeDisabled: toggle('Exclude disabled dates', 'Behavior')
};

export const navigationControls = {
    preventDeselect: toggle('Prevent deselect', 'Behavior'),
    pagedNavigation: toggle('Paged navigation', 'Behavior'),
    disableDaysOutsideMonth: toggle('Disable days outside month', 'Behavior', true)
};

export const pickerControls = {
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
    hourCycle: select('Hour cycle', ['locale', '12', '24'], 'locale', 'Appearance')
};

export const labelControls = {
    label: toggle('Label', 'Content', true),
    labels: toggle('Custom labels', 'Content')
};

type FormatValues = PlaygroundValues<ReturnType<typeof formatControls>>;
type ConstraintValues = PlaygroundValues<typeof constraintControls>;
type RangeValues = PlaygroundValues<typeof rangeControls>;
type NavigationValues = PlaygroundValues<typeof navigationControls>;
type PickerValues = PlaygroundValues<typeof pickerControls>;

export const WEEK_START: Record<FormatValues['weekStartsOn'], 0 | 1 | 6 | undefined> = {
    locale: undefined,
    sunday: 0,
    monday: 1,
    saturday: 6
};

export const HOUR_CYCLE: Record<PickerValues['hourCycle'], 12 | 24 | undefined> = {
    locale: undefined,
    '12': 12,
    '24': 24
};

export function isBooked(date: DateValue) {
    return date.month === BOOKED_MONTH && BOOKED_DAYS.includes(date.day);
}

export function weekendMatcher(locale: string) {
    return (date: DateValue) => {
        return isWeekend(date, locale);
    };
}

export function hasTime(values: Pick<PickerValues, 'granularity'>) {
    return values.granularity !== 'day';
}

function dateSource(date: CalendarDate | CalendarDateTime): string {
    if (date instanceof CalendarDateTime) {
        const parts = [date.year, date.month, date.day, date.hour, date.minute];

        return `new CalendarDateTime(${parts.join(', ')})`;
    }

    return `new CalendarDate(${date.year}, ${date.month}, ${date.day})`;
}

export function formatAttributes(values: FormatValues): AttributeValues {
    return {
        weekdayFormat: changed(values.weekdayFormat, 'short'),
        monthFormat: changed(values.monthFormat, 'long'),
        yearFormat: changed(values.yearFormat, 'numeric'),
        weekStartsOn: WEEK_START[values.weekStartsOn],
        numberOfMonths: changed(values.numberOfMonths, 1),
        fixedWeeks: defaultOn(values.fixedWeeks)
    };
}

export function constraintAttributes(values: ConstraintValues): AttributeValues {
    return {
        minValue: values.bounds && expression(dateSource(minDate)),
        maxValue: values.bounds && expression(dateSource(maxDate)),
        isDateDisabled: values.weekends && expression('isWeekendDay'),
        isDateUnavailable: values.unavailable && expression('isBooked')
    };
}

export function rangeAttributes(values: RangeValues): AttributeValues {
    return {
        minDays: values.limit && MIN_DAYS,
        maxDays: values.limit && MAX_DAYS,
        excludeDisabled: values.excludeDisabled
    };
}

export function navigationAttributes(values: NavigationValues): AttributeValues {
    return {
        preventDeselect: values.preventDeselect,
        pagedNavigation: values.pagedNavigation,
        disableDaysOutsideMonth: defaultOn(values.disableDaysOutsideMonth)
    };
}

export function timeAttributes(values: PickerValues): AttributeValues {
    const withTime = hasTime(values);

    return {
        granularity: withTime && changed(values.granularity, 'minute'),
        hourCycle: withTime ? HOUR_CYCLE[values.hourCycle] : undefined
    };
}

export function contentAttributes(values: PickerValues): AttributeValues {
    return {
        side: changed(values.side, 'bottom'),
        align: changed(values.align, 'start'),
        sideOffset: changed(values.sideOffset, 6),
        surface: changed(values.surface, 'theme')
    };
}

/** Prints the `@internationalized/date` import, stacked when it passes 100 columns. */
export function dateImport(values: ConstraintValues, withTime = false): string {
    const names = compact([
        (!withTime || values.bounds) && 'CalendarDate',
        withTime && 'CalendarDateTime',
        'type DateValue',
        values.weekends && 'isWeekend'
    ]);
    const inline = `    import { ${names.join(', ')} } from '@internationalized/date';`;

    if (inline.length <= 100) {
        return inline;
    }

    return `    import {
        ${names.join(',\n        ')}
    } from '@internationalized/date';`;
}

export function valueDeclaration(withTime = false): string {
    const start = withTime ? startTime : startDate;

    return `    let value = $state<DateValue | undefined>(${dateSource(start)});`;
}

export function rangeDeclaration(withTime = false): string {
    const start = withTime ? startTime : startDate;
    const end = withTime ? endTime : endDate;

    return `    let value = $state<{
        start: DateValue | undefined;
        end: DateValue | undefined;
    }>({
        start: ${dateSource(start)},
        end: ${dateSource(end)}
    });`;
}

export function labelsDeclaration(labels: Record<string, string>): string {
    const entries = Object.entries(labels).map(([key, value]) => {
        return `        ${key}: ${quote(value)}`;
    });

    return `    const labels = {
${entries.join(',\n')}
    };`;
}

/**
 * Prints the body of the example script: the booked days, then `declarations`, then the date
 * matchers the constraint controls switched on.
 */
export function script(
    values: ConstraintValues & Pick<FormatValues, 'locale'>,
    declarations: readonly (string | false)[]
): string {
    const lines = compact([
        values.unavailable && `    const booked = [${BOOKED_DAYS.join(', ')}];`,
        ...declarations,
        values.weekends &&
            `
    function isWeekendDay(date: DateValue) {
        return isWeekend(date, ${quote(values.locale)});
    }`,
        values.unavailable &&
            `
    function isBooked(date: DateValue) {
        return date.month === ${BOOKED_MONTH} && booked.includes(date.day);
    }`
    ]);

    return lines.join('\n');
}

/** Prints the children snippet with month and year selects, through the closing Root tag. */
export function headerSnippet(
    name: string,
    values: Pick<FormatValues, 'locale' | 'numberOfMonths'>
): string {
    const indent = '                    ';
    const month = tag(
        `${name}.Month`,
        {
            locale: changed(values.locale, DEFAULT_LOCALE),
            showHeading: values.numberOfMonths > 1
        },
        ' />',
        indent,
        ['{month}', '{weekdays}']
    );

    return `
        {#snippet children({ months, weekdays })}
            <${name}.Header>
                <${name}.MonthSelect />
                <${name}.YearSelect />
            </${name}.Header>
            <div class="flex max-w-full flex-wrap justify-center gap-3">
                {#each months as month (month.value.toString())}
${indent}${month}
                {/each}
            </div>
        {/snippet}
    </${name}.Root>`;
}
