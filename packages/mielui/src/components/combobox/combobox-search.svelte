<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Combobox as ComboboxPrimitive } from 'bits-ui';
    import { untrack } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { getComboboxContext } from './context.svelte';

    const context = getComboboxContext();

    let input = $state<HTMLInputElement | null>(null);

    $effect(() => {
        const current = input;
        context.input = current;
        return () => {
            untrack(() => {
                if (context.input === current) {
                    context.input = null;
                }
            });
        };
    });
</script>

<div
    data-ui="combobox-search"
    data-variant="secondary"
    class="mx-1 mt-1 flex h-[calc(var(--size-control-sm)+var(--spacing))] shrink-0 items-center gap-2 rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-transparent bg-secondary px-3"
>
    <HugeiconsIcon
        icon={Search}
        size={15}
        strokeWidth={1.75}
        class="shrink-0 text-foreground-muted"
        aria-hidden="true"
    />
    <ComboboxPrimitive.Input
        bind:ref={input}
        type="text"
        placeholder="Search…"
        autocomplete="off"
        aria-label="Search options"
        aria-controls={`combobox-${context.id}-listbox`}
        oninput={context.handleInput}
        onkeydown={context.handleKeydown}
        class="min-w-0 flex-1 bg-transparent text-[length:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-foreground outline-none placeholder:text-foreground-muted"
    />
</div>
