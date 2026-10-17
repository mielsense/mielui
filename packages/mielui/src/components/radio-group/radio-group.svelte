<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import type { RadioGroupProps } from '.';
    import { setRadioGroupContext } from './context';

    let {
        class: className,
        value = $bindable<string | undefined>(),
        name,
        disabled = false,
        onValueChange,
        children,
        ...rest
    }: RadioGroupProps = $props();

    const generatedName = $props.id();
    const initialValue = untrack(() => value);
    let root = $state<HTMLDivElement>();

    function isSelected(itemValue: string) {
        return value === itemValue;
    }
    function setValue(itemValue: string) {
        if (disabled) {
            return;
        }
        value = itemValue;
        onValueChange?.(itemValue);
    }

    setRadioGroupContext({
        get name() {
            return name ?? generatedName;
        },
        get disabled() {
            return disabled;
        },
        isSelected,
        setValue
    });

    $effect(() => {
        const form = root?.querySelector<HTMLInputElement>('input[type="radio"]')?.form;
        if (!form) {
            return;
        }
        let timer: ReturnType<typeof setTimeout> | undefined;
        function reset(event: Event) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (event.defaultPrevented || value === initialValue) {
                    return;
                }
                value = initialValue;
                if (initialValue !== undefined) {
                    onValueChange?.(initialValue);
                }
            }, 0);
        }
        form.addEventListener('reset', reset);
        return () => {
            clearTimeout(timer);
            form.removeEventListener('reset', reset);
        };
    });
</script>

<div
    bind:this={root}
    data-ui="radio-group"
    role="radiogroup"
    aria-disabled={disabled || undefined}
    class={cn(className, 'grid gap-3')}
    {...rest}
>
    {@render children?.()}
</div>
