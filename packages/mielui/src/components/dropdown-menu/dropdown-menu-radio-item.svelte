<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import type { DropdownMenuRadioItemProps } from '.';

    let {
        children,
        class: className,
        disabled = false,
        onclick: userOnclick,
        element = $bindable(),
        value,
        ...rest
    }: DropdownMenuRadioItemProps = $props();
</script>

<MenuPrimitive.RadioItem
    id={rest.id ?? undefined}
    {value}
    disabled={disabled ?? undefined}
    onclick={(event) => {
        buttonAttributes({ onclick: userOnclick }).onclick?.(event);
    }}
>
    {#snippet child({ props, checked })}
        <Button
            {...buttonAttributes(mergeProps(rest, { ...props as HTMLButtonAttributes }))}
            bind:element
            disabled={disabled ?? undefined}
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
</MenuPrimitive.RadioItem>
