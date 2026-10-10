<script lang="ts">
    import { ArrowDown01Icon as ChevronDown, Cancel01Icon as X } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { Combobox as ComboboxPrimitive } from 'bits-ui';
    import { getContext, tick, untrack } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { button } from '../button/variants';
    import { input } from '../input/variants';
    import type { ComboboxLabels, ComboboxTriggerProps } from '.';
    import { getComboboxContext } from './context.svelte';

    const context = getComboboxContext();
    const labels = getContext<(() => ComboboxLabels | undefined) | undefined>('combobox-labels');
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
    const isFieldPill = $derived(isInputAppearance || variant === 'outline');
    const isLit = $derived(
        variant === 'primary' ||
            variant === 'secondary' ||
            variant === 'destructive' ||
            variant === 'glow'
    );
    const inheritsText = $derived(
        variant === 'primary' || variant === 'destructive' || variant === 'glow'
    );
    const frameClasses = $derived.by(() => {
        if (isInputAppearance) {
            return 'items-center gap-2 has-[input:focus-visible]:border-primary has-[input:focus-visible]:shadow-[var(--focus-ring)]';
        }
        if (variant === 'outline') {
            return 'px-[calc(var(--spacing)*3.5)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-field)] data-[state=open]:border-[var(--color-border-strong)] data-[state=open]:bg-[var(--color-field)] has-[:focus-visible]:border-primary has-[:focus-visible]:shadow-[var(--focus-ring)]';
        }
        if (isLit) {
            return 'has-[:focus-visible]:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]';
        }
        if (variant === 'panel') {
            return 'has-[:focus-visible]:shadow-[var(--focus-ring),var(--elevation-1)]';
        }
        return 'has-[:focus-visible]:shadow-[var(--focus-ring)]';
    });
    const inputClasses = $derived(
        cn(
            'min-w-0 flex-1 bg-transparent text-left outline-none',
            isFieldPill
                ? 'text-[length:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)]'
                : 'text-[length:var(--font-size-button)] [font-weight:var(--font-weight-button)] [letter-spacing:var(--tracking-button)]',
            isInputAppearance
                ? 'h-auto cursor-text'
                : 'h-full cursor-[var(--ui-cursor-interactive)]',
            inheritsText
                ? 'text-inherit placeholder:text-inherit placeholder:opacity-75'
                : 'placeholder:text-foreground-muted',
            !inheritsText &&
                (combobox.open || combobox.selected ? 'text-foreground' : 'text-foreground-muted'),
            !isInputAppearance && 'pe-7'
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
        frameClasses,
        isInputAppearance
            ? input({ variant: variant === 'secondary' ? 'secondary' : 'outline' })
            : button({ variant, size }),
        'relative select-none',
        disabled && 'pointer-events-none opacity-[var(--opacity-disabled)]'
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
            class={cn(inputClasses, 'inline-flex w-full items-center truncate')}
        >
            {context.selectionLabel || placeholder}
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
        >
            {#snippet child({ props })}
                <input {...props} value={context.inputValue} />
            {/snippet}
        </ComboboxPrimitive.Input>
    {/if}
    {#if isInputAppearance && (combobox.searchContent !== '' || combobox.selected)}
        <button
            type="button"
            aria-label={labels?.()?.clear ?? 'Clear search'}
            {disabled}
            data-ui="combobox-trigger-clear"
            class="-me-1 grid size-6 shrink-0 cursor-pointer place-items-center rounded-[var(--radius-control)] text-foreground-muted outline-none transition-[background-color,color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none hover:bg-[var(--color-wash)] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] [&_svg]:size-4 [&_svg]:shrink-0"
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
            class={cn(
                'flex shrink-0 items-center text-foreground-muted [&_svg]:size-4 [&_svg]:shrink-0',
                !isInputAppearance &&
                    'absolute top-1/2 end-[calc(var(--spacing)*3.5)] -translate-y-1/2'
            )}
            aria-hidden="true"
        >
            {@render trailing()}
        </span>
    {:else if !isInputAppearance}
        <HugeiconsIcon
            icon={ChevronDown}
            size={16}
            class={cn(
                'pointer-events-none absolute top-1/2 end-[calc(var(--spacing)*3.5)] shrink-0 -translate-y-1/2 transition-[rotate] [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] motion-reduce:transition-none',
                inheritsText ? 'text-inherit opacity-70' : 'text-foreground-muted',
                combobox.open && 'rotate-180'
            )}
            aria-hidden="true"
        />
    {/if}
</div>
