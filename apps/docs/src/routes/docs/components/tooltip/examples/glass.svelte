<script lang="ts">
    import MessageCircle from '@hugeicons/core-free-icons/BubbleChatIcon';
    import Frame from '@hugeicons/core-free-icons/FrameIcon';
    import MousePointer2 from '@hugeicons/core-free-icons/MousePointer01Icon';
    import PenTool from '@hugeicons/core-free-icons/PenTool01Icon';
    import Square from '@hugeicons/core-free-icons/SquareIcon';
    import Type from '@hugeicons/core-free-icons/TextFontIcon';
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

<div class="flex items-center justify-center p-10">
    <div class="flex gap-1 rounded-[var(--radius-lg)] border border-border bg-card p-1">
        {#each tools as tool (tool.id)}
            {@const Icon = tool.icon}
            <Tooltip.Root placement="top" delay={300}>
                <Tooltip.Trigger>
                    <button
                        type="button"
                        class="inline-flex size-8 items-center justify-center rounded-[var(--radius-md)] transition-colors"
                        class:bg-secondary={activeTool === tool.id}
                        class:text-foreground={activeTool === tool.id}
                        class:text-foreground-muted={activeTool !== tool.id}
                        class:hover:bg-secondary={activeTool !== tool.id}
                        class:hover:text-foreground={activeTool !== tool.id}
                        onclick={() => (activeTool = tool.id)}
                        aria-label={tool.label}
                    >
                        <HugeiconsIcon icon={Icon} size={16} />
                    </button>
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
