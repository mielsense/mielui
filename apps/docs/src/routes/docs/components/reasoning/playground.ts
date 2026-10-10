import {
    attributes,
    expression,
    type PlaygroundValues,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    title: text('Title', 'Investigated checkout failures', 'Content'),
    duration: text('Duration', '4.8s', 'Content'),
    streaming: toggle('Streaming', 'State'),
    open: toggle('Open', 'State', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        streaming: values.streaming,
        open: values.open ? undefined : expression('false')
    });
    const trigger = attributes({
        title: values.title,
        duration: values.duration
    });

    return `<script lang="ts">
    import * as Reasoning from '@mielui/svelte/components/reasoning';
</script>

<Reasoning.Root${root}>
    <Reasoning.Trigger${trigger} />
    <Reasoning.Content>
        <div class="space-y-3">
            <p>Compared the incident timeline with the last five production deployments.</p>
            <p>
                Filtered payment errors by issuer country and found the regression only affects
                non-US cards.
            </p>
        </div>
    </Reasoning.Content>
</Reasoning.Root>`;
}
