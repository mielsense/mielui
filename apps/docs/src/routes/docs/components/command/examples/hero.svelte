<script lang="ts">
    import {
        CircleDotIcon as CircleDot,
        FolderAddIcon as FolderPlus,
        InboxIcon as Inbox,
        MapsIcon as MapIcon,
        Moon02Icon as Moon,
        Search01Icon as Search,
        Edit01Icon as SquarePen,
        UserGroupIcon as Users
    } from '@hugeicons/core-free-icons';
    import * as Command from '@mielui/svelte/components/command';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex w-full items-center justify-center">
    <Command.Root>
        <Command.Trigger
            variant="outline"
            class="w-[16rem] max-w-full justify-between gap-2 px-3 py-2 text-foreground-muted"
        >
            <div class="flex min-w-0 items-center gap-2">
                <HugeiconsIcon icon={Search} size={16} />
                <span class="truncate">Search or jump to…</span>
            </div>
            <Kbd shortcut="cmd+K" class="shrink-0" />
        </Command.Trigger>
        <Command.Content>
            <Command.Header>
                <span>Command</span>
                <span class="ml-auto flex items-center gap-1.5">
                    <Kbd shortcut="esc" />
                    close
                </span>
            </Command.Header>
            <Command.Search placeholder="Type a command or search…" />
            <Command.Results>
                <Command.Group heading="Jump to">
                    <Command.Item name="Inbox">
                        <HugeiconsIcon icon={Inbox} size={16} />
                        Inbox
                    </Command.Item>
                    <Command.Item name="My Issues">
                        <HugeiconsIcon icon={CircleDot} size={16} />
                        My Issues
                    </Command.Item>
                    <Command.Item name="Roadmap">
                        <HugeiconsIcon icon={MapIcon} size={16} />
                        Roadmap
                    </Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Group heading="Create">
                    <Command.Item name="New issue">
                        <HugeiconsIcon icon={SquarePen} size={16} />
                        <span class="flex-1">New issue</span>
                        <Kbd shortcut="C" />
                    </Command.Item>
                    <Command.Item name="New project">
                        <HugeiconsIcon icon={FolderPlus} size={16} />
                        New project
                    </Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Group heading="Settings">
                    <Command.Item name="Switch team">
                        <HugeiconsIcon icon={Users} size={16} />
                        Switch team
                    </Command.Item>
                    <Command.Item name="Theme">
                        <HugeiconsIcon icon={Moon} size={16} />
                        Theme
                    </Command.Item>
                </Command.Group>
            </Command.Results>
        </Command.Content>
    </Command.Root>
</div>
