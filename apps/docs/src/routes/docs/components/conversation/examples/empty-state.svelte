<script lang="ts">
    import { File01Icon as FileText } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Conversation from '@mielui/svelte/components/conversation';
    import * as Message from '@mielui/svelte/components/message';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let started = $state(false);
</script>

{#snippet emptyIcon()}
    <HugeiconsIcon icon={FileText} size={18} strokeWidth={1.75} aria-hidden="true" />
{/snippet}

{#snippet startAction()}
    <Button size="md" onclick={() => (started = true)}>Draft a release plan</Button>
{/snippet}

<Conversation.Root
    class="h-[22rem] w-full max-w-2xl rounded-[var(--radius-xl)] border border-border bg-panel"
>
    <Conversation.Content aria-label="Release planning conversation">
        {#if started}
            <Message.Root from="user">
                <Message.Content>
                    Draft a release plan for the checkout reliability fix.
                </Message.Content>
            </Message.Root>
            <Message.Root from="assistant">
                <Message.Content>
                    I’ll start with the rollout stages, owners, health checks, and rollback
                    threshold.
                </Message.Content>
            </Message.Root>
        {:else}
            <Conversation.Empty
                icon={emptyIcon}
                title="Plan the next release"
                description="Turn an issue or change set into a staged rollout with clear checks."
                action={startAction}
            />
        {/if}
    </Conversation.Content>
</Conversation.Root>
