<script lang="ts">
    import { MinusSignIcon as MinusIcon } from '@hugeicons/core-free-icons';
    import { cn, pressable } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { CheckboxProps } from '.';
    import { checkbox, checkboxBox, checkboxText } from './variants';

    let {
        checked = $bindable(false),
        label,
        description,
        disabled,
        variant = 'default',
        class: classProp,
        onCheckedChange,
        oninput,
        id,
        ...rest
    }: CheckboxProps = $props();

    const generatedId = $props.id();
    const inputId = $derived(id ?? generatedId);

    function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
        oninput?.(event);
        if (event.defaultPrevented) {
            return;
        }
        const next = (event.currentTarget as HTMLInputElement).checked;
        checked = next;
        onCheckedChange?.(next);
    }
</script>

<label
    for={inputId}
    class={cn(
        classProp,
        'min-h-[var(--size-touch)] md:min-h-0',
        checkbox({ variant, disabled: disabled ?? false, checked: checked ?? false })
    )}
>
    <input
        {...rest}
        id={inputId}
        type="checkbox"
        class="peer absolute size-4 opacity-0"
        {disabled}
        {checked}
        aria-label={rest['aria-label']}
        aria-labelledby={rest['aria-labelledby']}
        aria-describedby={[rest['aria-describedby'], description ? `${inputId}-description` : undefined].filter(Boolean).join(' ') || undefined}
        aria-checked={checked}
        oninput={handleChange}
    />

    <span
        use:pressable
        data-ui="checkbox-box"
        data-state={checked ? 'checked' : 'unchecked'}
        class={checkboxBox({ checked: checked ?? false })}
        aria-hidden="true"
    >
        <HugeiconsIcon
            icon={MinusIcon}
            size={12}
            strokeWidth={2.5}
            class={cn(
                'text-[var(--color-on-primary)] transition-[opacity,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none',
                checked ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            )}
        />
    </span>

    {#if label || description}
        <div class="flex flex-col justify-center">
            <!-- token-lint-disable-next-line no-literal-length: fine-tuning vertical alignment of label -->
            {#if label}
                <span class={cn(checkboxText(), 'mt-[-0.2rem]')} role="presentation">
                    {label}
                </span>
            {/if}
            {#if description}
                <span
                    id={`${inputId}-description`}
                    class="text-text [font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-foreground-muted"
                >
                    {description}
                </span>
            {/if}
        </div>
    {/if}
</label>
