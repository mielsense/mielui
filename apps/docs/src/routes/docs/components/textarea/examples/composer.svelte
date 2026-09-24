<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import { Textarea } from '@mielui/svelte/components/textarea';

    let message = $state('');
    let sent = $state('');

    function send(event: SubmitEvent) {
        event.preventDefault();
        sent = message.trim();
        message = '';
    }
</script>

<form class="flex w-full max-w-sm flex-col gap-3" onsubmit={send}>
    <Textarea
        bind:value={message}
        label="Message"
        autoresize
        required
        placeholder="Write a message..."
    >
        <div class="flex items-center justify-between gap-3 px-3 pb-3">
            <span class="text-xs text-foreground-muted tabular-nums">
                <span use:numberShuffle={{ value: message.length }}>
                    {message.length}
                </span> characters
            </span>
            <Button type="submit" size="sm" disabled={!message.trim()}>Send</Button>
        </div>
    </Textarea>
    <p role="status" class="text-sm text-foreground-muted">
        {sent ? `Sent in this preview: ${sent}` : ''}
    </p>
</form>
