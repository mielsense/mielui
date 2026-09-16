<script lang="ts">
    import {
        ArrowUp02Icon as ArrowUp,
        SourceCodeIcon as Code2,
        SparklesIcon as Sparkles
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import { Toolbar } from '@mielui/svelte/components/toolbar';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let message = $state('');

    function sendMessage(event: SubmitEvent) {
        event.preventDefault();
        message = '';
    }
</script>

<form class="w-full max-w-xl" onsubmit={sendMessage}>
    <Textarea
        bind:value={message}
        aria-label="Message the team"
        placeholder="Message the team..."
        autoresize
    >
        <Toolbar aria-label="Message actions">
            <div class="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="md"
                    class="size-7 rounded-[var(--radius-md)] p-0"
                    aria-label="Add code"
                >
                    <HugeiconsIcon icon={Code2} size={14} />
                </Button>
                <Button
                    variant="ghost"
                    size="md"
                    class="size-7 rounded-[var(--radius-md)] p-0"
                    aria-label="Improve with AI"
                >
                    <HugeiconsIcon icon={Sparkles} size={14} />
                </Button>
            </div>
            <Button
                type="submit"
                variant="primary"
                size="md"
                class="size-7 rounded-full p-0"
                aria-label="Send message"
                disabled={!message.trim()}
            >
                <HugeiconsIcon icon={ArrowUp} size={14} />
            </Button>
        </Toolbar>
    </Textarea>
</form>
