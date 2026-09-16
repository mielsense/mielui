<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        CreditCardIcon as CreditCard,
        LifebuoyIcon as LifeBuoy,
        Logout01Icon as LogOut,
        Settings01Icon as Settings,
        UserIcon as User
    } from '@hugeicons/core-free-icons';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger variant="outline" size="md">
        My Account
        <HugeiconsIcon icon={ChevronDown} size={16} class="text-foreground-muted" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content surface="glass" class="min-w-[16rem]">
        <DropdownMenu.Label>
            <span class="text-[0.7rem] text-foreground-muted">mielsense@ui.miel.my</span>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={User} size={13} />
                Profile
            </span>
            <Kbd shortcut="shift+cmd+P" />
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={CreditCard} size={13} />
                Billing
            </span>
            <Kbd shortcut="cmd+B" />
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={Settings} size={13} />
                Settings
            </span>
            <Kbd shortcut="cmd+," />
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={LifeBuoy} size={13} />
                Help & feedback
            </span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2 text-[var(--color-error)]">
                <HugeiconsIcon icon={LogOut} size={13} />
                Sign out
            </span>
            <Kbd shortcut="shift+cmd+Q" />
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>
