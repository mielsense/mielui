<script lang="ts">
    import {
        FrameIcon as Frame,
        BubbleChatIcon as MessageCircle,
        MousePointer01Icon as MousePointer2,
        PenTool01Icon as PenTool,
        SquareIcon as Square,
        TextFontIcon as Type
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let activeTool = $state<string>('move');

    const tools = [
        { id: 'move', label: 'Move', shortcut: 'V', icon: MousePointer2 },
        { id: 'frame', label: 'Frame', shortcut: 'F', icon: Frame },
        { id: 'rectangle', label: 'Rectangle', shortcut: 'R', icon: Square },
        { id: 'pen', label: 'Pen', shortcut: 'P', icon: PenTool },
        { id: 'text', label: 'Text', shortcut: 'T', icon: Type },
        { id: 'comment', label: 'Comment', shortcut: 'C', icon: MessageCircle }
    ];
</script>

<div class="flex max-w-full items-center justify-center p-2 sm:p-6">
    <div class="flex flex-wrap gap-1 rounded-[var(--radius-lg)] border border-border bg-card p-1">
        {#each tools as tool (tool.id)}
            <Tooltip.Root placement="top" delay={300}>
                <Tooltip.Trigger>
                    <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        class={`size-8 ${activeTool === tool.id
                            ? 'bg-secondary text-foreground'
                            : 'text-foreground-muted hover:bg-secondary hover:text-foreground'}`}
                        onclick={() => (activeTool = tool.id)}
                        aria-label={tool.label}
                        aria-pressed={activeTool === tool.id}
                    >
                        <HugeiconsIcon icon={tool.icon} size={16} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content surface="glass">
                    <div class="flex items-center gap-2">
                        <span>{tool.label}</span>
                        <Kbd shortcut={tool.shortcut} />
                    </div>
                </Tooltip.Content>
            </Tooltip.Root>
        {/each}
    </div>
</div>
