<script lang="ts">
    import {
        PanelLeftIcon as PanelLeft,
        PinIcon as Pin,
        Cancel01Icon as X
    } from '@hugeicons/core-free-icons';
    import Button from '@mielui/svelte/components/button';
    import * as Popover from '@mielui/svelte/components/popover';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';
    import { createInspectorState } from './inspector-state.svelte';

    const {
        title,
        storageKey,
        children
    }: {
        title: string;
        storageKey: string;
        children: Snippet<[() => void]>;
    } = $props();
    const inspector = createInspectorState(() => storageKey);
    const anchor = {
        getBoundingClientRect() {
            const gutter = window.matchMedia('(min-width: 40rem)').matches ? 12 : 8;

            return new DOMRect(gutter, gutter, 0, 0);
        }
    };
</script>

<svelte:window onpointermove={inspector.reveal} />

<div data-inspector-pinned={inspector.pinned}>
    <Popover.Root
        bind:open={inspector.open}
        placement="bottom-start"
        inert={false}
        hoverable={!inspector.pinned}
        delay={100}
        closeDelay={250}
    >
        <Popover.Trigger variant="ghost" size="icon" aria-label={`Open ${title.toLowerCase()}`}>
            <HugeiconsIcon icon={PanelLeft} size={16} />
        </Popover.Trigger>
        <Popover.Content
            data-docs-inspector-pinned={inspector.pinned || undefined}
            surface={inspector.pinned ? 'solid' : 'glass'}
            refElement={anchor}
            dismissLayer={false}
            focusTrap={false}
            lockScroll={false}
            allowClickOutside={!inspector.pinned}
            class={`w-80 ${inspector.pinned ? 'bg-[color-mix(in_oklab,var(--color-background),var(--color-secondary)_10%)]! border-border! dark:border-border/50! shadow-none!' : ''} h-[calc(100svh-1rem)] sm:h-[calc(100svh-1.5rem)] [--docs-row-height:calc(var(--spacing)*12)] [--docs-rule:var(--color-border)] [--docs-chrome:transparent] [--mielui-modal-inset:0px]`}
            surfaceClass="flex flex-col gap-0 p-0! bg-transparent!"
        >
            <div
                class="flex h-[calc(var(--spacing)*14)] shrink-0 items-center justify-between gap-3 ps-5 pe-[calc(var(--spacing)*5-(var(--size-icon-md)-1rem)/2)]"
            >
                <Popover.Title>{title === 'Navigation' ? 'mielui' : title}</Popover.Title>
                <div class="flex items-center gap-0.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={inspector.pinned ? 'Unpin panel' : 'Pin panel'}
                        aria-pressed={inspector.pinned}
                        class="aria-pressed:bg-foreground/[0.08]"
                        onclick={inspector.togglePin}
                    >
                        <HugeiconsIcon icon={Pin} size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close panel"
                        onclick={inspector.close}
                    >
                        <HugeiconsIcon icon={X} size={16} />
                    </Button>
                </div>
            </div>
            <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
                {@render children(inspector.dismiss)}
            </div>
        </Popover.Content>
    </Popover.Root>
</div>
