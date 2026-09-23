<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { onMount } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { CommandSearchProps } from '.';
    import { getCommandContext, getCommandResults } from './context.svelte';
    import { DEFAULT_COMMAND_SEARCH_THRESHOLD } from './search';

    const controller = getCommandContext();
    const { state: command } = controller;

    let searchInput = $state<HTMLInputElement | undefined>();
    let composing = false;
    let spoken = $state('');

    const {
        class: classProp,
        threshold = DEFAULT_COMMAND_SEARCH_THRESHOLD,
        icon,
        count,
        announcement,
        oninput,
        onkeydown,
        oncompositionstart,
        oncompositionend,
        ...rest
    }: CommandSearchProps = $props();

    onMount(() => {
        if (searchInput) {
            searchInput.focus();
        }
    });

    $effect(() => {
        controller.threshold = threshold;
    });

    function setActive(index: number) {
        const results = getCommandResults(command);
        if (results.length === 0) {
            return;
        }

        const item = results[(index + results.length) % results.length];
        command.activeId = item.id;
        item.ref?.scrollIntoView?.({ block: 'nearest' });
    }

    function handleKeydown(
        event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }
    ) {
        onkeydown?.(event);
        if (event.defaultPrevented || event.isComposing || composing || event.keyCode === 229) {
            return;
        }
        if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter'].includes(event.key)) {
            controller.reconcile();
        }
        const results = getCommandResults(command);
        const activeIndex = results.findIndex((item) => item.id === command.activeId);

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setActive(activeIndex + 1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                setActive(activeIndex <= 0 ? results.length - 1 : activeIndex - 1);
                break;
            case 'Home':
                event.preventDefault();
                setActive(0);
                break;
            case 'End':
                event.preventDefault();
                setActive(results.length - 1);
                break;
            case 'Enter': {
                const active = results.find((item) => item.id === command.activeId) ?? results[0];
                if (!active) {
                    return;
                }
                event.preventDefault();
                active.ref?.click();
                break;
            }
        }
    }

    $effect(() => {
        const count = getCommandResults(command).length;
        const timer = setTimeout(() => {
            spoken =
                count === 0
                    ? 'No command matches.'
                    : `${count} ${count === 1 ? 'command' : 'commands'} available.`;
        }, 400);
        return () => clearTimeout(timer);
    });
</script>

{#snippet defaultIcon()}
    <HugeiconsIcon
        icon={Search}
        size={15}
        strokeWidth={1.75}
        class="shrink-0 text-foreground-muted"
    />
{/snippet}

{#snippet defaultCount(total: number)}
    {total}
{/snippet}

{#snippet defaultAnnouncement(message: string)}
    {message}
{/snippet}

<div
    class="flex h-[var(--size-touch)] w-full items-center gap-2.5 border-b-[length:var(--border-size)] border-border px-3"
>
    {@render (icon ?? defaultIcon)()}
    <input
        bind:this={searchInput}
        bind:value={command.searchContent}
        class={cn(
            classProp,
            'min-w-0 flex-1 bg-transparent text-[length:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-foreground placeholder:text-foreground-muted focus-visible:outline-none'
        )}
        placeholder="Type a command or search..."
        aria-label="Search commands"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={`${command.id}-listbox`}
        aria-activedescendant={command.activeId}
        {...rest}
        oninput={(event) => {
            oninput?.(event);
            if (!event.defaultPrevented) {
                command.searchContent = event.currentTarget.value;
            }
        }}
        onkeydown={handleKeydown}
        oncompositionstart={(event) => {
            composing = true;
            oncompositionstart?.(event);
        }}
        oncompositionend={(event) => {
            composing = false;
            oncompositionend?.(event);
        }}
    />
    <span
        class="min-w-[3ch] text-right font-mono text-[length:var(--font-size-meta)] tabular-nums text-foreground-muted"
        aria-hidden="true"
    >
        {@render (count ?? defaultCount)(getCommandResults(command).length)}
    </span>
    <span role="status" aria-live="polite" class="sr-only">
        {@render (announcement ?? defaultAnnouncement)(spoken)}
    </span>
</div>
