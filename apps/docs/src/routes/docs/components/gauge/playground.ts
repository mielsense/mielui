import {
    attributes,
    changed,
    expression,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    tone: select('Tone', ['primary', 'muted', 'success', 'warning', 'error'], 'primary'),
    animation: select('Animation', ['reveal', 'live', 'none'], 'reveal', 'Appearance'),
    size: number('Size', 120, {
        min: 16,
        max: 240,
        step: 4,
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
    unit: toggle('Percent sign', 'Content'),
    loading: toggle('Loading', 'State'),
    empty: toggle('No data', 'State')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const props = attributes({
        value: values.empty ? expression('null') : values.value,
        max: changed(values.max, 100),
        label: 'Monthly API usage',
        size: changed(values.size, 120),
        tone: changed(values.tone, 'primary'),
        animation: changed(values.animation, 'reveal'),
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
