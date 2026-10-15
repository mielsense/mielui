import { type PlaygroundValues, tag } from '$lib/components/docs/playground';
import {
    calendarAttributes,
    calendarControls,
    constraintAttributes,
    dateImport,
    headerSnippet,
    script,
    valueDeclaration
} from '$lib/components/docs/playground/calendar';

export const controls = calendarControls;

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const custom = values.header === 'selects';
    const root = tag(
        'Calendar.Root',
        {
            calendarLabel: 'Meeting date',
            ...calendarAttributes(values),
            ...constraintAttributes(values)
        },
        custom ? '>' : ' />',
        '    ',
        ['bind:value']
    );
    const children = custom ? headerSnippet('Calendar', values) : '';

    return `<script lang="ts">
${dateImport(values)}
    import * as Calendar from '@mielui/svelte/components/calendar';

${script(values, [valueDeclaration()])}
</script>

<div class="mielui-plate max-w-full">
    ${root}${children}
</div>`;
}
