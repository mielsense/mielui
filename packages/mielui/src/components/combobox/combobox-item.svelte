<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { Button, type ButtonProps } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { getPopoverContext } from '../popover/context.svelte';
    import type { ComboboxItem } from '.';
    import { getComboboxContext } from './context.svelte';

    const { id, state: comboboxState, selectItem } = getComboboxContext();
    const { state: popoverState } = getPopoverContext();
    const localId = $props.id();
    const optionId = `combobox-${id}-option-${localId}`;

    type Props = {
        class?: string;
        value: string;
        label: string;
        callback?: () => void;
    } & ButtonProps;

    let { label, value, class: className, callback, onclick, disabled, ...rest }: Props = $props();
    let el = $state<HTMLButtonElement | HTMLAnchorElement | undefined>();
    let item: ComboboxItem = $derived({
        id: optionId,
        value: value,
        label: label,
        callback: callback,
        ref: el
    }) as ComboboxItem;
    const visible = $derived(comboboxState.searchContent === '' || comboboxState.results.has(item));

    function close(event: MouseEvent) {
        onclick?.(event);
        if (disabled || event.defaultPrevented) {
            return;
        }
        selectItem(item);
        popoverState.buttonRef?.focus();
    }

    $effect(() => {
        const added = item;
        const available = !disabled;
        if (!available) {
            return;
        }
        comboboxState.items.add(added);
        untrack(() => {
            if (comboboxState.open && comboboxState.activeValue === undefined) {
                comboboxState.activeValue = added.value;
            }
        });
        return () => {
            comboboxState.items.delete(added);
        };
    });
</script>

<Button
    bind:element={el}
    {disabled}
    id={optionId}
    role="option"
    aria-selected={comboboxState.selected?.value === item.value}
    aria-hidden={!visible || undefined}
    inert={!visible || undefined}
    data-collection-item
    data-collection-active={comboboxState.activeValue === item.value}
    data-combobox-value={value}
    data-visible={visible}
    tabindex={-1}
    {...rest}
    onclick={close}
    class={cn(
        className,
        'mielui-menu-item flex-row gap-3 overflow-hidden text-sm data-[visible=false]:hidden'
    )}
    unstyled
>
    {label}
    {#if comboboxState.selected?.value === item.value}
        <div aria-hidden="true">
            <HugeiconsIcon icon={Check} />
        </div>
    {/if}
</Button>
