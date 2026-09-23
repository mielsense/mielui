<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { buttonAttributes } from '../_internal/button-attributes';
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
    disabled={disabled ?? undefined}
    onclick={(event) => {
        buttonAttributes({ onclick: userOnclick }).onclick?.(event);
    }}
    onSelect={() => {
        callback?.();
    }}
>
    {#snippet child({ props })}
        <Button
            {...buttonAttributes(mergeProps(rest, { ...props as HTMLButtonAttributes }))}
            bind:element
            disabled={disabled ?? undefined}
            data-collection-item
            class={cn(className, 'mielui-menu-item flex-row gap-3 text-sm')}
            unstyled
        >
            {@render children?.()}
        </Button>
    {/snippet}
</MenuPrimitive.Item>
