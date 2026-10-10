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
    tone: select('Tone', ['primary', 'muted', 'success', 'warning', 'error'], 'primary'),
    animation: select('Animation', ['reveal', 'live', 'none'], 'reveal', 'Appearance'),
    size: number('Size', 120, {
        min: 16,
        max: 240,
        step: 4,
        group: 'Appearance'
    }),
    strokeWidth: number('Stroke width', 0, {
        min: 0,
        max: 40,
        step: 1,
        group: 'Appearance'
    }),
    value: number('Value', 72, {
        min: 0,
        max: 1000,
        step: 1,
        group: 'Content'
    }),
    max: number('Max', 100, {
        min: 1,
        max: 1000,
        step: 1,
        group: 'Content'
    }),
    label: text('Label', 'Monthly API usage', 'Content'),
    unit: toggle('Percent sign', 'Content'),
    loading: toggle('Loading', 'State'),
    empty: toggle('No data', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        value: expression(values.empty ? 'null' : String(values.value)),
        max: values.max !== 100 && values.max,
        label: values.label,
        size: values.size !== 120 && values.size,
        strokeWidth: values.strokeWidth > 0 && values.strokeWidth,
        tone: values.tone !== 'primary' && values.tone,
        animation: values.animation !== 'reveal' && values.animation,
        loading: values.loading
    });
    const gauge = values.unit
        ? `<Gauge${props}>
    <span>
        ${values.value}<span class="text-base text-foreground-muted">%</span>
    </span>
</Gauge>`
        : `<Gauge${props} />`;

    return `<script lang="ts">
    import { Gauge } from '@mielui/svelte/components/gauge';
</script>

${gauge}`;
}
