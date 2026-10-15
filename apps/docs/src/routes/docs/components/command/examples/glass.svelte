<script lang="ts">
    import {
        CircleDotIcon as CircleDot,
        InboxIcon as Inbox,
        MapsIcon as MapIcon,
        Search01Icon as Search
    } from '@hugeicons/core-free-icons';
    import * as Command from '@mielui/svelte/components/command';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<Command.Root>
    <Command.Trigger variant="outline">
        <HugeiconsIcon icon={Search} size={14} />
        Open glass palette
    </Command.Trigger>
    <Command.Content surface="glass">
        <Command.Search />
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
        </Command.Results>
    </Command.Content>
</Command.Root>
