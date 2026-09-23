<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        CreditCardIcon as CreditCard,
        LifebuoyIcon as LifeBuoy,
        Logout01Icon as LogOut,
        Settings01Icon as Settings,
        UserIcon as User
    } from '@hugeicons/core-free-icons';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import Kbd from '@mielui/svelte/components/kbd';
    import { Toolbar } from '@mielui/svelte/components/toolbar';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { AppPreviewModel } from './model.svelte';
    import Notifications from './notifications.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<Toolbar
    class="min-h-[var(--docs-row-height)] gap-2 rounded-none border-b-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] px-6 py-2"
>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger variant="quiet" class="min-w-0 justify-start px-0">
            <Avatar.Root size="sm" shape="square">
                <Avatar.Fallback>NL</Avatar.Fallback>
            </Avatar.Root>
            <Typography.Text variant="supporting" class="truncate text-foreground">
                {model.companyName}
            </Typography.Text>
            <HugeiconsIcon icon={ChevronDown} size={14} class="text-foreground-muted" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Label>Workspace</DropdownMenu.Label>
            <DropdownMenu.Item>Northstar Ledger</DropdownMenu.Item>
            <DropdownMenu.Item>Personal books</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
                callback={() => {
                        model.runDashboardAction(
                            'Workspace created',
                            'A blank ledger is ready.'
                        );
                    }}
            >
                Create workspace
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
    <div class="ml-auto flex items-center gap-1">
        <Notifications {model} />
        <DropdownMenu.Root>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <DropdownMenu.Trigger
                        variant="quiet"
                        size="icon"
                        aria-label="Open profile menu"
                    >
                        <Avatar.Root size="sm">
                            <Avatar.Fallback>AN</Avatar.Fallback>
                        </Avatar.Root>
                    </DropdownMenu.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content>Profile menu</Tooltip.Content>
            </Tooltip.Root>
            <DropdownMenu.Content class="min-w-[16rem]">
                <DropdownMenu.Label>
                    <span class="text-[0.7rem] text-foreground-muted">avery@northstar.dev</span>
                </DropdownMenu.Label>
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
                    <span class="flex items-center gap-2 text-[var(--color-error)]">
                        <HugeiconsIcon icon={LogOut} size={13} />
                        Sign out
                    </span>
                    <Kbd shortcut="shift+cmd+Q" />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
</Toolbar>
