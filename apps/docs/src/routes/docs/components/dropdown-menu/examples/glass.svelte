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
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let section = $state('Profile');
    const descriptions: Record<string, string> = {
        Profile: 'Alex Morgan · alex@example.com',
        Billing: 'Team plan · Next invoice October 1',
        Settings: 'Email notifications enabled',
        'Help & feedback': 'Contact your workspace owner for help.',
        'Sign out': 'Signed out of this preview.'
    };
    function selectSection(value: string) {
        section = value;
    }
</script>

<div class="flex flex-col items-center gap-3">
    <DropdownMenu.Root>
        <DropdownMenu.Trigger variant="outline" size="md">
            My account
            <HugeiconsIcon icon={ChevronDown} size={16} class="text-foreground-muted" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content surface="glass" class="min-w-[16rem]">
            <DropdownMenu.Label>
                <span class="text-xs text-foreground-muted">alex@example.com</span>
            </DropdownMenu.Label>
            <DropdownMenu.Item callback={() => selectSection('Profile')}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={User} size={13} />
                    Profile
                </span>
            </DropdownMenu.Item>
            <DropdownMenu.Item callback={() => selectSection('Billing')}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={CreditCard} size={13} />
                    Billing
                </span>
            </DropdownMenu.Item>
            <DropdownMenu.Item callback={() => selectSection('Settings')}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Settings} size={13} />
                    Settings
                </span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item callback={() => selectSection('Help & feedback')}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={LifeBuoy} size={13} />
                    Help & feedback
                </span>
            </DropdownMenu.Item>
            <DropdownMenu.Item callback={() => selectSection('Sign out')}>
                <span class="flex items-center gap-2 text-[var(--color-error)]">
                    <HugeiconsIcon icon={LogOut} size={13} />
                    Sign out
                </span>
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>

    <p role="status" class="text-sm text-foreground-muted">{descriptions[section]}</p>
</div>
