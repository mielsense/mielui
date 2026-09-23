export type Day = {
    date: string;
    count: number;
    level?: number;
};

export type Cell = {
    date: string;
    count: number;
    level: number;
    column: number;
    row: number;
    label: string;
};

const DAY = 86_400_000;

function timestamp(value: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new RangeError('Heatmap dates must use YYYY-MM-DD.');
    }
    const time = Date.parse(`${value}T00:00:00Z`);
    if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== value) {
        throw new RangeError(`Invalid Heatmap date: ${value}`);
    }
    return time;
}

export function calendar(
    days: readonly Day[],
    weeks: number,
    endDate: string | undefined,
    weekStartsOn: number,
    locale: string
) {
    if (!Number.isInteger(weeks) || weeks < 1 || weeks > 104) {
        throw new RangeError('Heatmap weeks must be an integer from 1 to 104.');
    }
    if (!Number.isInteger(weekStartsOn) || weekStartsOn < 0 || weekStartsOn > 6) {
        throw new RangeError('Heatmap weekStartsOn must be an integer from 0 to 6.');
    }
    const values = new Map<string, Day>();
    let latest: number | undefined;
    for (const day of days) {
        const time = timestamp(day.date);
        if (!Number.isFinite(day.count) || day.count < 0) {
            throw new RangeError('Heatmap counts must be finite, non-negative numbers.');
        }
        if (
            day.level !== undefined &&
            (!Number.isInteger(day.level) || day.level < 0 || day.level > 4)
        ) {
            throw new RangeError('Heatmap levels must be integers from 0 to 4.');
        }
        values.set(day.date, day);
        latest = Math.max(latest ?? time, time);
    }
    const end = endDate ? timestamp(endDate) : (latest ?? Math.floor(Date.now() / DAY) * DAY);
    const endRow = (new Date(end).getUTCDay() - weekStartsOn + 7) % 7;
    const start = end - (endRow + (weeks - 1) * 7) * DAY;
    const visible = [...values.values()].filter((day) => {
        const time = timestamp(day.date);
        return time >= start && time <= end;
    });
    const maximum = Math.max(1, ...visible.map((day) => day.count));
    const formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' });
    const countFormatter = new Intl.NumberFormat(locale);
    const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
    const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
    const cells: Cell[] = [];
    const months: { label: string; column: number }[] = [];
    let lastMonth = -1;
    for (let time = start, index = 0; time <= end; time += DAY, index += 1) {
        const date = new Date(time);
        const key = date.toISOString().slice(0, 10);
        const source = values.get(key);
        const count = source?.count ?? 0;
        const column = Math.floor(index / 7) + 1;
        if (index % 7 === 0 && date.getUTCMonth() !== lastMonth) {
            if (months.length === 0 || column - months[months.length - 1].column >= 3) {
                months.push({ label: monthFormatter.format(date), column });
                lastMonth = date.getUTCMonth();
            }
        }
        cells.push({
            date: key,
            count,
            level:
                source?.level ?? (count === 0 ? 0 : Math.max(1, Math.ceil((count / maximum) * 4))),
            column,
            row: (index % 7) + 1,
            label: `${formatter.format(date)}: ${countFormatter.format(count)} contributions`
        });
    }
    const weekdays = Array.from({ length: 7 }, (_, row) =>
        weekdayFormatter.format(new Date(start + row * DAY))
    );
    return {
        cells,
        months,
        weekdays,
        total: cells.reduce((total, cell) => total + cell.count, 0),
        endDate: new Date(end).toISOString().slice(0, 10),
        weeks
    };
}
