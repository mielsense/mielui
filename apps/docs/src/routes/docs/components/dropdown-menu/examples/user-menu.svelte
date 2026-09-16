<script lang="ts">
    import ChevronDown from '@hugeicons/core-free-icons/ArrowDown01Icon';
    import CreditCard from '@hugeicons/core-free-icons/CreditCardIcon';
    import Folder from '@hugeicons/core-free-icons/FolderGitTwoIcon';
    import HelpCircle from '@hugeicons/core-free-icons/HelpCircleIcon';
    import LogOut from '@hugeicons/core-free-icons/Logout01Icon';
    import Settings from '@hugeicons/core-free-icons/Settings01Icon';
    import User from '@hugeicons/core-free-icons/UserIcon';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger variant="outline" size="md">
        <HugeiconsIcon icon={User} size={13} />
        mielsense
        <HugeiconsIcon icon={ChevronDown} size={11} class="text-foreground-muted" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="min-w-[14rem]">
        <DropdownMenu.Label>Account</DropdownMenu.Label>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={User} size={13} />
                Profile
            </span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={Folder} size={13} />
                Your projects
            </span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={CreditCard} size={13} />
                Billing
            </span>
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Label>Settings</DropdownMenu.Label>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={Settings} size={13} />
                Preferences
            </span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={HelpCircle} size={13} />
                Help &amp; support
            </span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={LogOut} size={13} />
                Log out
            </span>
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>
