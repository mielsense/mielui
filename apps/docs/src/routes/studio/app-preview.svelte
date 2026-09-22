<script lang="ts">
    import {
        Notification03Icon as Bell,
        ArrowDown01Icon as ChevronDown,
        CreditCardIcon as CreditCard,
        File01Icon as FileText,
        LayoutDashboardIcon as LayoutDashboard,
        LifebuoyIcon as LifeBuoy,
        Logout01Icon as LogOut,
        MoreHorizontalIcon as MoreHorizontal,
        Add01Icon as Plus,
        Search01Icon as Search,
        Settings01Icon as Settings,
        UserIcon as User
    } from '@hugeicons/core-free-icons';
    import * as Accordion from '@mielui/svelte/components/accordion';
    import * as Avatar from '@mielui/svelte/components/avatar';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as Command from '@mielui/svelte/components/command';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import Kbd from '@mielui/svelte/components/kbd';
    import { Pagination } from '@mielui/svelte/components/pagination';
    import * as Popover from '@mielui/svelte/components/popover';
    import * as RadioGroup from '@mielui/svelte/components/radio-group';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Table from '@mielui/svelte/components/table';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { TaskSteps } from '@mielui/svelte/components/task-steps';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import { toast } from '@mielui/svelte/components/toast';
    import { Toolbar } from '@mielui/svelte/components/toolbar';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    type InvoiceStatus = 'Paid' | 'Due soon' | 'Overdue' | 'Sent' | 'Draft';
    type Invoice = {
        client: string;
        initials: string;
        reference: string;
        due: string;
        amount: string;
        status: InvoiceStatus;
    };
    const INVOICE_PAGE_SIZE = 4;
    const initialInvoices: Invoice[] = [
        {
            client: 'Northwind Trading',
            initials: 'NT',
            reference: 'INV-2291',
            due: 'Sep 12',
            amount: '$12,400',
            status: 'Paid'
        },
        {
            client: 'Halcyon Studio',
            initials: 'HS',
            reference: 'INV-2288',
            due: 'Sep 14',
            amount: '$3,150',
            status: 'Due soon'
        },
        {
            client: 'Kestrel Logistics',
            initials: 'KL',
            reference: 'INV-2279',
            due: 'Aug 28',
            amount: '$9,860',
            status: 'Overdue'
        },
        {
            client: 'Mercury Goods',
            initials: 'MG',
            reference: 'INV-2274',
            due: 'Sep 18',
            amount: '$6,720',
            status: 'Sent'
        },
        {
            client: 'Assembly Works',
            initials: 'AW',
            reference: 'INV-2268',
            due: 'Sep 21',
            amount: '$4,280',
            status: 'Draft'
        },
        {
            client: 'Riverline Press',
            initials: 'RP',
            reference: 'INV-2261',
            due: 'Sep 24',
            amount: '$2,940',
            status: 'Sent'
        },
        {
            client: 'Oak & Pine',
            initials: 'OP',
            reference: 'INV-2254',
            due: 'Aug 19',
            amount: '$7,110',
            status: 'Overdue'
        },
        {
            client: 'Fieldwork Labs',
            initials: 'FL',
            reference: 'INV-2248',
            due: 'Sep 28',
            amount: '$5,600',
            status: 'Due soon'
        }
    ];
    let studioView = $state('invoices');
    let dashboardRange = $state('30d');
    let invoices = $state<Invoice[]>(initialInvoices.map((invoice) => ({ ...invoice })));
    let invoiceQuery = $state('');
    let invoiceStatus = $state('all');
    let invoicePage = $state(1);
    let invoiceModalOpen = $state(false);
    let newInvoiceCustomer = $state('');
    let newInvoiceNotes = $state('');
    let autoReconcile = $state(true);
    let reminderCadence = $state('weekly');
    let reminderDays = $state(3);
    let companyName = $state('Northstar Ledger');
    let selectedInvoices = $state<Record<string, boolean>>(
        Object.fromEntries(initialInvoices.map((invoice) => [invoice.reference, false]))
    );
    let notifications = $state([
        {
            id: 'overdue',
            title: 'Kestrel Logistics is overdue',
            detail: '$9,860 · INV-2279',
            read: false
        },
        {
            id: 'viewed',
            title: 'Halcyon Studio viewed INV-2288',
            detail: '14 minutes ago',
            read: false
        },
        {
            id: 'paid',
            title: 'Northwind Trading paid INV-2291',
            detail: '$12,400 received',
            read: true
        }
    ]);
    let commandOpen = $state(false);
    let settingsSections = $state<string[]>(['workspace', 'reminders']);
    const visibleInvoices = $derived(
        invoices.filter((invoice) => {
            const query = invoiceQuery.trim().toLowerCase();
            const matchesQuery =
                query === '' ||
                invoice.client.toLowerCase().includes(query) ||
                invoice.reference.toLowerCase().includes(query);
            const matchesStatus =
                invoiceStatus === 'all' ||
                (invoiceStatus === 'open' && invoice.status !== 'Paid') ||
                invoice.status.toLowerCase() === invoiceStatus;

            return matchesQuery && matchesStatus;
        })
    );
    const invoicePageCount = $derived(
        Math.max(1, Math.ceil(visibleInvoices.length / INVOICE_PAGE_SIZE))
    );
    const pagedInvoices = $derived(
        visibleInvoices.slice(
            (invoicePage - 1) * INVOICE_PAGE_SIZE,
            invoicePage * INVOICE_PAGE_SIZE
        )
    );
    const allVisibleSelected = $derived(
        pagedInvoices.length > 0 &&
            pagedInvoices.every((invoice) => selectedInvoices[invoice.reference])
    );
    const unreadNotificationCount = $derived(
        notifications.filter((notification) => !notification.read).length
    );
    const overdueCount = $derived(
        invoices.filter((invoice) => invoice.status === 'Overdue').length
    );
    const outstandingTotal = $derived(
        invoices
            .filter((invoice) => invoice.status !== 'Paid')
            .reduce(
                (sum, invoice) => sum + Number.parseFloat(invoice.amount.replace(/[$,]/g, '')),
                0
            )
    );
    const coverageValue = $derived(
        dashboardRange === '7d' ? 54 : dashboardRange === 'Quarter' ? 81 : 72
    );
    const collectionSteps = [
        { id: 'scan', label: 'Scan overdue', meta: 'Open invoices' },
        { id: 'remind', label: 'Send reminders', meta: 'Today' },
        { id: 'collect', label: 'Record payments' },
        { id: 'reconcile', label: 'Reconcile' }
    ];
    const collectionStep = $derived(autoReconcile ? 2 : 1);

    function runDashboardAction(
        title: string,
        description: string,
        type: 'success' | 'error' = 'success'
    ) {
        toast({ title, description, type, duration: 1800 });
    }

    function invoiceBadgeVariant(status: InvoiceStatus) {
        if (status === 'Paid') {
            return 'success';
        }
        if (status === 'Overdue') {
            return 'error';
        }
        if (status === 'Due soon') {
            return 'warning';
        }
        return 'secondary';
    }

    function toggleSelectAll(next: boolean) {
        for (const invoice of pagedInvoices) {
            selectedInvoices[invoice.reference] = next;
        }
    }

    function markInvoicePaid(reference: string) {
        invoices = invoices.map((invoice) =>
            invoice.reference === reference ? { ...invoice, status: 'Paid' } : invoice
        );
        runDashboardAction('Payment recorded', `${reference} is marked paid.`);
    }

    function createInvoice() {
        const client = newInvoiceCustomer.trim();
        if (client === '') {
            runDashboardAction(
                'Customer is required',
                'Add a customer name to draft the invoice.',
                'error'
            );
            invoiceModalOpen = true;
            return;
        }

        const nextNumber = 2300 + invoices.length;
        const reference = `INV-${nextNumber}`;
        const initials = client
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

        invoices = [
            {
                client,
                initials,
                reference,
                due: 'Sep 30',
                amount: '$0',
                status: 'Draft'
            },
            ...invoices
        ];
        selectedInvoices[reference] = false;
        newInvoiceCustomer = '';
        newInvoiceNotes = '';
        invoiceModalOpen = false;
        studioView = 'invoices';
        invoicePage = 1;
        runDashboardAction('Invoice drafted', `${reference} is in the queue.`);
    }

    function markNotificationRead(id: string) {
        notifications = notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
        );
    }

    $effect(() => {
        invoiceQuery;
        invoiceStatus;
        invoicePage = 1;
    });

    $effect(() => {
        if (invoicePage > invoicePageCount) {
            invoicePage = invoicePageCount;
        }
    });
