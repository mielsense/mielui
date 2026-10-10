import {
    attributes,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const messages = {
    assistant:
        'The deployment is healthy. Error rate and p95 latency are both below the rollback threshold.',
    user: 'Keep monitoring until the 30-minute mark.',
    system: 'Context compacted after 18 messages. Deployment events and decisions were preserved.'
};

export const controls = {
    from: select('From', ['assistant', 'user', 'system'], 'assistant'),
    name: text('Name', 'Mielui', 'Content'),
    timestamp: text('Timestamp', '14:02', 'Content'),
    avatar: toggle('Avatar', 'Content'),
    actions: toggle('Actions', 'Content'),
    status: select('Status', ['idle', 'streaming', 'error'], 'idle', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        from: values.from !== 'assistant' && values.from,
        status: values.status !== 'idle' && values.status,
        name: values.name,
        timestamp: values.timestamp
    });
    const avatarProp = values.avatar ? ' {avatar}' : '';
    const imports = [
        values.avatar && `    import * as Avatar from '@mielui/svelte/components/avatar';`,
        values.actions && `    import { CopyButton } from '@mielui/svelte/components/copy-button';`,
        `    import * as Message from '@mielui/svelte/components/message';`
    ]
        .filter((line) => line !== false)
        .join('\n');
    const avatar = values.avatar
        ? `{#snippet avatar()}
    <Avatar.Root size="sm">
        <Avatar.Fallback>MI</Avatar.Fallback>
    </Avatar.Root>
{/snippet}

`
        : '';
    const actions = values.actions
        ? `
    <Message.Actions>
        <CopyButton
            {text}
            label="Copy message"
            copiedLabel="Message copied"
            variant="ghost"
            size="md"
            class="size-8 rounded-[var(--radius-md)] p-0"
        />
    </Message.Actions>`
        : '';

    return `<script lang="ts">
${imports}

    const text =
        '${messages[values.from]}';
</script>

${avatar}<Message.Root${props}${avatarProp}>
    <Message.Content>{text}</Message.Content>${actions}
</Message.Root>`;
}
