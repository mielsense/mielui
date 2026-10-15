import { CalendarDate, CalendarDateTime, type DateValue, isWeekend } from '@internationalized/date';
import { type AttributeValues, changed, compact, expression, quote, tag } from './code';
import { number, type PlaygroundValues, select, toggle } from './controls';

const BOOKED_MONTH = 9;
const BOOKED_DAYS = [8, 9, 22];
const LOCALES = ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'ja-JP'] as const;

export const DEFAULT_LOCALE = 'en-US';
export const MIN_DAYS = 2;
export const MAX_DAYS = 7;

export const minDate = new CalendarDate(2026, 9, 7);
export const maxDate = new CalendarDate(2026, 10, 16);
export const startDate = new CalendarDate(2026, 9, 17);
export const endDate = new CalendarDate(2026, 9, 23);
export const startTime = new CalendarDateTime(2026, 9, 17, 9, 30);
export const endTime = new CalendarDateTime(2026, 9, 23, 18, 0);

const constraintControls = {
    bounds: toggle('Min and max dates', 'Behavior'),
    weekends: toggle('Disable weekends', 'Behavior'),
    unavailable: toggle('Unavailable dates', 'Behavior')
};

/** The controls of a standalone calendar. The header select sits in the toolbar. */
export const calendarControls = {
    header: select('Header', ['arrows', 'selects'], 'arrows'),
    locale: select('Locale', LOCALES, DEFAULT_LOCALE, 'Appearance'),
    weekdayFormat: select('Weekday format', ['narrow', 'short', 'long'], 'short', 'Appearance'),
    numberOfMonths: number('Months', 1, {
        min: 1,
        max: 2,
        step: 1,
        group: 'Appearance'
    }),
    disabled: toggle('Disabled', 'State'),
    ...constraintControls
};

/** The controls of a date picker. The granularity select sits in the toolbar. */
export const pickerControls = {
    granularity: select('Granularity', ['day', 'hour', 'minute', 'second'], 'day'),
    surface: select('Surface', ['theme', 'solid', 'glass'], 'theme', 'Appearance'),
    locale: select('Locale', LOCALES, DEFAULT_LOCALE, 'Appearance'),
    label: toggle('Label', 'Content', true),
    disabled: toggle('Disabled', 'State'),
    ...constraintControls
};

export const rangeControls = {
    limit: toggle('Two to seven days', 'Behavior')
};

type CalendarValues = PlaygroundValues<typeof calendarControls>;
type ConstraintValues = PlaygroundValues<typeof constraintControls>;
type RangeValues = PlaygroundValues<typeof rangeControls>;
type PickerValues = PlaygroundValues<typeof pickerControls>;

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

export function calendarAttributes(values: CalendarValues): AttributeValues {
    return {
        locale: changed(values.locale, DEFAULT_LOCALE),
        weekdayFormat: changed(values.weekdayFormat, 'short'),
        numberOfMonths: changed(values.numberOfMonths, 1),
        disabled: values.disabled
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
        maxDays: values.limit && MAX_DAYS
    };
}

/** A date-time value already defaults to minute granularity, so only other units print. */
export function pickerAttributes(values: PickerValues): AttributeValues {
    return {
        locale: changed(values.locale, DEFAULT_LOCALE),
        granularity: hasTime(values) && changed(values.granularity, 'minute'),
        disabled: values.disabled
    };
}

/** The panel lines up with the trigger at the end of the field. */
export function contentAttributes(values: Pick<PickerValues, 'surface'>): AttributeValues {
    return {
        align: 'end',
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

/**
 * Prints the body of the example script: the booked days, then `declarations`, then the date
 * matchers the constraint controls switched on.
 */
export function script(
    values: ConstraintValues & {
        locale: string;
    },
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
    values: Pick<CalendarValues, 'locale' | 'numberOfMonths'>
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