</script>

<ScrollArea class="h-full min-h-0" showCues={false}>
    <div class="@container flex w-full flex-col gap-6 p-5 @min-[640px]:p-8">
        <Toolbar class="gap-2 p-0">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger variant="quiet" class="min-w-0 justify-start px-0">
                    <Avatar.Root size="sm" shape="square">
                        <Avatar.Fallback>NL</Avatar.Fallback>
                    </Avatar.Root>
                    <Typography.Text variant="supporting" class="truncate text-foreground">
                        {companyName}
                    </Typography.Text>
                    <HugeiconsIcon icon={ChevronDown} size={14} class="text-foreground-muted" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>Workspace</DropdownMenu.Label>
                    <DropdownMenu.Item>Northstar Ledger</DropdownMenu.Item>
                    <DropdownMenu.Item>Personal books</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                        callback={() =>
                                runDashboardAction(
                                    'Workspace created',
                                    'A blank ledger is ready.'
                                )}
                    >
                        Create workspace
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <div class="ml-auto flex items-center gap-1">
                <Popover.Root placement="bottom-end" inert={false}>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Popover.Trigger
                                variant="ghost"
                                size="icon"
                                class="relative"
                                aria-label="Notifications"
                            >
                                <HugeiconsIcon icon={Bell} size={16} />
                                {#if unreadNotificationCount > 0}
                                    <Badge
                                        variant="error"
                                        class="pointer-events-none absolute top-0.5 right-0.5 size-3.5 min-w-3.5 bg-[var(--color-error)] p-0 text-[length:var(--font-size-meta)] text-[var(--color-on-primary)] leading-none"
                                    >
                                        {unreadNotificationCount}
                                    </Badge>
                                {/if}
                            </Popover.Trigger>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Notifications</Tooltip.Content>
                    </Tooltip.Root>
                    <Popover.Content class="w-80" surfaceClass="p-2" lockScroll={false}>
                        <div class="flex items-center justify-between px-2 pt-1 pb-1.5">
                            <Popover.Title class="text-[length:var(--font-size-body)] leading-snug">
                                Notifications
                            </Popover.Title>
                            {#if unreadNotificationCount > 0}
                                <Typography.Metadata class="tabular-nums">
                                    {unreadNotificationCount}
                                    new
                                </Typography.Metadata>
                            {/if}
                        </div>
                        <div class="flex flex-col gap-0.5">
                            {#each notifications as notification (notification.id)}
                                <Button
                                    unstyled
                                    class="flex w-full items-start justify-start gap-3 rounded-[var(--radius-md)] px-2 py-2 text-left select-none transition-[background-color,border-color,color] [transition-duration:var(--motion-duration-hover)] hover:cursor-[var(--ui-cursor-interactive)] hover:bg-foreground/[0.08] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                                    onclick={() => markNotificationRead(notification.id)}
                                >
                                    <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                                        <span
                                            class="w-full text-left text-[length:var(--font-size-body)] leading-snug text-pretty text-foreground {notification.read
                                                    ? 'font-normal'
                                                    : 'font-medium'}"
                                        >
                                            {notification.title}
                                        </span>
                                        <Typography.Metadata class="tabular-nums">
                                            {notification.detail}
                                        </Typography.Metadata>
                                    </span>
                                    {#if !notification.read}
                                        <Badge
                                            variant="secondary"
                                            class="mt-0.5 shrink-0 self-start"
                                        >
                                            New
                                        </Badge>
                                    {/if}
                                </Button>
                            {/each}
                        </div>
                    </Popover.Content>
                </Popover.Root>
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
                            <span class="text-[0.7rem] text-foreground-muted">
                                avery@northstar.dev
                            </span>
                        </DropdownMenu.Label>
                        <DropdownMenu.Item callback={() => (studioView = 'settings')}>
                            <span class="flex items-center gap-2">
                                <HugeiconsIcon icon={User} size={13} />
                                Profile
                            </span>
                            <Kbd shortcut="shift+cmd+P" />
                        </DropdownMenu.Item>
                        <DropdownMenu.Item callback={() => (studioView = 'settings')}>
                            <span class="flex items-center gap-2">
                                <HugeiconsIcon icon={Settings} size={13} />
                                Preferences
                            </span>
                            <Kbd shortcut="cmd+," />
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            callback={() =>
                                    runDashboardAction(
                                        'Billing opened',
                                        'The billing portal is on its way.'
                                    )}
                        >
                            <span class="flex items-center gap-2">
                                <HugeiconsIcon icon={CreditCard} size={13} />
                                Billing
                            </span>
                            <Kbd shortcut="cmd+B" />
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            callback={() =>
                                    runDashboardAction(
                                        'Support pinged',
                                        'We will follow up shortly.'
                                    )}
                        >
                            <span class="flex items-center gap-2">
                                <HugeiconsIcon icon={LifeBuoy} size={13} />
                                Help & feedback
                            </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            callback={() =>
                                    runDashboardAction('Signed out', 'The session ended.')}
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

        <Tabs.Root bind:value={studioView} variant="segmented">
            <div class="flex flex-wrap items-center gap-2">
                <Tabs.List>
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="invoices">Invoices</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                </Tabs.List>
                <Command.Root bind:open={commandOpen}>
                    <Command.Trigger
                        variant="outline"
                        class="ml-auto min-w-0 w-52 shrink-0 justify-between gap-2"
                    >
                        <span class="flex min-w-0 items-center gap-2">
                            <HugeiconsIcon icon={Search} size={14} />
                            <span class="truncate">Search</span>
                        </span>
                        <Kbd
                            shortcut="cmd+k"
                            class="shrink-0"
                            ontrigger={() => {
                                    commandOpen = true;
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
                                            studioView = 'overview';
                                        }}
                                >
                                    <HugeiconsIcon icon={LayoutDashboard} size={14} />
                                    Overview
                                </Command.Item>
                                <Command.Item
                                    name="Invoices"
                                    callback={() => {
                                            studioView = 'invoices';
                                        }}
                                >
                                    <HugeiconsIcon icon={FileText} size={14} />
                                    Invoices
                                </Command.Item>
                                <Command.Item
                                    name="Settings"
                                    callback={() => {
                                            studioView = 'settings';
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
                                            studioView = 'invoices';
                                            invoiceModalOpen = true;
                                        }}
                                >
                                    <HugeiconsIcon icon={Plus} size={14} />
                                    New invoice
                                </Command.Item>
                            </Command.Group>
                            <Command.Group heading="Invoices">
                                {#each invoices as invoice (invoice.reference)}
                                    <Command.Item
                                        name={`${invoice.client} ${invoice.reference}`}
                                        callback={() => {
                                                studioView = 'invoices';
                                                invoiceQuery = invoice.reference;
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

            <Tabs.Content value="overview" class="flex flex-col gap-8 pt-6">
                <div class="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <Typography.Title level={1}>Collection overview</Typography.Title>
                        <Typography.Description>
                            Track unpaid invoices and upcoming collections.
                        </Typography.Description>
                    </div>
                    <Tabs.Root bind:value={dashboardRange} variant="segmented">
                        <Tabs.List>
                            <Tabs.Trigger value="7d">7 days</Tabs.Trigger>
                            <Tabs.Trigger value="30d">30 days</Tabs.Trigger>
                            <Tabs.Trigger value="Quarter">Quarter</Tabs.Trigger>
                        </Tabs.List>
                    </Tabs.Root>
                </div>
                <dl class="grid grid-cols-2 gap-6 border-y border-border py-6 @2xl:grid-cols-3">
                    <div>
                        <dt class="text-sm text-foreground-muted">Outstanding</dt>
                        <dd class="mt-2 text-2xl font-semibold tabular-nums">
                            ${outstandingTotal.toLocaleString('en-US')}
                        </dd>
                    </div>
                    <div>
                        <dt class="text-sm text-foreground-muted">Overdue invoices</dt>
                        <dd class="mt-2 text-2xl font-semibold tabular-nums">{overdueCount}</dd>
                    </div>
                    <div>
                        <dt class="text-sm text-foreground-muted">Cash coverage</dt>
                        <dd class="mt-2 text-2xl font-semibold tabular-nums">{coverageValue}%</dd>
                    </div>
                </dl>
                <div class="grid gap-8 @2xl:grid-cols-[1fr_18rem]">
                    <section class="min-w-0">
                        <h2 class="mb-4 text-base font-semibold">Needs attention</h2>
                        {#each invoices.filter((invoice) => invoice.status === 'Overdue') as invoice (invoice.reference)}
                            <div
                                class="flex flex-wrap items-center justify-between gap-3 border-b border-border py-4"
                            >
                                <div>
                                    <p class="text-sm font-medium">{invoice.client}</p>
                                    <p class="mt-1 text-sm text-foreground-muted">
                                        {invoice.reference} ·{invoice.amount}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    onclick={() => markInvoicePaid(invoice.reference)}
                                >
                                    Record payment
                                </Button>
                            </div>
                        {:else}
                            <p class="text-sm text-foreground-muted">No overdue invoices.</p>
                        {/each}
                    </section>
                    <section class="flex flex-col gap-5 rounded-[var(--radius-lg)] bg-card p-5">
                        <h2 class="text-base font-semibold">Collection run</h2>
                        <TaskSteps
                            label="Collection run"
                            steps={collectionSteps}
                            current={collectionStep}
                        />
                        <Switch bind:checked={autoReconcile} label="Auto-reconcile" />
                    </section>
                </div>
            </Tabs.Content>

            <Tabs.Content value="invoices" class="flex flex-col gap-6 pt-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <Typography.Title level={1}>Invoices</Typography.Title>
                        <Typography.Description>
                            Review, remind, and record payment.
                        </Typography.Description>
                    </div>
                    <Dialog.Root bind:open={invoiceModalOpen}>
                        <Dialog.Trigger>
                            <HugeiconsIcon icon={Plus} size={15} />
                            New invoice
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>New invoice</Dialog.Title>
                                <Dialog.Description>
                                    Draft a customer invoice. You can add line items later.
                                </Dialog.Description>
                            </Dialog.Header>
                            <Dialog.Body class="gap-4">
                                <Input
                                    bind:value={newInvoiceCustomer}
                                    label="Customer"
                                    placeholder="Studio name"
                                />
                                <Textarea
                                    bind:value={newInvoiceNotes}
                                    label="Notes"
                                    placeholder="Optional context for the draft"
                                    autoresize
                                />
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.Close>
                                    Cancel
                                    <Kbd shortcut="esc" />
                                </Dialog.Close>
                                <Dialog.Confirm onclick={createInvoice}>
                                    Create draft
                                    <Kbd shortcut="enter" />
                                </Dialog.Confirm>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Root>
                </div>
                <Group.Root aria-label="Invoice filters" class="w-full max-w-lg">
                    <Input
                        bind:value={invoiceQuery}
                        aria-label="Search invoices"
                        placeholder="Search customer or invoice…"
                        class="min-w-0 flex-1"
                    />
                    <Group.Separator />
                    <Select.Root bind:value={invoiceStatus}>
                        <Select.Trigger
                            variant="outline"
                            aria-label="Invoice status"
                            class="w-auto shrink-0"
                        >
                            {invoiceStatus === 'all' ? 'All statuses' : invoiceStatus.charAt(0).toUpperCase() + invoiceStatus.slice(1)}
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="all">All statuses</Select.Item>
                            <Select.Item value="open">Open</Select.Item>
                            <Select.Item value="paid">Paid</Select.Item>
                            <Select.Item value="overdue">Overdue</Select.Item>
                        </Select.Content>
                    </Select.Root>
                </Group.Root>
                <Table.ScrollArea class="rounded-[var(--radius-lg)] border border-border">
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.Head class="w-10">
                                    <Checkbox
                                        checked={allVisibleSelected}
                                        aria-label="Select visible invoices"
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </Table.Head>
                                <Table.Head>Customer</Table.Head>
                                <Table.Head>Invoice</Table.Head>
                                <Table.Head>Status</Table.Head>
                                <Table.Head class="text-right">Amount</Table.Head>
                                <Table.Head><span class="sr-only">Actions</span></Table.Head>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {#each pagedInvoices as invoice (invoice.reference)}
                                <Table.Row>
                                    <Table.Cell>
                                        <Checkbox
                                            bind:checked={selectedInvoices[invoice.reference]}
                                            aria-label={`Select ${invoice.reference}`}
                                        />
                                    </Table.Cell>
                                    <Table.Cell class="whitespace-nowrap font-medium">
                                        {invoice.client}
                                        <p class="mt-1 text-xs font-normal text-foreground-muted">
                                            Due{' '}
                                            {invoice.due}
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell class="whitespace-nowrap text-foreground-muted">
                                        {invoice.reference}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge variant={invoiceBadgeVariant(invoice.status)}>
                                            {invoice.status}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell class="text-right tabular-nums">
                                        {invoice.amount}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DropdownMenu.Root>
                                            <Tooltip.Root>
                                                <Tooltip.Trigger>
                                                    <DropdownMenu.Trigger
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label={`Actions for ${invoice.reference}`}
                                                    >
                                                        <HugeiconsIcon
                                                            icon={MoreHorizontal}
                                                            size={16}
                                                        />
                                                    </DropdownMenu.Trigger>
                                                </Tooltip.Trigger>
                                                <Tooltip.Content>Invoice actions</Tooltip.Content>
                                            </Tooltip.Root>
                                            <DropdownMenu.Content>
                                                <DropdownMenu.Item
                                                    disabled={invoice.status === 'Paid'}
                                                    callback={() => markInvoicePaid(invoice.reference)}
                                                >
                                                    Record payment
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Item
                                                    callback={() => navigator.clipboard.writeText(invoice.reference)}
                                                >
                                                    Copy invoice number
                                                </DropdownMenu.Item>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Root>
                                    </Table.Cell>
                                </Table.Row>
                            {:else}
                                <Table.Row>
                                    <Table.Cell
                                        colspan={6}
                                        class="py-12 text-center text-foreground-muted"
                                    >
                                        No invoices match your filters.
                                    </Table.Cell>
                                </Table.Row>
                            {/each}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
                <Toolbar class="p-0">
                    <Typography.Metadata>
                        Showing{' '}
                        {pagedInvoices.length} of{' '}
                        {visibleInvoices.length}
                    </Typography.Metadata>
                    <Pagination bind:page={invoicePage} total={invoicePageCount} />
                </Toolbar>
            </Tabs.Content>

            <Tabs.Content value="settings" class="flex flex-col gap-6 pt-6">
                <div>
                    <Typography.Title level={1}>Settings</Typography.Title>
                    <Typography.Description>
                        Collection defaults for this workspace.
                    </Typography.Description>
                </div>
                <Accordion.Root type="multiple" bind:value={settingsSections}>
                    <Accordion.Item value="workspace">
                        <Accordion.Trigger>Workspace</Accordion.Trigger>
                        <Accordion.Content>
                            <div class="flex flex-col gap-4">
                                <Input bind:value={companyName} label="Workspace name" />
                                <Switch
                                    bind:checked={autoReconcile}
                                    label="Auto-reconcile"
                                    description="Match confirmed bank payments as they arrive."
                                />
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="reminders">
                        <Accordion.Trigger>Reminders</Accordion.Trigger>
                        <Accordion.Content>
                            <div class="flex flex-col gap-4">
                                <RadioGroup.Root
                                    bind:value={reminderCadence}
                                    name="reminder-cadence"
                                >
                                    <RadioGroup.Item
                                        value="off"
                                        label="Off"
                                        description="Send reminders yourself."
                                    />
                                    <RadioGroup.Item
                                        value="weekly"
                                        label="Weekly"
                                        description="Every Monday for open invoices."
                                    />
                                    <RadioGroup.Item
                                        value="due"
                                        label="Before due"
                                        description="Once, a few days before the due date."
                                    />
                                </RadioGroup.Root>
                                {#if reminderCadence === 'due'}
                                    <Slider
                                        bind:value={reminderDays}
                                        min={1}
                                        max={14}
                                        step={1}
                                        label={`Remind ${reminderDays} days before due`}
                                    />
                                {/if}
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </Tabs.Content>
        </Tabs.Root>
    </div>
</ScrollArea>
