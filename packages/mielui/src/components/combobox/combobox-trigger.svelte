<script lang="ts">
    import { ArrowDown01Icon as ChevronDown, Cancel01Icon as X } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { Combobox as ComboboxPrimitive } from 'bits-ui';
    import { tick, untrack } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { button } from '../button/variants';
    import { input } from '../input/variants';
    import type { ComboboxTriggerProps } from '.';
    import { getComboboxContext } from './context.svelte';

    const context = getComboboxContext();
    const { state: combobox } = context;
    let {
        trailing,
        class: className,
        placeholder = 'Select…',
        searchPlacement = 'trigger',
        threshold = 0.28,
        appearance = 'button',
        variant = 'outline',
        size = 'md',
        disabled = false,
        name,
        id,
        element = $bindable(),
        onclick,
        onopen,
        'aria-label': ariaLabel,
        ...rest
    }: ComboboxTriggerProps = $props();

    const isInputAppearance = $derived(appearance === 'input');
    const focusClasses = $derived.by(() => {
        if (isInputAppearance) {
            return 'items-center gap-2 focus-within:shadow-[var(--focus-ring),var(--elevation-control-edge)]';
        }
        if (variant === 'ghost' || variant === 'quiet') {
            return 'focus-within:shadow-[var(--focus-ring)]';
        }
        if (variant === 'primary') {
            return 'focus-within:shadow-[var(--focus-ring),var(--elevation-control-edge),inset_0_0_0_var(--border-size)_var(--color-primary-stroke)]';
        }
        if (variant === 'panel') {
            return 'focus-within:shadow-[var(--focus-ring),var(--elevation-1)]';
        }
        return 'focus-within:shadow-[var(--focus-ring),var(--elevation-control-edge)]';
    });
    const inputClasses = $derived(
        cn(
            'min-w-0 flex-1 bg-transparent text-left text-[length:var(--font-size-button)] [font-weight:var(--font-weight-button)] [letter-spacing:var(--tracking-button)] outline-none placeholder:text-foreground-muted',
            isInputAppearance
                ? 'h-auto cursor-text'
                : 'h-full cursor-[var(--ui-cursor-interactive)]',
            combobox.open || combobox.selected ? 'text-foreground' : 'text-foreground-muted',
            trailing && !isInputAppearance && 'pe-5'
        )
    );

    $effect(() => {
        combobox.searchPlacement = searchPlacement;
        combobox.threshold = threshold;
        combobox.appearance = appearance;
        context.disabled = !!disabled;
        context.name = name ?? undefined;
        context.beforeOpen = onopen;
    });

    let inputRef = $state<HTMLInputElement | null>(null);
    let triggerRef = $state<HTMLButtonElement | null>(null);

    $effect(() => {
        const current = searchPlacement === 'menu' ? triggerRef : inputRef;
        element = current ?? undefined;
        context.trigger = current;
        if (searchPlacement === 'trigger') {
            context.input = inputRef;
        }
        return () => {
            untrack(() => {
                if (context.trigger === current) {
                    context.trigger = null;
                }
                if (context.input === current) {
                    context.input = null;
                }
            });
        };
    });

    function show() {
        context.setOpen(true);
    }

    async function clearSearch() {
        context.clearSelection();
        context.setOpen(true);
        await tick();
        context.input?.focus({ preventScroll: true });
    }
</script>

<div
    bind:this={context.anchor}
    data-ui="combobox-trigger"
    data-size={size}
    data-state={combobox.open ? 'open' : 'closed'}
    data-appearance={appearance}
    onmouseenter={context.hoverEnter}
    onmouseleave={context.hoverLeave}
    role="presentation"
    class={cn(
        className,
        isInputAppearance ? input({ variant: variant === 'secondary' ? 'secondary' : 'outline' }) : button({ variant, size }),
        'relative select-none',
        focusClasses,
        disabled && 'pointer-events-none opacity-40'
    )}
>
    {#if searchPlacement === 'menu'}
        <ComboboxPrimitive.Trigger
            {...rest}
            id={id ?? undefined}
            bind:ref={triggerRef}
            {disabled}
            aria-label={ariaLabel ?? placeholder}
            aria-controls={`combobox-${context.id}-listbox`}
            aria-expanded={combobox.open}
            {onclick}
            class={cn(inputClasses, 'inline-flex w-full items-center truncate pe-5')}
        >
            {combobox.selected?.label ?? placeholder}
        </ComboboxPrimitive.Trigger>
    {:else}
        <ComboboxPrimitive.Input
            {...rest}
            id={id ?? undefined}
            bind:ref={inputRef}
            type="text"
            {disabled}
            {placeholder}
            readonly={!combobox.open && !isInputAppearance}
            autocomplete="off"
            aria-label={ariaLabel ?? placeholder}
            aria-haspopup="listbox"
            aria-controls={`combobox-${context.id}-listbox`}
            onclick={(event) => {
                onclick?.(event);
                if (event.defaultPrevented || disabled) {
                    return;
                }
                if (isInputAppearance) {
                    show();
                } else {
                    context.setOpen(!combobox.open);
                }
            }}
            onfocus={() => {
                if (isInputAppearance) {
                    show();
                }
            }}
            oninput={context.handleInput}
            onkeydown={context.handleKeydown}
            class={inputClasses}
        />
    {/if}
    {#if isInputAppearance && (combobox.searchContent !== '' || combobox.selected)}
        <button
            type="button"
            aria-label="Clear search"
            {disabled}
            data-ui="combobox-trigger-clear"
            class="flex shrink-0 cursor-pointer items-center rounded-full text-foreground-muted transition-colors outline-none hover:text-foreground focus-visible:shadow-[var(--focus-ring)] [&_svg]:size-4 [&_svg]:shrink-0"
            onmousedown={(event) => {
                event.preventDefault();
            }}
            onclick={(event) => {
                event.stopPropagation();
                void clearSearch();
            }}
        >
            <HugeiconsIcon icon={X} size={16} aria-hidden="true" />
        </button>
    {:else if trailing}
        <span
            data-ui="combobox-trigger-trailing"
            class={cn('flex shrink-0 items-center text-foreground-muted [&_svg]:size-4 [&_svg]:shrink-0', !isInputAppearance && 'absolute top-1/2 end-3 -translate-y-1/2')}
            aria-hidden="true"
        >
            {@render trailing()}
        </span>
    {:else if !isInputAppearance}
        <HugeiconsIcon
            icon={ChevronDown}
            size={18}
            class="pointer-events-none absolute top-1/2 end-3 shrink-0 -translate-y-1/2 text-foreground-muted"
            aria-hidden="true"
        />
    {/if}
</div>
