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
    script,
    stateControls,
    valueDeclaration
} from '$lib/components/docs/playground/calendar';

export const controls = {
    ...formatControls(),
    ...headerControls,
    ...stateControls,
    ...constraintControls,
    ...navigationControls
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const custom = values.header === 'selects';
    const root = tag(
        'Calendar.Root',
        {
            calendarLabel: 'Meeting date',
            locale: changed(values.locale, DEFAULT_LOCALE),
            ...formatAttributes(values),
            disabled: values.disabled,
            readonly: values.readonly,
            ...constraintAttributes(values),
            ...navigationAttributes(values)
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
