<script lang="ts">
    import { MinusSignIcon as MinusIcon } from '@hugeicons/core-free-icons';
    import { cn, pressable } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { fieldMetadata } from '../_internal/field-metadata';
    import type { CheckboxProps } from '.';
    import { checkbox, checkboxBox, checkboxText } from './variants';

    let {
        checked = $bindable(false),
        label,
        description,
        disabled,
        variant = 'default',
        size = 'md',
        class: classProp,
        onCheckedChange,
        oninput,
        id,
        ...rest
    }: CheckboxProps = $props();

    const generatedId = $props.id();
    const metadata = $derived(
        fieldMetadata({
            id: id ?? generatedId,
            metadataId: generatedId,
            label,
            description,
            ariaLabel: rest['aria-label'],
            labelledBy: rest['aria-labelledby'],
            describedBy: rest['aria-describedby']
        })
    );

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
    for={metadata.controlId}
    data-size={size}
    class={cn(
        classProp,
        'min-h-[var(--size-touch)] md:min-h-0',
        !description && 'items-center',
        checkbox({ variant, disabled: disabled ?? false, checked: checked ?? false })
    )}
>
    <input
        {...rest}
        id={metadata.controlId}
        type="checkbox"
        class="peer absolute size-4 opacity-0"
        {disabled}
        {checked}
        aria-label={rest['aria-label']}
        aria-labelledby={metadata.labelledBy}
        aria-describedby={metadata.describedBy}
        aria-checked={checked}
        oninput={handleChange}
    />

    <span
        use:pressable
        data-ui="checkbox-box"
        data-state={checked ? 'checked' : 'unchecked'}
        class={checkboxBox({ checked: checked ?? false, size })}
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
            {#if label}
                <span id={metadata.labelId} class={checkboxText()} role="presentation">
                    {label}
                </span>
            {/if}
            {#if description}
                <span
                    id={metadata.descriptionId}
                    class="text-text [font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-foreground-muted"
                >
                    {description}
                </span>
            {/if}
        </div>
    {/if}
</label>
