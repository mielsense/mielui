<script lang="ts">
    import {
        Tick02Icon as Check,
        SidebarLeft01Icon as SidebarIcon,
        UnfoldMoreIcon as Unfold
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Menu from '@mielui/svelte/components/dropdown-menu';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import ScrollEdge from './scroll-edge.svelte';
    import { fadeY, scrollFade } from './scroll-fade';
    import { getShell, sidebarWidths } from './shell.svelte';

    const {
        label,
        title,
        wide = false,
        footer,
        children
    }: {
        label: string;
        title: string;
        wide?: boolean;
        footer?: Snippet;
        children: Snippet;
    } = $props();

    const shell = getShell();
    const workspaces = [
        { label: 'Documentation', href: resolve('/docs/introduction') },
        { label: 'Theme Studio', href: resolve('/studio') },
        { label: 'Themes', href: resolve('/themes') }
    ];
    const kind = $derived(wide ? 'studio' : 'docs');
    const width = $derived(shell.sidebarWidth(kind));
    const STEP = 16;

    let dragging = $state(false);
    let drag:
        | { pointer: number; startX: number; startWidth: number; direction: number }
        | undefined;

    function startResize(event: PointerEvent & { currentTarget: HTMLElement }) {
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        drag = {
            pointer: event.pointerId,
            startX: event.clientX,
            startWidth: width,
            direction: getComputedStyle(event.currentTarget).direction === 'rtl' ? -1 : 1
        };
        dragging = true;
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function moveResize(event: PointerEvent) {
        if (!drag || event.pointerId !== drag.pointer) {
            return;
        }
        const distance = (event.clientX - drag.startX) * drag.direction;
        shell.resizeSidebar(kind, drag.startWidth + distance);
    }

    function endResize(event: PointerEvent) {
        if (!drag || event.pointerId !== drag.pointer) {
            return;
        }
        drag = undefined;
        dragging = false;
    }

    function resizeWithKey(event: KeyboardEvent) {
        const targets: Record<string, number> = {
            ArrowLeft: width - STEP,
            ArrowRight: width + STEP,
            Home: sidebarWidths.min,
            End: sidebarWidths.max
        };
        const next = targets[event.key];
        if (next === undefined) {
            return;
        }
        event.preventDefault();
        shell.resizeSidebar(kind, next);
    }
</script>

<svelte:window
    onkeydown={(event) => {
        const target = event.target;
        const typing =
            target instanceof HTMLElement &&
            (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
        if (!typing && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'b') {
            event.preventDefault();
            shell.toggle();
        }
    }}
/>

<aside
    aria-label={label}
    inert={shell.collapsed}
    style:--sidebar-width={`${width}px`}
    class={`hidden h-full shrink-0 overflow-clip ease-[var(--ease-out)] motion-reduce:transition-none lg:block ${dragging ? '' : 'transition-[width] [transition-duration:var(--motion-duration-panel)]'} ${shell.collapsed ? 'w-0' : 'w-[var(--sidebar-width)]'}`}
>
    <div
        class="relative flex h-full w-[var(--sidebar-width)] flex-col border-e-[length:var(--border-size)] border-border bg-[var(--docs-side)]"
    >
        <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
        <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize sidebar"
            aria-valuenow={width}
            aria-valuemin={sidebarWidths.min}
            aria-valuemax={sidebarWidths.max}
            tabindex={0}
            data-dragging={dragging || undefined}
            class="group absolute inset-y-0 end-0 z-20 w-2 cursor-col-resize touch-none outline-none"
            onpointerdown={startResize}
            onpointermove={moveResize}
            onpointerup={endResize}
            onpointercancel={endResize}
            onkeydown={resizeWithKey}
            ondblclick={() => {
                shell.resizeSidebar(kind, sidebarWidths[kind]);
            }}
        >
            <span
                aria-hidden="true"
                class="absolute inset-y-0 end-0 w-0.5 bg-primary opacity-0 transition-opacity [transition-duration:var(--motion-duration-hover)] group-hover:opacity-60 group-focus-visible:opacity-100 group-data-[dragging]:opacity-100 motion-reduce:transition-none"
            ></span>
        </div>
        <div class="flex h-[50px] shrink-0 items-center justify-between gap-1 ps-[19px] pe-3">
            <Menu.Root>
                <Menu.Trigger
                    variant="ghost"
                    class="h-8 min-w-0 gap-2.5 rounded-[var(--radius-sm)] px-1.5 text-[15px] font-medium"
                >
                    <span class="truncate">{title}</span>
                    <HugeiconsIcon
                        icon={Unfold}
                        size={14}
                        aria-hidden="true"
                        class="shrink-0 text-foreground-muted"
                    />
                </Menu.Trigger>
                <Menu.Content class="w-52">
                    {#each workspaces as workspace (workspace.href)}
                        <Menu.Item
                            callback={() => {
                                void goto(workspace.href);
                            }}
                        >
                            <span class="flex-1">{workspace.label}</span>
                            {#if workspace.label === title}
                                <HugeiconsIcon icon={Check} size={14} aria-hidden="true" />
                            {/if}
                        </Menu.Item>
                    {/each}
                </Menu.Content>
            </Menu.Root>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Hide sidebar"
                        class="size-8 shrink-0 rounded-[var(--radius-sm)] text-foreground-muted hover:text-foreground"
                        onclick={shell.toggle}
                    >
                        <HugeiconsIcon icon={SidebarIcon} size={16} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Hide sidebar</Tooltip.Content>
            </Tooltip.Root>
        </div>
        <div class="relative flex min-h-0 flex-1 flex-col">
            <div
                {@attach scrollFade({ start: false, size: 56, target: 'parent' })}
                class={`flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain ${fadeY}`}
            >
                {@render children()}
            </div>
            <ScrollEdge edge="bottom" />
        </div>
        {@render footer?.()}
    </div>
</aside>
