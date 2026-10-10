import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    text,
    toggle
} from '$lib/components/docs/playground';

const DEFAULT_TITLE = 'Start a conversation';
const DEFAULT_DESCRIPTION = 'Ask a question or share what you are working on.';

export const transcript: { from: 'user' | 'assistant'; text: string }[] = [
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
    scrollButton: toggle('Scroll button', 'Content', true),
    empty: toggle('Empty state', 'Content'),
    emptyTitle: text('Empty title', DEFAULT_TITLE, 'Content'),
    emptyDescription: text('Empty description', DEFAULT_DESCRIPTION, 'Content'),
    emptyIcon: toggle('Custom empty icon', 'Content'),
    emptyAction: toggle('Empty action', 'Content'),
    follow: toggle('Follow', 'Behavior', true),
    threshold: number('Threshold', 80, {
        min: 0,
        max: 400,
        step: 10,
        group: 'Behavior'
    })
};

type Values = PlaygroundValues<typeof controls>;

function textAttribute(name: string, value: string, fallback: string): string {
    return value === fallback
        ? ''
        : attributes({
              [name]: value
          });
}

function emptyState(values: Values): string {
    const icon = values.emptyIcon ? ' {icon}' : '';
    const title = textAttribute('title', values.emptyTitle, DEFAULT_TITLE);
    const description = textAttribute('description', values.emptyDescription, DEFAULT_DESCRIPTION);
    const action = values.emptyAction ? ' {action}' : '';

    return `        <Conversation.Empty${icon}${title}${description}${action} />`;
}

function messages(): string {
    return transcript
        .map((message) => {
            return `        <Message.Root from="${message.from}">
            <Message.Content>
                ${message.text}
            </Message.Content>
        </Message.Root>`;
        })
        .join('\n');
}

export function code(values: Values): string {
    const root = attributes({
        follow: values.follow ? undefined : expression('false'),
        threshold: values.threshold !== 80 && values.threshold
    });
    const icon = values.empty && values.emptyIcon;
    const action = values.empty && values.emptyAction;
    const imports = [
        icon && `    import { File01Icon as FileText } from '@hugeicons/core-free-icons';`,
        action && `    import { Button } from '@mielui/svelte/components/button';`,
        `    import * as Conversation from '@mielui/svelte/components/conversation';`,
        !values.empty && `    import * as Message from '@mielui/svelte/components/message';`,
        icon && `    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
    ]
        .filter((line) => line !== false)
        .join('\n');
    const snippets = [
        icon &&
            `{#snippet icon()}
    <HugeiconsIcon icon={FileText} size={18} strokeWidth={1.75} aria-hidden="true" />
{/snippet}

`,
        action &&
            `{#snippet action()}
    <Button size="md">Draft a release plan</Button>
{/snippet}

`
    ]
        .filter((snippet) => snippet !== false)
        .join('');
    const scrollButton = values.scrollButton
        ? `
    <Conversation.ScrollButton />`
        : '';

    return `<script lang="ts">
${imports}
</script>

${snippets}<Conversation.Root${root} class="mielui-plate h-72 w-full max-w-xl">
    <Conversation.Content aria-label="Checkout incident conversation">
${values.empty ? emptyState(values) : messages()}
    </Conversation.Content>${scrollButton}
</Conversation.Root>`;
}
