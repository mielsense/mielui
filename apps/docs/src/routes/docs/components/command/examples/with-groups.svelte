<script lang="ts">
    import Plus from '@hugeicons/core-free-icons/Add01Icon';
    import Search from '@hugeicons/core-free-icons/Search01Icon';
    import Settings from '@hugeicons/core-free-icons/Settings01Icon';
    import Users from '@hugeicons/core-free-icons/UserGroupIcon';
    import * as Command from '@mielui/svelte/components/command';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex items-center justify-center">
    <Command.Root>
        <Command.Trigger>
            <HugeiconsIcon icon={Search} size={14} />
            Open palette
        </Command.Trigger>
        <Command.Content>
            <Command.Search placeholder="Search..." />
            <Command.Results>
                <Command.Group heading="Actions">
                    <Command.Item name="New project">
                        <HugeiconsIcon icon={Plus} size={14} />
                        New project
                    </Command.Item>
                    <Command.Item name="Settings">
                        <HugeiconsIcon icon={Settings} size={14} />
                        Settings
                    </Command.Item>
                </Command.Group>
                <Command.Group heading="Users">
                    <Command.Item name="Team">
                        <HugeiconsIcon icon={Users} size={14} />
                        Team
                    </Command.Item>
                </Command.Group>
            </Command.Results>
        </Command.Content>
    </Command.Root>
</div>
