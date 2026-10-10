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
        'flex min-h-[var(--size-touch)] gap-2.5 md:min-h-0',
        description ? 'items-start' : 'items-center',
        isDisabled
            ? 'cursor-not-allowed opacity-[var(--opacity-disabled)]'
            : 'cursor-[var(--ui-cursor-interactive)]'
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
            if (!event.defaultPrevented) {
                ctx.setValue(value);
            }
        }}
        class="peer sr-only"
    />
    <span
        use:pressable
        data-ui="radio-group-item"
        data-state={selected ? 'checked' : 'unchecked'}
        class={cn(
            'mielui-press mt-px flex size-[calc(var(--size-hairline)*9)] shrink-0 items-center justify-center rounded-full border-[length:var(--border-size)] bg-origin-border transition-[background-color,border-color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none peer-aria-invalid:border-[var(--color-error)]',
            selected
                ? 'mielui-glow [--mielui-glow-color:var(--color-primary)] [--mielui-glow-light:0.3] border-transparent shadow-[var(--mielui-glow-shadow)] peer-focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]'
                : 'border-[var(--mielui-control-border)] bg-[var(--color-field)] peer-focus-visible:shadow-[var(--focus-ring)]',
            !isDisabled &&
                !selected &&
                'hover:border-[color-mix(in_oklab,var(--color-foreground)_45%,var(--color-card))]'
        )}
        aria-hidden="true"
    >
        <span
            class={cn(
                'size-[calc(var(--size-hairline)*3)] rounded-full bg-[var(--color-on-primary)] transition-[opacity,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none',
                selected ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
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
