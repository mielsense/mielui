<script lang="ts">
    import ChevronDown from '@hugeicons/core-free-icons/ArrowDown01Icon';
    import Copy2 from '@hugeicons/core-free-icons/Files01Icon';
    import Send from '@hugeicons/core-free-icons/SentIcon';
    import User from '@hugeicons/core-free-icons/UserIcon';
    import EyeOff from '@hugeicons/core-free-icons/ViewOffIcon';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger variant="outline" size="md">
        <HugeiconsIcon icon={Send} size={13} />
        Share
        <HugeiconsIcon icon={ChevronDown} size={11} class="text-foreground-muted" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="min-w-[14rem]">
        <DropdownMenu.Label>Workspace</DropdownMenu.Label>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={User} size={13} />
                Invite collaborator
            </span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={Copy2} size={13} />
                Copy link
            </span>
            <Kbd shortcut="shift+cmd+C" />
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Label>Public</DropdownMenu.Label>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={EyeOff} size={13} />
                Make private
            </span>
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>
