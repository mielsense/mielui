import { type PlaygroundValues, tag } from '$lib/components/docs/playground';
import {
    calendarAttributes,
    calendarControls,
    constraintAttributes,
    dateImport,
    headerSnippet,
    rangeAttributes,
    rangeControls,
    rangeDeclaration,
    script
} from '$lib/components/docs/playground/calendar';

export const controls = {
    ...calendarControls,
    ...rangeControls
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const custom = values.header === 'selects';
    const root = tag(
        'RangeCalendar.Root',
        {
            calendarLabel: 'Travel dates',
            ...calendarAttributes(values),
            ...constraintAttributes(values),
            ...rangeAttributes(values)
        },
        custom ? '>' : ' />',
        '    ',
        ['bind:value']
    );
    const children = custom ? headerSnippet('RangeCalendar', values) : '';

    return `<script lang="ts">
${dateImport(values)}
    import * as RangeCalendar from '@mielui/svelte/components/range-calendar';

${script(values, [rangeDeclaration()])}
</script>

<div class="mielui-plate max-w-full">
    ${root}${children}
</div>`;
}
