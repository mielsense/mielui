<script lang="ts">
    import {
        BubbleChatIcon,
        FrameIcon,
        MousePointer01Icon,
        PenTool01Icon,
        SquareIcon,
        TextFontIcon
    } from '@hugeicons/core-free-icons';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Toolbar from '@mielui/svelte/components/toolbar';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let activeTool = $state('move');
    const tools = [
        { id: 'move', label: 'Move', shortcut: 'V', icon: MousePointer01Icon },
        { id: 'frame', label: 'Frame', shortcut: 'F', icon: FrameIcon },
        { id: 'rectangle', label: 'Rectangle', shortcut: 'R', icon: SquareIcon },
        { id: 'pen', label: 'Pen', shortcut: 'P', icon: PenTool01Icon },
        { id: 'text', label: 'Text', shortcut: 'T', icon: TextFontIcon },
        { id: 'comment', label: 'Comment', shortcut: 'C', icon: BubbleChatIcon }
    ];
</script>

<div class="flex flex-col items-center gap-3">
    <Toolbar.Root aria-label="Design tools" class="border border-border bg-card p-1">
        <Toolbar.Group type="single" bind:value={activeTool} aria-label="Active tool">
            {#each tools as tool (tool.id)}
                <Tooltip.Root placement="top" delay={300}>
                    <Tooltip.Trigger>
                        <Toolbar.Item
                            value={tool.id}
                            aria-label={tool.label}
                            class="size-8 rounded-[var(--radius-md)] p-0 text-foreground-muted hover:bg-secondary hover:text-foreground"
                        >
                            <HugeiconsIcon icon={tool.icon} size={16} aria-hidden="true" />
                            <span class="sr-only"><Kbd shortcut={tool.shortcut} /></span>
                        </Toolbar.Item>
                    </Tooltip.Trigger>
                    <Tooltip.Content rich>
                        <span class="flex items-center gap-2">
                            {tool.label}
                            <span class="font-mono text-xs text-inherit opacity-70">
                                {tool.shortcut}
                            </span>
                        </span>
                    </Tooltip.Content>
                </Tooltip.Root>
            {/each}
        </Toolbar.Group>
    </Toolbar.Root>
    <p role="status" class="text-sm text-foreground-muted">
        {tools.find((tool) => tool.id === activeTool)?.label ?? 'No tool'} selected
    </p>
</div>
