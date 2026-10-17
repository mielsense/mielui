<script lang="ts">
    import {
        CursorPointer02Icon,
        Redo02Icon,
        SlidersHorizontalIcon,
        Undo02Icon
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Popover from '@mielui/svelte/components/popover';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { getStudioContext } from '$lib/studio-context';
    import { getThemeEditor } from './editor/context';

    let {
        picking = $bindable(false)
    }: {
        /** Whether clicking the preview selects an element to edit its tokens. */
        picking?: boolean;
    } = $props();

    const uid = $props.id();
    const studio = getStudioContext();
    const editor = getThemeEditor();
</script>

<!--
    @component
    The floating tools above the Studio preview: token picking, undo and redo, and preview options.
-->

<div
    role="toolbar"
    aria-label="Preview tools"
    class="pointer-events-auto flex h-10 shrink-0 items-center gap-0.5 rounded-[calc(var(--radius-control)+var(--spacing))] border-[length:var(--border-size)] border-border bg-card/75 p-1 shadow-[var(--elevation-float)] backdrop-blur-xl backdrop-saturate-150 [@media(prefers-reduced-transparency:reduce)]:bg-card"
>
    <div class="hidden md:block">
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button
                    variant={picking ? 'secondary' : 'ghost'}
                    size="icon"
                    aria-label="Edit tokens by clicking an element"
                    aria-pressed={picking}
                    onclick={() => {
                        picking = !picking;
                    }}
                >
                    <HugeiconsIcon icon={CursorPointer02Icon} size={16} />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                {picking ? 'Stop editing tokens' : 'Click an element to edit its tokens'}
            </Tooltip.Content>
        </Tooltip.Root>
    </div>
    <div role="group" aria-label="History" class="flex items-center">
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Undo"
                    disabled={!editor.history.canUndo}
                    onclick={editor.history.undo}
                >
                    <HugeiconsIcon icon={Undo02Icon} size={16} />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                Undo
                <Kbd shortcut="cmd+Z" />
            </Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Redo"
                    disabled={!editor.history.canRedo}
                    onclick={editor.history.redo}
                >
                    <HugeiconsIcon icon={Redo02Icon} size={16} />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                Redo
                <Kbd shortcut="shift+cmd+Z" />
            </Tooltip.Content>
        </Tooltip.Root>
    </div>
    <div class="hidden md:block">
        <Popover.Root placement="bottom-end">
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Popover.Trigger
                        variant="ghost"
                        size="icon"
                        icon={false}
                        aria-label="Preview options"
                    >
                        <HugeiconsIcon icon={SlidersHorizontalIcon} size={16} />
                    </Popover.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content>Preview options</Tooltip.Content>
            </Tooltip.Root>
            <Popover.Content class="w-64" surfaceClass="flex flex-col gap-4 p-4">
                <Popover.Title>Preview</Popover.Title>
                <div class="flex items-center justify-between gap-3">
                    <span id={`${uid}-width`} class="text-sm">Width</span>
                    <Tabs.Root bind:value={studio.width} variant="segmented">
                        <div role="group" aria-labelledby={`${uid}-width`}>
                            <Tabs.List>
                                <Tabs.Trigger value="wide">Wide</Tabs.Trigger>
                                <Tabs.Trigger value="narrow">Narrow</Tabs.Trigger>
                            </Tabs.List>
                        </div>
                    </Tabs.Root>
                </div>
                <Switch
                    bind:checked={studio.glassBackdrop}
                    label="Glass backdrop"
                    description="A gradient behind the preview, to judge glass surfaces."
                />
            </Popover.Content>
        </Popover.Root>
    </div>
</div>
