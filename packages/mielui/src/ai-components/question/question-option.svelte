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
            'group relative flex cursor-[var(--ui-cursor-interactive)] items-start gap-3 rounded-[var(--radius-md)] px-2.5 py-2 text-start transition-[background-color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] [counter-increment:question-option] motion-reduce:transition-none has-[:focus-visible]:shadow-[var(--focus-ring)] data-[state=checked]:bg-[var(--color-wash)] [&:not([data-disabled]):hover]:bg-[var(--color-wash)] [&:nth-of-type(n+10)_[data-ui=question-option-key]]:hidden'
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
                    selected
                        ? 'peer-focus-visible:shadow-[var(--mielui-glow-shadow)]'
                        : 'peer-focus-visible:shadow-none',
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
                        'text-[var(--color-on-primary)] transition-[opacity,scale] [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] motion-reduce:transition-none',
                        selected ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                    )}
                />
            </span>
        {:else}
            <span
                data-state={selected ? 'checked' : 'unchecked'}
                class={cn(
                    'mt-px flex size-[calc(var(--size-hairline)*9)] shrink-0 items-center justify-center rounded-full border-[length:var(--border-size)] bg-origin-border transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none',
                    selected
                        ? 'mielui-glow border-transparent shadow-[var(--mielui-glow-shadow)] [--mielui-glow-color:var(--color-primary)] [--mielui-glow-light:0.3]'
                        : 'border-[var(--mielui-control-border)] bg-[var(--color-field)]',
                    !selected &&
                        !isDisabled &&
                        'group-hover:border-[color-mix(in_oklab,var(--color-foreground)_45%,var(--color-card))]'
                )}
                aria-hidden="true"
            >
                <span
                    class={cn(
                        'size-[calc(var(--size-hairline)*3)] rounded-full bg-[var(--color-on-primary)] transition-[opacity,scale] [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] motion-reduce:transition-none',
                        selected ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
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
        <kbd
            aria-hidden="true"
            data-ui="question-option-key"
            class="grid h-5 min-w-5 shrink-0 place-items-center self-center font-mono text-[length:var(--font-size-meta)] leading-none tabular-nums text-foreground-muted opacity-70 before:content-[counter(question-option)]"
        ></kbd>
    </label>
{/if}
