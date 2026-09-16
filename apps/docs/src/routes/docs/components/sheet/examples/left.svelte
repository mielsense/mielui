<script lang="ts">
    import FolderKanban from '@hugeicons/core-free-icons/FolderKanbanIcon';
    import Home from '@hugeicons/core-free-icons/Home01Icon';
    import Inbox from '@hugeicons/core-free-icons/InboxIcon';
    import Menu from '@hugeicons/core-free-icons/Menu01Icon';
    import Settings from '@hugeicons/core-free-icons/Settings01Icon';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let open = $state(false);
    let current = $state('home');

    const links = [
        { value: 'home', label: 'Home', icon: Home },
        { value: 'inbox', label: 'Inbox', icon: Inbox, count: 3 },
        { value: 'projects', label: 'Projects', icon: FolderKanban },
        { value: 'settings', label: 'Settings', icon: Settings }
    ];

    function navigate(value: string) {
        current = value;
        open = false;
    }
</script>

<Sheet.Root bind:open>
    <Sheet.Trigger variant="outline">
        <HugeiconsIcon icon={Menu} size={14} />
        Menu
    </Sheet.Trigger>
    <Sheet.Content side="left">
        <Sheet.Header>
            <Sheet.Title>Navigation</Sheet.Title>
            <Sheet.Description>Jump to a section of the app.</Sheet.Description>
        </Sheet.Header>

        <nav aria-label="App sections" class="flex flex-col gap-1">
            {#each links as link (link.value)}
                <Button
                    variant="ghost"
                    class="w-full justify-start gap-2"
                    aria-current={current === link.value ? 'page' : undefined}
                    onclick={() => navigate(link.value)}
                >
                    <HugeiconsIcon icon={link.icon} size={16} />
                    {link.label}
                    {#if link.count}
                        <Badge variant="secondary" class="ml-auto">{link.count}</Badge>
                    {/if}
                </Button>
            {/each}
        </nav>

        <div class="h-px w-full bg-border" role="separator"></div>

        <div class="flex items-center gap-3">
            <Avatar.Root size="sm">
                <Avatar.Fallback>AN</Avatar.Fallback>
            </Avatar.Root>
            <div class="flex min-w-0 flex-col">
                <span
                    class="truncate text-sm [font-weight:var(--font-weight-label,500)] text-foreground"
                >
                    mielsense
                </span>
                <span class="truncate text-xs text-foreground-muted">mielsense@mielui.ui</span>
            </div>
        </div>

        <Sheet.Footer>
            <Sheet.Close class="w-full" variant="outline">
                Close
                <Kbd shortcut="esc" />
            </Sheet.Close>
        </Sheet.Footer>
    </Sheet.Content>
</Sheet.Root>
