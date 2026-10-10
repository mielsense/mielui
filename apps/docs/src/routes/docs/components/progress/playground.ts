import { attributes, number, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

export const controls = {
    label: toggle('Label', 'Content', true),
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

/** The share of `max` that `value` covers, rounded, with the limits Progress applies. */
export function percent(value: number, max: number): number {
    const total = Number.isFinite(max) && max > 0 ? max : 100;
    const done = Number.isFinite(value) ? Math.min(Math.max(value, 0), total) : 0;

    return Math.round((done / total) * 100);
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        value: values.value !== 0 && values.value,
        max: values.max !== 100 && values.max,
        indeterminate: values.indeterminate,
        'aria-label': 'Release archive upload'
    });
    const amount = values.indeterminate
        ? ''
        : `
        <span class="tabular-nums">${percent(values.value, values.max)}%</span>`;
    const label = values.label
        ? `
    <div class="flex items-center justify-between gap-3 text-sm text-foreground-muted">
        <span>${values.indeterminate ? 'Preparing release.zip' : 'Uploading release.zip'}</span>${amount}
    </div>`
        : '';

    return `<script lang="ts">
    import { Progress } from '@mielui/svelte/components/progress';
</script>

<div class="flex w-full max-w-md flex-col gap-2">${label}
    <Progress${props} />
</div>`;
}
