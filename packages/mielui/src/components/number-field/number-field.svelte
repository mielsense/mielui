<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import type { NumberFieldProps } from '.';
    import { setNumberFieldContext } from './context';

    let {
        value = $bindable<number | undefined>(),
        inputId,
        min,
        max,
        step = 1,
        name,
        form,
        disabled = false,
        readonly = false,
        required = false,
        onValueChange,
        children,
        class: className,
        element = $bindable(),
        ...rest
    }: NumberFieldProps = $props();
    const generatedId = $props.id();
    const id = $derived(inputId ?? generatedId);
    const initialValue = untrack(() => value);
    let input = $state<HTMLInputElement>();
    let inputDisabled = $state(false);
    let inputReadonly = $state(false);
    const effectiveStep = $derived(Number.isFinite(step) && step > 0 ? step : 1);

    function setValue(next: number | undefined) {
        const normalized = next !== undefined && Number.isFinite(next) ? next : undefined;
        if (Object.is(value, normalized)) {
            return;
        }
        value = normalized;
        onValueChange?.(normalized);
    }

    function change(direction: 1 | -1) {
        if (!input || disabled || readonly || input.disabled || input.readOnly) {
            return;
        }
        if (direction === 1) {
            input.stepUp();
        } else {
            input.stepDown();
        }
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    setNumberFieldContext({
        get id() {
            return id;
        },
        get value() {
            return value;
        },
        get initialValue() {
            return initialValue;
        },
        get min() {
            return min;
        },
        get max() {
            return max;
        },
        get step() {
            return effectiveStep;
        },
        get name() {
            return name;
        },
        get form() {
            return form;
        },
        get disabled() {
            return disabled || inputDisabled;
        },
        get readonly() {
            return readonly || inputReadonly;
        },
        get required() {
            return required;
        },
        get input() {
            return input;
        },
        set input(next) {
            input = next;
        },
        get inputDisabled() {
            return inputDisabled;
        },
        set inputDisabled(next) {
            inputDisabled = next;
        },
        get inputReadonly() {
            return inputReadonly;
        },
        set inputReadonly(next) {
            inputReadonly = next;
        },
        setValue,
        change
    });
</script>

<div
    {...rest}
    bind:this={element}
    data-ui="number-field"
    data-disabled={disabled || undefined}
    class={cn(className, 'flex min-w-0 flex-col gap-2')}
>
    {@render children?.({ value })}
</div>
