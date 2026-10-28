import {
    attributes,
    compact,
    content,
    type PlaygroundValues,
    select,
    toggle
} from '#lib/components/docs/playground.js';

type Turn = {
    from: 'user' | 'assistant';
    text: string;
};

export const transcript: Turn[] = [
    {
        from: 'user',
        text: 'Investigate why checkout latency rose after 14:00 UTC and give me a safe mitigation.'
    },
    {
        from: 'assistant',
        text: 'The increase starts in POST /checkout right after release web-2418. Address validation added 430 ms at p95, and the provider timed out for 8% of non-US requests.'
    },
    {
        from: 'user',
        text: 'Show me the smallest rollback and how to verify it.'
    },
    {
        from: 'assistant',
        text: 'Disable the checkout.address-verification flag, then watch p95 latency for ten minutes. This avoids reverting the unrelated tax fixes in the same release.'
    }
];

export const controls = {
    view: select('View', ['transcript', 'empty'], 'transcript'),
    scrollButton: toggle('Scroll button', 'Content', true)
};

type Values = PlaygroundValues<typeof controls>;

function messages(): string {
    return transcript
        .map((message) => {
            return `        <Message.Root${attributes({ from: message.from })}>
            <Message.Content>
                ${content(message.text)}
            </Message.Content>
        </Message.Root>`;
        })
        .join('\n');
}

export function code(values: Values): string {
    const empty = values.view === 'empty';
    const imports = compact([
        `    import * as Conversation from '@mielui/svelte/components/conversation';`,
        !empty && `    import * as Message from '@mielui/svelte/components/message';`
    ]).join('\n');
    const scrollButton = values.scrollButton
        ? `
    <Conversation.ScrollButton />`
        : '';

    return `<script lang="ts">
${imports}
</script>

<Conversation.Root class="mielui-plate h-72 w-full max-w-xl">
    <Conversation.Content aria-label="Checkout incident conversation">
${empty ? '        <Conversation.Empty />' : messages()}
    </Conversation.Content>${scrollButton}
</Conversation.Root>`;
}
