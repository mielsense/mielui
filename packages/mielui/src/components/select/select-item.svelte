<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { Select as BitsSelect, mergeProps } from 'bits-ui';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import type { SelectItemProps } from '.';
    import { getSelectContext } from './context.svelte';

    const { labels, values } = getSelectContext();
    let {
        children,
        class: className,
        value,
        label,
        onclick,
        disabled,
        element = $bindable(),
        ...rest
    }: SelectItemProps = $props();
    let resolvedLabel = $state('');

    $effect(() => {
        const itemValue = value;
        values.add(itemValue);
        const node = element;
        function updateLabel() {
            resolvedLabel =
                label ||
                node?.querySelector('[data-select-label]')?.textContent?.trim() ||
                node?.textContent?.trim() ||
                itemValue;
            labels.set(itemValue, resolvedLabel);
        }
        updateLabel();
        const observer = new MutationObserver(updateLabel);
        if (node) {
            observer.observe(node, { childList: true, characterData: true, subtree: true });
        }
        return () => {
            observer.disconnect();
            values.delete(itemValue);
            labels.delete(itemValue);
        };
    });
</script>

<BitsSelect.Item
    id={rest.id ?? undefined}
    {value}
    label={label || resolvedLabel || value}
    disabled={disabled ?? undefined}
    {onclick}
>
    {#snippet child({ props, selected })}
        <Button
            {...buttonAttributes(mergeProps(rest, { ...props as HTMLButtonAttributes }))}
            data-collection-item
            data-collection-active={selected}
            bind:element
            disabled={disabled ?? undefined}
            unstyled
            class={cn(className, 'mielui-menu-item data-highlighted:bg-secondary data-highlighted:text-foreground')}
        >
            {@render children?.()}
            {#if selected}
                <span aria-hidden="true"><HugeiconsIcon icon={Check} /></span>
            {/if}
        </Button>
    {/snippet}
</BitsSelect.Item>
