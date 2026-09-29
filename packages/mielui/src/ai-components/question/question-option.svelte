<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { checkboxBox } from '../../components/checkbox/variants';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { QuestionOptionProps } from '.';
    import { getQuestionContext } from './context.svelte';

    let {
        value,
        label,
        description,
        disabled = false,
        element = $bindable(),
        class: className,
        onchange,
        ...rest
    }: QuestionOptionProps = $props();

    const context = getQuestionContext();
    const selected = $derived(context.isSelected(value));
    const isDisabled = $derived(context.disabled || context.busy || disabled);
    const inputType = $derived(context.type === 'multiple' ? 'checkbox' : 'radio');

    function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
        context.select(value);
        onchange?.(event);
    }
</script>

{#if context.type !== 'text'}
    <label
        data-ui="question-option"
        data-state={selected ? 'checked' : 'unchecked'}
        data-disabled={isDisabled || undefined}
        class={cn(
            className,
            isDisabled && 'cursor-not-allowed opacity-[var(--opacity-disabled)]',
            'group relative flex min-h-12 cursor-[var(--ui-cursor-interactive)] items-start gap-3 rounded-[var(--radius-md)] px-2.5 py-2.5 text-start transition-[background-color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none has-[:focus-visible]:shadow-[var(--focus-ring)]',
            selected
                ? 'bg-[color-mix(in_srgb,var(--color-primary)_8%,var(--color-card))]'
                : '[&:not([data-disabled]):hover]:bg-foreground/[0.08]'
        )}
    >
        <input
            bind:this={element}
            {...rest}
            data-question-control
            data-ui="question-option-input"
            type={inputType}
            name={context.name}
            {value}
            checked={selected}
            disabled={isDisabled}
            required={context.required && context.type === 'single'}
            aria-invalid={Boolean(context.validationMessage)}
            onchange={handleChange}
            class="peer sr-only"
        />
        {#if context.type === 'multiple'}
            <span
                data-state={selected ? 'checked' : 'unchecked'}
                class={cn(
                    'peer-focus-visible:shadow-none',
                    !selected &&
                        !isDisabled &&
                        'group-hover:border-[color-mix(in_oklab,var(--color-foreground)_45%,var(--color-card))]',
                    checkboxBox({
                        checked: selected,
                        size: 'md'
                    })
                )}
                aria-hidden="true"
            >
                <HugeiconsIcon
                    icon={Check}
                    size={12}
                    strokeWidth={2.5}
                    class={cn(
                        'text-[var(--color-on-primary)] transition-[opacity,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none',
                        selected ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                    )}
                />
            </span>
        {:else}
            <span
                data-state={selected ? 'checked' : 'unchecked'}
                class={cn(
                    'flex size-[calc(var(--size-hairline)*9)] shrink-0 items-center justify-center rounded-full border-[length:var(--border-size)] bg-card transition-[background-color,border-color] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none',
                    selected ? 'border-primary' : 'border-[var(--mielui-control-border)]',
                    !selected &&
                        !isDisabled &&
                        'group-hover:border-[color-mix(in_oklab,var(--color-foreground)_45%,var(--color-card))]'
                )}
                aria-hidden="true"
            >
                <span
                    class={cn(
                        'size-2.5 rounded-full bg-primary transition-[opacity,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none',
                        selected ? 'scale-100 opacity-100' : 'scale-[0.25] opacity-0'
                    )}
                ></span>
            </span>
        {/if}
        <span class="min-w-0 flex-1">
            <span
                class="block [font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] leading-snug text-foreground"
            >
                {label}
            </span>
            {#if description}
                <span
                    class="mt-0.5 block [font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] leading-snug text-foreground-muted"
                >
                    {description}
                </span>
            {/if}
        </span>
    </label>
{/if}
