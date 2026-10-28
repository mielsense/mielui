import {
    attributes,
    changed,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    mode: select('Mode', ['default', 'range', 'field'], 'default'),
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
    disabled: toggle('Disabled', 'State'),
    rtl: toggle('Right to left', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const range = values.mode === 'range';
    const props = attributes({
        variant: values.mode === 'field' && 'field',
        label: 'Volume',
        min: changed(values.min, 0),
        max: changed(values.max, 100),
        step: changed(values.step, 1),
        disabled: values.disabled,
        dir: values.rtl && 'rtl'
    });
    const state = range
        ? 'let volume = $state<[number, number]>([20, 80]);'
        : 'let volume = $state(64);';
    const binding = range ? 'range bind:value={volume}' : 'bind:value={volume}';

    return `<script lang="ts">
    import { Slider } from '@mielui/svelte/components/slider';

    ${state}
</script>

<div class="w-full max-w-sm">
    <Slider ${binding}${props} />
</div>`;
}
