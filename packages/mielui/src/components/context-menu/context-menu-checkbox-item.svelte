<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { ContextMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import { untrack } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ContextMenuCheckboxItemProps } from '.';
    import { getContextMenuContext } from './context.svelte';

    let {
        children,
        class: className,
        disabled = false,
        onclick: userOnclick,
        element = $bindable(),
        inset = false,
        callback,
        checked = $bindable(false),
        value,
        ...rest
    }: ContextMenuCheckboxItemProps = $props();
    const { state } = getContextMenuContext();
    let internalChecked = $state(untrack(() => state.checkboxItems.get(value) ?? checked));
    let syncedChecked = $state(untrack(() => checked));

    $effect(() => {
        if (checked !== syncedChecked) {
            syncedChecked = checked;
            internalChecked = checked;
        }
        state.checkboxItems.set(value, internalChecked);
    });

    function updateChecked(next: boolean) {
        internalChecked = next;
        checked = next;
        syncedChecked = next;
        state.checkboxItems.set(value, next);
    }
</script>

<MenuPrimitive.CheckboxItem
    id={rest.id ?? undefined}
    checked={internalChecked}
    onCheckedChange={updateChecked}
    {value}
    {disabled}
    onclick={(event) => {
        userOnclick?.(event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
    }}
    onSelect={() => {
        callback?.();
    }}
>
    {#snippet child({ props })}
        <Button
            {...mergeProps(rest, props)}
            bind:element
            {disabled}
            data-collection-item
            class={cn(className, 'mielui-menu-item flex-row gap-3 text-sm', inset && 'pl-8')}
            unstyled
        >
            <span class="grid size-4 shrink-0 place-items-center" aria-hidden="true">
                {#if internalChecked}
                    <HugeiconsIcon icon={Check} size={13} strokeWidth={2.25} />
                {/if}
            </span>
            {@render children?.()}
        </Button>
    {/snippet}
</MenuPrimitive.CheckboxItem>
