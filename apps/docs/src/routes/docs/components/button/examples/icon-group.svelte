<script lang="ts">
    import { Copy01Icon, Delete02Icon, Download01Icon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let removed = $state(false);
    let message = $state('');

    function download() {
        const link = document.createElement('a');
        const url = URL.createObjectURL(
            new Blob(['Release notes\nAll checks passed.'], { type: 'text/plain' })
        );
        link.href = url;
        link.download = 'release-notes.txt';
        link.click();
        URL.revokeObjectURL(url);
        message = 'Sample download started.';
    }

    async function copy() {
        try {
            await navigator.clipboard.writeText('Release notes: all checks passed.');
            message = 'Release notes copied.';
        } catch {
            message = 'Clipboard access is unavailable.';
        }
    }

    function remove() {
        removed = !removed;
        message = removed ? 'Attachment removed from this preview.' : 'Attachment restored.';
    }
</script>

<div class="flex flex-col items-center gap-3">
    <div class="flex items-center gap-2">
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button variant="ghost" size="icon" aria-label="Download sample" onclick={download}>
                    <HugeiconsIcon icon={Download01Icon} size={16} />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Download sample</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button variant="ghost" size="icon" aria-label="Copy release notes" onclick={copy}>
                    <HugeiconsIcon icon={Copy01Icon} size={16} />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Copy release notes</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={removed ? 'Restore attachment' : 'Remove attachment'}
                    aria-pressed={removed}
                    onclick={remove}
                >
                    <HugeiconsIcon icon={Delete02Icon} size={16} />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                {removed ? 'Restore attachment' : 'Remove attachment'}
            </Tooltip.Content>
        </Tooltip.Root>
    </div>
    <p role="status" class="text-sm text-foreground-muted">{message}</p>
</div>
