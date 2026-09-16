<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import type { DropdownMenuItemProps } from '.';

    let {
        children,
        class: className,
        disabled = false,
        onclick: userOnclick,
        element = $bindable(),
        callback,
        ...rest
    }: DropdownMenuItemProps = $props();
</script>

<MenuPrimitive.Item
    id={rest.id ?? undefined}
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
            class={cn(className, 'mielui-menu-item flex-row gap-3 text-sm')}
            unstyled
        >
            {@render children?.()}
        </Button>
    {/snippet}
</MenuPrimitive.Item>
