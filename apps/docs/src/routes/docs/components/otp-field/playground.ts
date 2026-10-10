import {
    attributes,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    characters: select('Characters', ['digits', 'alphanumeric'], 'digits'),
    separator: toggle('Separator', 'Content'),
    disabled: toggle('Disabled', 'State'),
    invalid: toggle('Invalid', 'State'),
    length: number('Length', 6, {
        min: 2,
        max: 8,
        group: 'Behavior'
    })
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const alphanumeric = values.characters === 'alphanumeric';
    const half = Math.ceil(values.length / 2);
    const props = attributes({
        'aria-label': 'Verification code',
        length: values.length !== 6 && values.length,
        pattern: alphanumeric && '^[a-zA-Z0-9]*$',
        inputmode: alphanumeric && 'text',
        disabled: values.disabled,
        'aria-invalid': values.invalid && 'true'
    });
    const element = values.separator
        ? `<OTPField.Root bind:value={code}${props}>
    {#snippet children({ cells })}
        <OTPField.Group>
            {#each cells.slice(0, ${half}) as cell, index (index)}
                <OTPField.Cell {cell} />
            {/each}
        </OTPField.Group>
        <OTPField.Separator />
        <OTPField.Group>
            {#each cells.slice(${half}) as cell, index (index)}
                <OTPField.Cell {cell} />
            {/each}
        </OTPField.Group>
    {/snippet}
</OTPField.Root>`
        : `<OTPField.Root bind:value={code}${props} />`;

    return `<script lang="ts">
    import * as OTPField from '@mielui/svelte/components/otp-field';

    let code = $state('');
</script>

${element}`;
}
