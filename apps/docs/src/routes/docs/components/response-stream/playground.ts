import {
    attributes,
    changed,
    expression,
    number,
    type PlaygroundValues,
    quote,
    select,
    toggle
} from '$lib/components/docs/playground';

export const response =
    'The release contains twelve changes. Two affect keyboard navigation, four update the documentation, and six fix existing behavior.';

export const controls = {
    as: select('Element', ['span', 'p', 'div'], 'span'),
    speed: number('Speed', 20, {
        min: 1,
        max: 100,
        step: 1,
        group: 'Behavior'
    }),
    characterChunkSize: number('Chunk size', 0, {
        min: 0,
        max: 24,
        step: 1,
        group: 'Behavior'
    }),
    streaming: toggle('Streaming', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        textStream: expression('response'),
        as: changed(values.as, 'span'),
        speed: changed(values.speed, 20),
        characterChunkSize: values.characterChunkSize > 0 && values.characterChunkSize,
        streaming: values.streaming
    });

    return `<script lang="ts">
    import { ResponseStream } from '@mielui/svelte/components/response-stream';

    const response =
        ${quote(response)};
</script>

<ResponseStream${props} />`;
}
