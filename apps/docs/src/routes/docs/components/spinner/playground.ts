import { attributes, number, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

export const controls = {
    size: number('Size', 16, {
        min: 8,
        max: 64,
        step: 2,
        group: 'Appearance'
    }),
    label: toggle('Visible label', 'Content', true),
    ready: toggle('Ready', 'State'),
    speed: number('Speed', 1, {
        min: 0.25,
        max: 4,
        step: 0.25,
        group: 'Behavior'
    }),
    curved: toggle('Curved rotation', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        size: values.size !== 16 && values.size,
        ready: values.ready,
        speed: values.speed !== 1 && values.speed,
        curved: values.curved,
        'aria-hidden': values.label && 'true',
        'aria-label': !values.label && 'Checking for updates'
    });
    const markup = values.label
        ? `<div class="flex items-center gap-3 text-sm text-foreground-muted">
    <Spinner${props} />
    <span>Checking for updates</span>
</div>`
        : `<Spinner${props} />`;

    return `<script lang="ts">
    import { Spinner } from '@mielui/svelte/components/spinner';
</script>

${markup}`;
}
