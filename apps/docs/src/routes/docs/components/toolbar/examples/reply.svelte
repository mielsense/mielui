<script lang="ts">
    import {
        ArrowUp02Icon as ArrowUp,
        AtIcon as AtSign,
        ImageAdd01Icon as ImagePlus,
        SmileIcon as SmilePlus
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import { Toolbar } from '@mielui/svelte/components/toolbar';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="w-full max-w-xl">
    <Textarea aria-label="Reply to issue" placeholder="Reply to mielsense's comment..." autoresize>
        <Toolbar aria-label="Reply actions">
            <div class="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="md"
                    class="size-7 rounded-[var(--radius-md)] p-0"
                    aria-label="Mention someone"
                >
                    <HugeiconsIcon icon={AtSign} size={14} />
                </Button>
                <Button
                    variant="ghost"
                    size="md"
                    class="size-7 rounded-[var(--radius-md)] p-0"
                    aria-label="Add image"
                >
                    <HugeiconsIcon icon={ImagePlus} size={14} />
                </Button>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger
                        variant="ghost"
                        size="md"
                        class="size-7 rounded-[var(--radius-md)] p-0"
                        aria-label="Add reaction"
                    >
                        <HugeiconsIcon icon={SmilePlus} size={14} />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content class="min-w-40">
                        <DropdownMenu.Label>Quick reactions</DropdownMenu.Label>
                        <DropdownMenu.Item>Thumbs up</DropdownMenu.Item>
                        <DropdownMenu.Item>Eyes</DropdownMenu.Item>
                        <DropdownMenu.Item>Celebrate</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
            <Button type="button" size="md" class="size-7 rounded-full p-0" aria-label="Reply">
                <HugeiconsIcon icon={ArrowUp} size={14} />
            </Button>
        </Toolbar>
    </Textarea>
</div>
