<script lang="ts">
    import {
        File01Icon as FileText,
        LayoutDashboardIcon as LayoutDashboard,
        Add01Icon as Plus,
        Search01Icon as Search,
        Settings01Icon as Settings
    } from '@hugeicons/core-free-icons';
    import * as Command from '@mielui/svelte/components/command';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { AppPreviewModel } from './model.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<nav aria-label="Ledger" class="order-last w-full @2xl:order-none @2xl:w-auto">
    <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="invoices">Invoices</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
    </Tabs.List>
</nav>
<div class="ml-auto flex items-center">
    <Command.Root bind:open={model.commandOpen}>
        <Command.Trigger
            variant="outline"
            class="w-auto min-w-0 shrink-0 justify-between gap-2"
            aria-label="Search workspace"
        >
            <span class="flex min-w-0 items-center gap-2">
                <HugeiconsIcon icon={Search} size={14} />
                <span class="hidden @xl:inline">Search</span>
            </span>
            <Kbd
                shortcut="cmd+k"
                class="hidden shrink-0 @xl:inline-flex"
                ontrigger={() => {
                        model.commandOpen = true;
                    }}
            />
        </Command.Trigger>
        <Command.Content>
            <Command.Search placeholder="Search ledger…" />
            <Command.Results>
                <Command.Group heading="Go to">
                    <Command.Item
                        name="Overview"
                        callback={() => {
                                model.studioView = 'overview';
                            }}
                    >
                        <HugeiconsIcon icon={LayoutDashboard} size={14} />
                        Overview
                    </Command.Item>
                    <Command.Item
                        name="Invoices"
                        callback={() => {
                                model.studioView = 'invoices';
                            }}
                    >
                        <HugeiconsIcon icon={FileText} size={14} />
                        Invoices
                    </Command.Item>
                    <Command.Item
                        name="Settings"
                        callback={() => {
                                model.studioView = 'settings';
                            }}
                    >
                        <HugeiconsIcon icon={Settings} size={14} />
                        Settings
                    </Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Group heading="Actions">
                    <Command.Item
                        name="New invoice"
                        callback={() => {
                                model.studioView = 'invoices';
                                model.invoiceModalOpen = true;
                            }}
                    >
                        <HugeiconsIcon icon={Plus} size={14} />
                        New invoice
                    </Command.Item>
                </Command.Group>
                <Command.Group heading="Invoices">
                    {#each model.invoices as invoice (invoice.reference)}
                        <Command.Item
                            name={`${invoice.client} ${invoice.reference}`}
                            callback={() => {
                                    model.showInvoice(invoice.reference);
                                }}
                        >
                            {invoice.client}
                            <Typography.Metadata>
                                {invoice.reference}
                            </Typography.Metadata>
                        </Command.Item>
                    {/each}
                </Command.Group>
            </Command.Results>
        </Command.Content>
    </Command.Root>
</div>
