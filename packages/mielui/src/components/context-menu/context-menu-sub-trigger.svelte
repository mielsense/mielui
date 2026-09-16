<script lang="ts">
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import ChevronRight from '@hugeicons/core-free-icons/ArrowRight01Icon';
    import * as Popover from '@mielui/svelte/components/popover';
    import { cn } from '@mielui/svelte/utils';
    import type { ContextMenuSubTriggerProps } from '.';

    let {
        class: className,
        children,
        inset = false,
        ...rest
    }: ContextMenuSubTriggerProps = $props();
</script>

<Popover.Trigger
    {...rest}
    role="menuitem"
    aria-haspopup="menu"
    data-collection-item
    class={cn(className, 'mielui-menu-item', inset && 'pl-8')}
    unstyled
>
    <span class="min-w-0 flex-1 text-left">{@render children?.()} </span>
    <HugeiconsIcon icon={ChevronRight} class="ml-2 shrink-0 text-foreground-muted" size={18} />
</Popover.Trigger>
