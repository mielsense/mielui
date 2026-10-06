<script lang="ts">
    import { Moon02Icon as Moon, Sun03Icon as Sun } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { fromAction } from 'svelte/attachments';

    const label = $derived(
        mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
</script>

<Tooltip.Root>
    <Tooltip.Trigger>
        <Button
            variant="ghost"
            size="icon"
            aria-label={label}
            class="size-8 shrink-0 rounded-[var(--radius-sm)] text-foreground-muted hover:text-foreground"
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
