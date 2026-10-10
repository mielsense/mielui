import {
    attributes,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const weekStarts = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
} satisfies Record<string, 0 | 1 | 2 | 3 | 4 | 5 | 6>;

export const locales = {
    english: 'en-US',
    french: 'fr-FR',
    german: 'de-DE',
    japanese: 'ja-JP'
};

export const controls = {
    animation: select('Animation', ['rows', 'columns', 'live', 'none'], 'rows'),
    weeks: number('Weeks', 26, {
        min: 1,
        max: 104,
        step: 1,
        group: 'Appearance'
    }),
    weekStartsOn: select(
        'Week starts on',
        ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        'sunday',
        'Appearance'
    ),
    locale: select('Locale', ['english', 'french', 'german', 'japanese'], 'english', 'Appearance'),
    summary: toggle('Summary', 'Content', true),
    monthLabels: toggle('Month labels', 'Content', true),
    weekdayLabels: toggle('Weekday labels', 'Content', true),
    tooltip: toggle('Tooltip', 'Content', true),
    detail: toggle('Detail', 'Content', true),
    legend: toggle('Legend', 'Content', true),
    loading: toggle('Loading', 'State'),
    empty: toggle('Empty', 'State')
};

type Values = PlaygroundValues<typeof controls>;

function parts(values: Values): string {
    const lines = [
        values.summary && ['<Heatmap.Header>', '    <Heatmap.Summary />', '</Heatmap.Header>'],
        [
            '<Heatmap.Calendar>',
            values.monthLabels && '    <Heatmap.MonthLabels />',
            values.weekdayLabels && '    <Heatmap.WeekdayLabels />',
            '    <Heatmap.Grid />',
            '</Heatmap.Calendar>'
        ],
        values.tooltip && ['<Heatmap.Tooltip />'],
        (values.detail || values.legend) && [
            '<Heatmap.Footer>',
            values.detail && '    <Heatmap.Detail />',
            values.legend && '    <Heatmap.Legend />',
            '</Heatmap.Footer>'
        ]
    ];

    return lines
        .flatMap((group) => group || [])
        .filter((line) => line !== false)
        .map((line) => `    ${line}`)
        .join('\n');
}

export function code(values: Values): string {
    const props = attributes({
        weeks: values.weeks !== 26 && values.weeks,
        endDate: '2026-09-15',
        weekStartsOn: values.weekStartsOn !== 'sunday' && weekStarts[values.weekStartsOn],
        locale: values.locale !== 'english' && locales[values.locale],
        animation: values.animation !== 'rows' && values.animation,
        loading: values.loading
    });
    const complete =
        values.summary &&
        values.monthLabels &&
        values.weekdayLabels &&
        values.tooltip &&
        values.detail &&
        values.legend;
    const days = values.empty
        ? `    const days: { date: string; count: number }[] = [];`
        : `    const days = Array.from({ length: 182 }, (_, index) => {
        const date = new Date(Date.UTC(2026, 2, 18 + index));

        return {
            date: date.toISOString().slice(0, 10),
            count: index % 7 === 0 ? 0 : (index * 17 + (index % 11)) % 24
        };
    });`;
    const heatmap = complete
        ? `<Heatmap.Root {days}${props} />`
        : `<Heatmap.Root {days}${props}>
${parts(values)}
</Heatmap.Root>`;

    return `<script lang="ts">
    import * as Heatmap from '@mielui/svelte/components/heatmap';

${days}
</script>

${heatmap}`;
}
