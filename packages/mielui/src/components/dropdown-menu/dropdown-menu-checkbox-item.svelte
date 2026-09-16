<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { closeMenuLayers, cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { getPopoverContext } from '../popover/context.svelte';
    import type { DropdownMenuCheckboxItemProps } from '.';
    import { getDropdownMenuContext } from './context.svelte';

    let {
        checked = $bindable(false),
        onCheckedChange,
        children,
        class: className,
        onclick: userOnclick,
        element = $bindable(),
        ...rest
    }: DropdownMenuCheckboxItemProps = $props();

    const { state: popoverState } = getPopoverContext();
    const { ancestors } = getDropdownMenuContext();

    function toggle(event: MouseEvent) {
        const target = event.currentTarget as HTMLButtonElement;
        if (!target.disabled) {
            checked = !checked;
            onCheckedChange?.(checked);
        }
        userOnclick?.(event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
        if (!event.defaultPrevented && !target.disabled) {
            closeMenuLayers(popoverState, ancestors);
        }
    }
</script>

<Button
    bind:element
    {...rest}
    role="menuitemcheckbox"
    aria-checked={checked}
    data-collection-item
    onclick={toggle}
    class={cn(className, 'mielui-menu-item flex-row gap-3 text-sm')}
    unstyled
>
    <span class="grid size-4 shrink-0 place-items-center" aria-hidden="true">
        {#if checked}
            <HugeiconsIcon icon={Check} size={13} strokeWidth={2.25} />
        {/if}
    </span>
    {@render children?.()}
</Button>
