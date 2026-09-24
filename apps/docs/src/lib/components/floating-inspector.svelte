<script lang="ts">
    import {
        Menu01Icon as Menu,
        PinIcon as Pin,
        Cancel01Icon as X
    } from '@hugeicons/core-free-icons';
    import Button from '@mielui/svelte/components/button';
    import * as Popover from '@mielui/svelte/components/popover';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { onMount, type Snippet } from 'svelte';

    let { title, children }: { title: string; children: Snippet<[() => void]> } = $props();
    let open = $state(false);
    let pinned = $state(false);
    let preferenceLoaded = $state(false);
    const storageKey = $derived(
        title === 'Navigation' ? 'mielui:docs-sidebar-pinned' : 'mielui:studio-sidebar-pinned'
    );

    onMount(() => {
        try {
            pinned = localStorage.getItem(storageKey) === 'true';
            open = pinned;
        } catch {
            pinned = false;
        }
        preferenceLoaded = true;
    });

    $effect(() => {
        if (!preferenceLoaded) {
            return;
        }
        try {
            localStorage.setItem(storageKey, String(pinned));
        } catch {
            return;
        }
    });

    $effect(() => {
        if (pinned && !open) {
            open = true;
        }
    });

    const anchor = $derived({
        getBoundingClientRect() {
            return new DOMRect(8, 12, 0, 0);
        }
    });

    function close() {
        if (!pinned) {
            open = false;
        }
    }

    function reveal(event: PointerEvent) {
        if (event.pointerType === 'mouse' && event.clientX <= 12) {
            open = true;
        }
    }
</script>

<svelte:window onpointermove={reveal} />

<div data-inspector-pinned={pinned}>
    <Popover.Root
        bind:open
        placement="bottom-start"
        inert={false}
        hoverable={!pinned}
        delay={100}
        closeDelay={250}
    >
        <Popover.Trigger variant="quiet" size="icon" aria-label={`Open ${title.toLowerCase()}`}>
            <HugeiconsIcon icon={Menu} size={18} />
        </Popover.Trigger>
        <Popover.Content
            surface={pinned ? 'solid' : 'glass'}
            refElement={anchor}
            dismissLayer={false}
            focusTrap={false}
            lockScroll={false}
            allowClickOutside={!pinned}
            class={`w-80 ${pinned ? 'bg-[color-mix(in_oklab,var(--color-background),var(--color-secondary)_10%)]! border-border! dark:border-border/50! shadow-none!' : ''} h-[calc(100svh-1.5rem)] [--docs-row-height:calc(var(--spacing)*12)] [--docs-rule:var(--color-border)] [--docs-chrome:transparent] [--mielui-modal-inset:0px]`}
            surfaceClass="flex flex-col gap-0 p-0! bg-transparent!"
        >
            <div class="flex shrink-0 items-center justify-between gap-3 px-5 py-4">
                <Popover.Title>{title === 'Navigation' ? 'mielui' : title}</Popover.Title>
                <div class="flex items-center gap-1">
                    <Button
                        variant="quiet"
                        size="icon"
                        aria-label={pinned ? 'Unpin panel' : 'Pin panel'}
                        aria-pressed={pinned}
                        onclick={() => {
                            pinned = !pinned;
                        }}
                    >
                        <HugeiconsIcon icon={Pin} size={16} />
                    </Button>
                    <Button
                        variant="quiet"
                        size="icon"
                        aria-label="Close panel"
                        onclick={() => {
                            pinned = false;
                            open = false;
                        }}
                    >
                        <HugeiconsIcon icon={X} size={16} />
                    </Button>
                </div>
            </div>
            <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
                {@render children(close)}
            </div>
        </Popover.Content>
    </Popover.Root>
</div>
