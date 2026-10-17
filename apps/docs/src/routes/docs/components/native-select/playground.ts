import { attributes, number, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

export const controls = {
    groups: toggle('Option groups', 'Content', true),
    disabled: toggle('Disabled', 'State'),
    invalid: toggle('Invalid', 'State'),
    disabledOption: toggle('Disabled option', 'State'),
    multiple: toggle('Multiple', 'Behavior'),
    size: number('Visible rows', 1, {
        min: 1,
        max: 8,
        group: 'Behavior'
    })
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        'aria-label': 'Time zone',
        multiple: values.multiple,
        size: values.size > 1 && values.size,
        disabled: values.disabled,
        'aria-invalid': values.invalid && 'true'
    });
    const losAngeles = attributes({
        value: 'America/Los_Angeles',
        disabled: values.disabledOption
    });
    const indent = values.groups ? '        ' : '    ';
    const europe = `${indent}<NativeSelect.Option value="Europe/Paris">Paris</NativeSelect.Option>
${indent}<NativeSelect.Option value="Europe/London">London</NativeSelect.Option>`;
    const americas = `${indent}<NativeSelect.Option value="America/New_York">New York</NativeSelect.Option>
${indent}<NativeSelect.Option${losAngeles}>Los Angeles</NativeSelect.Option>`;
    const options = values.groups
        ? `    <NativeSelect.OptGroup label="Europe">
${europe}
    </NativeSelect.OptGroup>
    <NativeSelect.OptGroup label="Americas">
${americas}
    </NativeSelect.OptGroup>`
        : `${europe}
${americas}`;
    const state = values.multiple
        ? "let timezones = $state(['Europe/Paris']);"
        : "let timezone = $state('Europe/Paris');";
    const binding = values.multiple ? 'timezones' : 'timezone';

    return `<script lang="ts">
    import * as NativeSelect from '@mielui/svelte/components/native-select';

    ${state}
</script>

<NativeSelect.Root bind:value={${binding}}${props}>
${options}
</NativeSelect.Root>`;
}
