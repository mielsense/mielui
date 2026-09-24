<script lang="ts">
    import {
        BubbleChatIcon,
        FrameIcon,
        MinusSignIcon,
        MousePointer01Icon,
        PenTool01Icon,
        PlusSignIcon,
        SquareIcon,
        TextFontIcon
    } from '@hugeicons/core-free-icons';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Toolbar from '@mielui/svelte/components/toolbar';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let activeTool = $state('move');
    let zoom = $state(100);
    function zoomOut() {
        zoom = Math.max(25, zoom - 25);
    }

    function zoomIn() {
        zoom = Math.min(200, zoom + 25);
    }

    function resetZoom() {
        zoom = 100;
    }

    const tools = [
        { id: 'move', label: 'Move', shortcut: 'V', icon: MousePointer01Icon },
        { id: 'frame', label: 'Frame', shortcut: 'F', icon: FrameIcon },
        { id: 'rectangle', label: 'Rectangle', shortcut: 'R', icon: SquareIcon },
        { id: 'pen', label: 'Pen', shortcut: 'P', icon: PenTool01Icon },
        { id: 'text', label: 'Text', shortcut: 'T', icon: TextFontIcon },
        { id: 'comment', label: 'Comment', shortcut: 'C', icon: BubbleChatIcon }
    ];
</script>

<div class="@container flex w-full flex-col items-center gap-3">
    <Toolbar.Root
        variant="depth"
        aria-label="Design tools"
        class="max-w-full flex-wrap justify-center gap-2 p-1"
    >
        <Toolbar.Group
            type="single"
            bind:value={activeTool}
            aria-label="Active tool"
            class="flex-wrap justify-center gap-1"
        >
            {#each tools as tool (tool.id)}
                <Tooltip.Root placement="top" delay={300}>
                    <Tooltip.Trigger>
                        <Toolbar.Item
                            value={tool.id}
                            aria-label={tool.label}
                            class="relative size-8 shrink-0 p-0"
                        >
                            <HugeiconsIcon
                                icon={tool.icon}
                                size={16}
                                class="size-4"
                                aria-hidden="true"
                            />
                            <span class="sr-only"><Kbd shortcut={tool.shortcut} /></span>
                            {#if activeTool === tool.id}
                                <span
                                    class="absolute end-1 top-1 size-1 rounded-full bg-primary"
                                    aria-hidden="true"
                                ></span>
                            {/if}
                        </Toolbar.Item>
                    </Tooltip.Trigger>
                    <Tooltip.Content rich>
                        <span class="flex items-center gap-2">
                            {tool.label}
                            <Kbd
                                shortcut={tool.shortcut}
                                class="border-current/15 bg-current/10 text-inherit shadow-none"
                            />
                        </span>
                    </Tooltip.Content>
                </Tooltip.Root>
            {/each}
        </Toolbar.Group>
        <Toolbar.Separator class="hidden h-7 @min-[32rem]:block" />
        <div class="flex items-center gap-1">
            <Toolbar.Button
                aria-label="Zoom out"
                disabled={zoom <= 25}
                class="size-8 p-0"
                onclick={zoomOut}
            >
                <HugeiconsIcon icon={MinusSignIcon} size={16} class="size-4" aria-hidden="true" />
            </Toolbar.Button>
            <Toolbar.Button
                aria-label="Reset zoom"
                class="h-8 min-w-16 bg-background font-mono text-xs tabular-nums shadow-[var(--mielui-toolbar-pressed)]"
                onclick={resetZoom}
            >
                {`${zoom}%`}
            </Toolbar.Button>
            <Toolbar.Button
                aria-label="Zoom in"
                disabled={zoom >= 200}
                class="size-8 p-0"
                onclick={zoomIn}
            >
                <HugeiconsIcon icon={PlusSignIcon} size={16} class="size-4" aria-hidden="true" />
            </Toolbar.Button>
        </div>
    </Toolbar.Root>
    <p role="status" class="text-sm text-foreground-muted">
        {`${tools.find((tool) => tool.id === activeTool)?.label ?? 'No tool'} selected · ${zoom}% zoom`}
    </p>
</div>
