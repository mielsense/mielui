import { attributes, number, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

export const controls = {
    label: toggle('Label', 'Content', true),
    steppers: toggle('Stepper buttons', 'Content', true),
    disabled: toggle('Disabled', 'State'),
    readonly: toggle('Read only', 'State'),
    invalid: toggle('Invalid', 'State'),
    min: number('Min', 1, {
        min: -100,
        max: 100,
        group: 'Behavior'
    }),
    max: number('Max', 12, {
        min: -100,
        max: 1000,
        group: 'Behavior'
    }),
    step: number('Step', 1, {
        min: 0.1,
        max: 50,
        step: 0.1,
        group: 'Behavior'
    })
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        min: values.min,
        max: values.max,
        step: values.step !== 1 && values.step,
        disabled: values.disabled,
        readonly: values.readonly
    });
    const input = attributes({
        'aria-label': !values.label && 'Seats',
        'aria-invalid': values.invalid && 'true'
    });
    const label = values.label
        ? `
    <NumberField.Label>Seats</NumberField.Label>`
        : '';
    const group = values.steppers
        ? `        <NumberField.Decrement />
        <NumberField.Input${input} />
        <NumberField.Increment />`
        : `        <NumberField.Input${input} />`;

    return `<script lang="ts">
    import * as NumberField from '@mielui/svelte/components/number-field';

    let seats = $state<number | undefined>(2);
</script>

<NumberField.Root bind:value={seats}${root}>${label}
    <NumberField.Group class="w-36">
${group}
    </NumberField.Group>
</NumberField.Root>`;
}
