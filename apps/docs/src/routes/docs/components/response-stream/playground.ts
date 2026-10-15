import {
    attributes,
    changed,
    expression,
    number,
    type PlaygroundValues,
    quote
} from '$lib/components/docs/playground';

export const response =
    'The release contains twelve changes. Two affect keyboard navigation, four update the documentation, and six fix existing behavior.';

export const controls = {
    speed: number('Speed', 20, {
        min: 1,
        max: 100,
        step: 1,
        group: 'Behavior'
    })
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        textStream: expression('response'),
        speed: changed(values.speed, 20)
    });

    return `<script lang="ts">
    import { ResponseStream } from '@mielui/svelte/components/response-stream';

    const response =
        ${quote(response)};
</script>

<div class="w-full max-w-xl">
    <ResponseStream${props} />
</div>`;
}
