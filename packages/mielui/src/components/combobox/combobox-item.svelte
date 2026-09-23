<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { Button, type ButtonProps } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { Combobox as ComboboxPrimitive, mergeProps } from 'bits-ui';
    import { onMount } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import { getComboboxContext } from './context.svelte';
    import type { RegisteredComboboxItem } from './controller.svelte';

    const context = getComboboxContext();
    const localId = $props.id();
    const optionId = `combobox-${context.id}-option-${localId}`;
    type Props = {
        value: string;
        label: string;
        callback?: () => void;
    } & ButtonProps;

    let {
        label,
        value,
        class: className,
        callback,
        disabled = false,
        element = $bindable(),
        ...rest
    }: Props = $props();
    const item: RegisteredComboboxItem = {
        id: optionId,
        get value() {
            return value;
        },
        get label() {
            return label;
        },
        get callback() {
            return callback;
        },
        get ref() {
            return element;
        },
        get disabled() {
            return disabled;
        }
    };
    onMount(() => {
        return context.register(item);
    });
</script>

<div
    data-combobox-result={value}
    data-visible={context.matches(value)}
    aria-hidden={!context.matches(value) || undefined}
    inert={!context.matches(value)}
    class="grid transition-[grid-template-rows] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none"
    style:grid-template-rows={context.matches(value) ? '1fr' : '0fr'}
>
    <div class="min-h-0 overflow-hidden">
        <ComboboxPrimitive.Item
            id={rest.id ?? optionId}
            {value}
            {label}
            disabled={disabled || !context.matches(value)}
            onHighlight={() => {
            context.state.activeValue = value;
        }}
        >
            {#snippet child({ props, selected, highlighted })}
                <Button
                    {...buttonAttributes(mergeProps(rest, { ...props as HTMLButtonAttributes }))}
                    bind:element
                    disabled={disabled || !context.matches(value)}
                    data-collection-item
                    data-collection-active={highlighted}
                    data-combobox-value={value}
                    tabindex={-1}
                    class={cn(className, 'mielui-menu-item flex-row gap-3 overflow-hidden text-sm')}
                    unstyled
                >
                    {label}
                    {#if selected}
                        <span aria-hidden="true"><HugeiconsIcon icon={Check} /></span>
                    {/if}
                </Button>
            {/snippet}
        </ComboboxPrimitive.Item>
    </div>
</div>
