<script lang="ts">
    import {
        ArrowUp02Icon as ArrowUp,
        BookOpen01Icon as BookOpen,
        Attachment01Icon as Paperclip
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import { Toolbar } from '@mielui/svelte/components/toolbar';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="w-full max-w-xl">
    <div class="border-b border-border px-3 py-2 text-sm text-foreground-muted">
        Replying to Nora about her billing question
    </div>
    <Textarea aria-label="Support reply" placeholder="Write a helpful response..." autoresize>
        <Toolbar aria-label="Support reply actions">
            <div class="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="md"
                    class="size-7 rounded-[var(--radius-md)] p-0"
                    aria-label="Attach a file"
                >
                    <HugeiconsIcon icon={Paperclip} size={14} />
                </Button>
                <Button
                    variant="ghost"
                    size="md"
                    class="size-7 rounded-[var(--radius-md)] p-0"
                    aria-label="Insert an article"
                >
                    <HugeiconsIcon icon={BookOpen} size={14} />
                </Button>
            </div>
            <Button type="button" size="md" class="size-7 rounded-full p-0" aria-label="Send reply">
                <HugeiconsIcon icon={ArrowUp} size={14} />
            </Button>
        </Toolbar>
    </Textarea>
</div>
