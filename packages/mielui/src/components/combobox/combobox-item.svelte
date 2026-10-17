<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { Combobox as ComboboxPrimitive, mergeProps } from 'bits-ui';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import type { ComboboxItemProps } from '.';
    import { getComboboxContext } from './context';
    import type { RegisteredComboboxItem } from './controller.svelte';

    const context = getComboboxContext();
    const localId = $props.id();
    const optionId = `combobox-${context.id}-option-${localId}`;

    let {
        label,
        value,
        class: className,
        callback,
        children,
        disabled = false,
        element = $bindable(),
        ...rest
    }: ComboboxItemProps = $props();
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
    const visible = $derived(context.matches(value));

    $effect(() => {
        return context.register(item);
    });
</script>

<div
    data-combobox-result={value}
    data-visible={visible}
    aria-hidden={!visible || undefined}
    inert={!visible}
    class="grid"
    style:grid-template-rows={visible ? '1fr' : '0fr'}
>
    <div class="min-h-0 overflow-hidden">
        <ComboboxPrimitive.Item
            id={rest.id ?? optionId}
            {value}
            {label}
            disabled={disabled || !visible}
            onHighlight={() => {
                context.state.activeValue = value;
            }}
        >
            {#snippet child({ props, selected, highlighted })}
                <Button
                    {...buttonAttributes(mergeProps(rest, { ...props as HTMLButtonAttributes }))}
                    bind:element
                    disabled={disabled || !visible}
                    data-collection-item
                    data-collection-active={highlighted}
                    data-combobox-value={value}
                    tabindex={-1}
                    class={cn(
                        className,
                        'mielui-menu-item flex-row gap-3 overflow-hidden text-sm',
                        selected
                            ? '[font-weight:var(--font-weight-label)]'
                            : '[font-weight:var(--font-weight-body)]'
                    )}
                    unstyled
                >
                    {#if children}
                        {@render children()}
                    {:else}
                        {label}
                    {/if}
                    {#if selected}
                        <span aria-hidden="true" class="ms-auto text-foreground-muted">
                            <HugeiconsIcon icon={Check} />
                        </span>
                    {/if}
                </Button>
            {/snippet}
        </ComboboxPrimitive.Item>
    </div>
</div>
