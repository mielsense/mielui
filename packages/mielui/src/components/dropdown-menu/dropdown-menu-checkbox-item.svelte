<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { DropdownMenuCheckboxItemProps } from '.';

    let {
        children,
        class: className,
        disabled = false,
        onclick: userOnclick,
        element = $bindable(),
        checked = $bindable(false),
        onCheckedChange,
        ...rest
    }: DropdownMenuCheckboxItemProps = $props();
</script>

<MenuPrimitive.CheckboxItem
    id={rest.id ?? undefined}
    bind:checked
    {onCheckedChange}
    {disabled}
    onclick={(event) => {
        userOnclick?.(event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
    }}
>
    {#snippet child({ props })}
        <Button
            {...mergeProps(rest, props)}
            bind:element
            {disabled}
            data-collection-item
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
    {/snippet}
</MenuPrimitive.CheckboxItem>
