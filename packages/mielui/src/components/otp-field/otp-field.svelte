<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { PinInput, REGEXP_ONLY_DIGITS } from 'bits-ui';
    import { untrack } from 'svelte';
    import type { OTPFieldProps } from '.';
    import Cell from './otp-field-cell.svelte';
    import Group from './otp-field-group.svelte';

    let {
        value = $bindable(''),
        element = $bindable(null),
        length = 6,
        id,
        class: className,
        children: content,
        pattern = REGEXP_ONLY_DIGITS,
        onValueChange,
        onComplete,
        ...rest
    }: OTPFieldProps = $props();
    const uid = $props.id();
    const initialValue = untrack(() => value);
    const count = $derived(Number.isFinite(length) ? Math.max(1, Math.trunc(length)) : 6);

    const normalizedValue = $derived(value.slice(0, count));
    $effect(() => {
        if (value !== normalizedValue) {
            value = normalizedValue;
            onValueChange?.(normalizedValue);
        }
    });

    function setValue(next: string) {
        value = next;
    }

    $effect(() => {
        const input = element;
        void rest.form;
        const form = input?.form;
        if (!input || !form) {
            return;
        }
        let timer: ReturnType<typeof setTimeout> | undefined;
        function reset(event: Event) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (!event.defaultPrevented) {
                    value = initialValue.slice(0, count);
                    onValueChange?.(value);
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

<PinInput.Root
    {...rest}
    id={`${id ?? uid}-root`}
    inputId={id ?? uid}
    bind:inputRef={element}
    bind:value={() => normalizedValue, setValue}
    maxlength={count}
    {pattern}
    {onValueChange}
    {onComplete}
    data-ui="otp-field"
    class={cn(className, 'flex items-center gap-2 has-disabled:opacity-[var(--opacity-disabled)]', rest['aria-invalid'] && rest['aria-invalid'] !== 'false' && '[&_[data-ui=otp-field-cell]]:border-error')}
>
    {#snippet children({ cells, isFocused })}
        {#if content}
            {@render content({ cells, isFocused })}
        {:else}
            <Group>
                {#each cells as cell, index (index)}
                    <Cell {cell} />
                {/each}
            </Group>
        {/if}
    {/snippet}
</PinInput.Root>
