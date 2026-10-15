<script lang="ts">
    import type { ConversationLabels } from '@mielui/svelte/components/conversation';
    import * as Conversation from '@mielui/svelte/components/conversation';

    let {
        follow = $bindable(true),
        empty = false,
        label = 'Agent conversation',
        labels
    }: {
        follow?: boolean;
        empty?: boolean;
        label?: string;
        labels?: ConversationLabels;
    } = $props();
</script>

<Conversation.Root bind:follow {labels}>
    <Conversation.Content aria-label={label}>
        {#if empty}
            <Conversation.Empty />
        {:else}
            <p>Most recent response</p>
        {/if}
    </Conversation.Content>
    <Conversation.ScrollButton />
</Conversation.Root>
