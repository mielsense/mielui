<script lang="ts">
    import type { MessageFrom, MessageStatus } from '@mielui/svelte/components/message';
    import * as Message from '@mielui/svelte/components/message';

    let { from = 'assistant', status = 'idle' }: { from?: MessageFrom; status?: MessageStatus } =
        $props();
</script>

<Message.Root {from} {status} name="Mielui" timestamp="14:32">
    <Message.Content>Deployment analysis complete.</Message.Content>
    <Message.Actions aria-label="Response actions">
        <button type="button">Copy response</button>
    </Message.Actions>
</Message.Root>
