<script lang="ts">
    import { ArrowRight01Icon as ChevronRight } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import type * as Popover from '@mielui/svelte/components/popover';
    import { cn } from '@mielui/svelte/utils';
    import { DropdownMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import { getDropdownMenuContext } from './context.svelte';

    type SubTriggerProps = {
        class?: string;
        children?: Snippet;
    } & Omit<Popover.PopoverTriggerProps, 'children' | 'class'>;

    let { class: className, children, onopen, onclick, ...rest }: SubTriggerProps = $props();
    const menu = getDropdownMenuContext();
    $effect(() => {
        const beforeOpen = onopen;
        menu.beforeOpen = beforeOpen;
        return () => {
            if (menu.beforeOpen === beforeOpen) {
                menu.beforeOpen = undefined;
            }
        };
    });
</script>

<MenuPrimitive.SubTrigger id={rest.id ?? undefined} disabled={rest.disabled ?? undefined} {onclick}>
    {#snippet child({ props })}
        <Button
            {...buttonAttributes(mergeProps(rest, { ...props as HTMLButtonAttributes }))}
            role="menuitem"
            aria-haspopup="menu"
            data-collection-item
            class={cn(className, 'mielui-menu-item')}
            unstyled
        >
            <span class="min-w-0 flex-1 text-left">{@render children?.()} </span>
            <HugeiconsIcon
                icon={ChevronRight}
                class="ml-2 shrink-0 text-foreground-muted"
                size={18}
            />
        </Button>
    {/snippet}
</MenuPrimitive.SubTrigger>
