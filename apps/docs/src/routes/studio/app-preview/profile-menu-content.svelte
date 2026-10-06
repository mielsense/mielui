<script lang="ts">
    import {
        CreditCardIcon as CreditCard,
        LifebuoyIcon as LifeBuoy,
        Logout01Icon as LogOut,
        Settings01Icon as Settings,
        UserIcon as User
    } from '@hugeicons/core-free-icons';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { AppPreviewModel } from './model.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<!--
    @component
    The account menu items, shared by the sidebar and the compact header.
-->

<DropdownMenu.Content class="min-w-[16rem]">
    <DropdownMenu.Label>avery@northstar.dev</DropdownMenu.Label>
    <DropdownMenu.Item
        callback={() => {
    model.studioView = 'settings';
}}
    >
        <span class="flex items-center gap-2">
            <HugeiconsIcon icon={User} size={13} />
            Profile
        </span>
        <Kbd shortcut="shift+cmd+P" />
    </DropdownMenu.Item>
    <DropdownMenu.Item
        callback={() => {
    model.studioView = 'settings';
}}
    >
        <span class="flex items-center gap-2">
            <HugeiconsIcon icon={Settings} size={13} />
            Preferences
        </span>
        <Kbd shortcut="cmd+," />
    </DropdownMenu.Item>
    <DropdownMenu.Item
        callback={() => {
                model.runDashboardAction(
                        'Billing opened',
                        'The billing portal is on its way.'
                    );
            }}
    >
        <span class="flex items-center gap-2">
            <HugeiconsIcon icon={CreditCard} size={13} />
            Billing
        </span>
        <Kbd shortcut="cmd+B" />
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item
        callback={() => {
                model.runDashboardAction(
                        'Support pinged',
                        'We will follow up shortly.'
                    );
            }}
    >
        <span class="flex items-center gap-2">
            <HugeiconsIcon icon={LifeBuoy} size={13} />
            Help & feedback
        </span>
    </DropdownMenu.Item>
    <DropdownMenu.Item
        callback={() => {
                model.runDashboardAction('Signed out', 'The session ended.');
            }}
    >
        <span class="flex items-center gap-2 text-[var(--mielui-error-text)]">
            <HugeiconsIcon icon={LogOut} size={13} />
            Sign out
        </span>
        <Kbd shortcut="shift+cmd+Q" />
    </DropdownMenu.Item>
</DropdownMenu.Content>
