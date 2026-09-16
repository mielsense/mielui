<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import type { RadioGroupContext, RadioGroupItemProps } from '.';

    let {
        class: className,
        value,
        disabled,
        label,
        description,
        id,
        onchange,
        ...rest
    }: RadioGroupItemProps = $props();

    const ctx = getContext<RadioGroupContext>('radio-group');
    const selected = $derived(ctx.isSelected(value));
    const isDisabled = $derived(disabled || ctx.disabled);
    const generatedId = $props.id();
    const inputId = $derived(id ?? generatedId);
</script>

<label
    for={inputId}
    class={cn(
        className,
        'flex min-h-[var(--size-touch)] cursor-[var(--ui-cursor-interactive)] items-start gap-2.5 md:min-h-0',
        isDisabled && 'cursor-not-allowed opacity-50'
    )}
>
    <input
        {...rest}
        type="radio"
        id={inputId}
        name={ctx.name}
        {value}
        checked={selected}
        disabled={isDisabled}
        aria-describedby={[rest['aria-describedby'], description ? `${inputId}-description` : undefined].filter(Boolean).join(' ') || undefined}
        onchange={(event) => {
            onchange?.(event);
            if (!event.defaultPrevented) { ctx.setValue(value); }
        }}
        class="peer sr-only"
    />
    <span
        use:pressable
        data-ui="radio-group-item"
        data-state={selected ? 'checked' : 'unchecked'}
        class={cn(
            'mielui-press mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-[length:var(--border-size)] bg-background transition-[background-color,border-color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none peer-focus-visible:shadow-[var(--focus-ring)]',
            selected ? 'border-primary' : 'border-border',
            !isDisabled && !selected && 'hover:border-primary'
        )}
        aria-hidden="true"
    >
        <span
            class={cn(
                'size-2 rounded-full bg-primary transition-[opacity,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none',
                selected ? 'scale-100 opacity-100' : 'scale-[0.25] opacity-0'
            )}
        ></span>
    </span>
    {#if label || description}
        <span class="flex flex-col gap-0.5 leading-tight">
            {#if label}
                <span
                    class="[font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] text-foreground"
                >
                    {label}
                </span>
            {/if}
            {#if description}
                <span
                    id={`${inputId}-description`}
                    class="[font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-foreground-muted"
                >
                    {description}
                </span>
            {/if}
        </span>
    {/if}
</label>
