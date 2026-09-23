<script lang="ts">
    import { RotateLeft01Icon as RotateCcw } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Markdown } from '@mielui/svelte/components/markdown';
    import * as Message from '@mielui/svelte/components/message';
    import { ResponseStream } from '@mielui/svelte/components/response-stream';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    import { onDestroy } from 'svelte';

    let streaming = $state(true);

    function finishResponse() {
        streaming = false;
    }

    let status = $state<'error' | 'streaming' | 'idle'>('error');
    let timer: ReturnType<typeof setTimeout> | undefined;

    function retry() {
        status = 'streaming';
        timer = setTimeout(() => {
            status = 'idle';
        }, 1200);
    }

    onDestroy(() => {
        clearTimeout(timer);
    });

    const partialResponse =
        'All four regions are healthy. Error rates and response times remain within the release baseline.';
</script>

<div class="w-full max-w-2xl space-y-8">
    <Message.Root from="assistant" status={streaming ? 'streaming' : 'idle'}>
        <Message.Content>
            <ResponseStream textStream={partialResponse} speed={45} onComplete={finishResponse} />
        </Message.Content>
    </Message.Root>

    <Message.Root from="assistant" {status}>
        <Message.Content>
            {#if status === 'streaming'}
                <Markdown
                    content="Reconnecting to the warehouse and rebuilding the query"
                    streaming
                />
            {:else if status === 'idle'}
                <p>All four regions are healthy. The query completed after reconnecting.</p>
            {:else}
                <p>
                    The warehouse connection closed before the query completed. Retry when the
                    connection is available.
                </p>
            {/if}
        </Message.Content>
        {#if status === 'error'}
            <Message.Actions aria-label="Failed response actions">
                <Button variant="ghost" size="md" onclick={retry}>
                    <HugeiconsIcon icon={RotateCcw} size={14} aria-hidden="true" />
                    Retry response
                </Button>
            </Message.Actions>
        {/if}
    </Message.Root>
</div>
