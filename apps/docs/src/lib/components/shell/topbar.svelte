<script lang="ts">
    import { SidebarLeft01Icon as SidebarIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';
    import { getShell } from './shell.svelte';

    const {
        leading,
        children,
        actions,
        sidebar = true
    }: {
        leading?: Snippet;
        children?: Snippet;
        actions?: Snippet;
        sidebar?: boolean;
    } = $props();

    const shell = getShell();
</script>

<header
    class="flex h-[50px] w-full min-w-0 shrink-0 items-center gap-1.5 border-b-[length:var(--border-size)] border-[var(--docs-rule)] px-2.5"
>
    {@render leading?.()}
    {#if sidebar && shell.collapsed}
        <div class="hidden lg:block">
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Show sidebar"
                        class="size-8 shrink-0 rounded-[var(--radius-sm)] text-foreground-muted hover:text-foreground"
                        onclick={shell.toggle}
                    >
                        <HugeiconsIcon icon={SidebarIcon} size={16} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Show sidebar</Tooltip.Content>
            </Tooltip.Root>
        </div>
    {/if}
    <div class="flex min-w-0 flex-1 items-center gap-1.5">
        {@render children?.()}
    </div>
    <div class="flex shrink-0 items-center gap-1">
        {@render actions?.()}
    </div>
</header>
