<script lang="ts">
    import { Moon02Icon as Moon, Sun03Icon as Sun } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { cn } from '@mielui/svelte/utils';
    import { mode, toggleMode } from 'mode-watcher';
    import { fromAction } from 'svelte/attachments';

    let {
        placement,
        class: className
    }: {
        placement?: 'top' | 'right';
        class?: string;
    } = $props();

    const label = $derived(
        mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
</script>

<Tooltip.Root {placement}>
    <Tooltip.Trigger>
        <Button
            variant="ghost"
            size="icon"
            aria-label={label}
            class={cn('size-8 shrink-0 text-foreground-muted hover:text-foreground', className)}
            onclick={toggleMode}
        >
            <span
                class="inline-flex size-4"
                aria-hidden="true"
                {@attach fromAction(morph, () => ({ key: mode.current }))}
            >
                <HugeiconsIcon icon={mode.current === 'dark' ? Moon : Sun} size={16} />
            </span>
        </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>{label}</Tooltip.Content>
</Tooltip.Root>
