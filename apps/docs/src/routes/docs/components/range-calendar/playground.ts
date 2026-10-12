import { changed, type PlaygroundValues, tag } from '$lib/components/docs/playground';
import {
    constraintAttributes,
    constraintControls,
    DEFAULT_LOCALE,
    dateImport,
    formatAttributes,
    formatControls,
    headerControls,
    headerSnippet,
    navigationAttributes,
    navigationControls,
    rangeAttributes,
    rangeControls,
    rangeDeclaration,
    script,
    stateControls
} from '$lib/components/docs/playground/calendar';

export const controls = {
    ...formatControls(),
    ...headerControls,
    ...stateControls,
    ...constraintControls,
    ...rangeControls,
    ...navigationControls
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const custom = values.header === 'selects';
    const root = tag(
        'RangeCalendar.Root',
        {
            calendarLabel: 'Travel dates',
            locale: changed(values.locale, DEFAULT_LOCALE),
            ...formatAttributes(values),
            disabled: values.disabled,
            readonly: values.readonly,
            ...constraintAttributes(values),
            ...rangeAttributes(values),
            ...navigationAttributes(values)
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
