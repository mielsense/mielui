import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'field'], 'default'),
    label: text('Label', 'Volume', 'Content'),
    format: toggle('Percent format', 'Content'),
    disabled: toggle('Disabled', 'State'),
    range: toggle('Range (default only)', 'Behavior'),
    editable: toggle('Editable (field only)', 'Behavior'),
    min: number('Min', 0, {
        min: -100,
        max: 100,
        group: 'Behavior'
    }),
    max: number('Max', 100, {
        min: 1,
        max: 1000,
        group: 'Behavior'
    }),
    step: number('Step', 1, {
        min: 1,
        max: 50,
        group: 'Behavior'
    }),
    rtl: toggle('Right to left', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const field = values.variant === 'field' && !values.range;
    const props = attributes({
        variant: field && 'field',
        label: values.label,
        min: values.min !== 0 && values.min,
        max: values.max !== 100 && values.max,
        step: values.step !== 1 && values.step,
        format: values.format && expression(`(value) => \`\${value}%\``),
        editable: field && values.editable,
        disabled: values.disabled,
        dir: values.rtl && 'rtl'
    });
    const state = values.range
        ? 'let volume = $state<[number, number]>([20, 80]);'
        : 'let volume = $state(64);';
    const binding = values.range ? 'range bind:value={volume}' : 'bind:value={volume}';

    return `<script lang="ts">
    import { Slider } from '@mielui/svelte/components/slider';

    ${state}
</script>

<Slider ${binding}${props} />`;
}
