<script lang="ts">
    import { ArrowRight01Icon as ChevronRight } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import { ContextMenu as MenuPrimitive, mergeProps } from 'bits-ui';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { ContextMenuSubTriggerProps } from '.';

    let {
        class: className,
        children,
        inset = false,
        ...rest
    }: ContextMenuSubTriggerProps = $props();
</script>

<MenuPrimitive.SubTrigger>
    {#snippet child({ props })}
        <Button
            {...mergeProps(rest, props)}
            role="menuitem"
            aria-haspopup="menu"
            data-collection-item
            class={cn(className, 'mielui-menu-item', inset && 'pl-8')}
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
