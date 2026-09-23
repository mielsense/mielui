<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import type { NumberFieldInputProps } from '.';
    import { getNumberFieldContext } from './context';

    let {
        element = $bindable(),
        class: className,
        id,
        oninput,
        disabled,
        readonly,
        required,
        ...rest
    }: NumberFieldInputProps = $props();
    const context = getNumberFieldContext();
    $effect(() => {
        const current = element;
        context.input = current;
        context.inputDisabled = disabled ?? false;
        context.inputReadonly = readonly ?? false;
        return () => {
            untrack(() => {
                if (context.input === current) {
                    context.input = undefined;
                    context.inputDisabled = false;
                    context.inputReadonly = false;
                }
            });
        };
    });

    function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
        oninput?.(event);
        context.setValue(
            event.currentTarget.value === '' ? undefined : event.currentTarget.valueAsNumber
        );
    }
</script>

<input
    {...rest}
    bind:this={element}
    id={id ?? context.id}
    type="number"
    name={context.name}
    form={context.form}
    min={context.min}
    max={context.max}
    step={context.step}
    disabled={disabled || context.disabled}
    readonly={readonly || context.readonly}
    required={required || context.required}
    defaultValue={context.initialValue}
    bind:value={() => context.value, context.setValue}
    oninput={handleInput}
    data-ui="number-field-input"
    class={cn(className, 'min-h-[var(--size-control-md)] w-full min-w-0 flex-1 appearance-textfield rounded-[var(--radius-md)] bg-transparent px-3 text-center text-foreground tabular-nums [font-size:var(--font-size-body)] outline-none placeholder:text-foreground-muted disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none')}
/>
