import {
    attributes,
    changed,
    number,
    type PlaygroundValues,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    value: number('Value', 40, {
        min: 0,
        max: 100,
        step: 5,
        group: 'State'
    }),
    max: number('Max', 100, {
        min: 1,
        max: 1000,
        step: 1,
        group: 'State'
    }),
    indeterminate: toggle('Indeterminate', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        value: changed(values.value, 0),
        max: changed(values.max, 100),
        indeterminate: values.indeterminate,
        'aria-label': 'Release archive upload'
    });

    return `<script lang="ts">
    import { Progress } from '@mielui/svelte/components/progress';
</script>

<div class="w-full max-w-md">
    <Progress${props} />
</div>`;
}
