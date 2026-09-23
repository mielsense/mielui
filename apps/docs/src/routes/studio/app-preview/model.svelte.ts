import { toast } from '@mielui/svelte/components/toast';
import { type Invoice, type InvoiceStatus, initialInvoices } from './data';

type Notification = {
    id: string;
    title: string;
    detail: string;
    read: boolean;
};

export class AppPreviewModel {
    studioView = $state('invoices');
    dashboardRange = $state('30d');
    invoices = $state<Invoice[]>(initialInvoices.map((invoice) => ({ ...invoice })));
    invoiceModalOpen = $state(false);
    newInvoiceCustomer = $state('');
    newInvoiceNotes = $state('');
    autoReconcile = $state(true);
    reminderCadence = $state('weekly');
    reminderDays = $state(3);
    companyName = $state('Northstar Ledger');
    notifications = $state<Notification[]>([
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
    commandOpen = $state(false);
    settingsSections = $state<string[]>(['workspace', 'reminders']);
    #query = $state('');
    #status = $state('all');
    #alive = true;

    visibleInvoices = $derived.by(() => {
        const query = this.#query.trim().toLowerCase();
        return this.invoices.filter((invoice) => {
            const matchesQuery =
                query === '' ||
                invoice.client.toLowerCase().includes(query) ||
                invoice.reference.toLowerCase().includes(query);
            const matchesStatus =
                this.#status === 'all' ||
                (this.#status === 'open' && invoice.status !== 'Paid') ||
                invoice.status.toLowerCase() === this.#status;
            return matchesQuery && matchesStatus;
        });
    });
    unreadNotificationCount = $derived(
        this.notifications.filter((notification) => !notification.read).length
    );
    overdueInvoices = $derived(this.invoices.filter((invoice) => invoice.status === 'Overdue'));
    overdueCount = $derived(this.overdueInvoices.length);
    outstandingTotal = $derived(
        this.invoices.reduce((sum, invoice) => {
            return invoice.status === 'Paid'
                ? sum
                : sum + Number.parseFloat(invoice.amount.replace(/[$,]/g, ''));
        }, 0)
    );
    coverageValue = $derived(
        this.dashboardRange === '7d' ? 54 : this.dashboardRange === 'Quarter' ? 81 : 72
    );
    readonly collectionSteps = [
        { id: 'scan', label: 'Scan overdue', meta: 'Open invoices' },
        { id: 'remind', label: 'Send reminders', meta: 'Today' },
        { id: 'collect', label: 'Record payments' },
        { id: 'reconcile', label: 'Reconcile' }
    ];
    collectionStep = $derived(this.autoReconcile ? 2 : 1);

    get invoiceQuery() {
        return this.#query;
    }

    set invoiceQuery(value: string) {
        this.#query = value;
    }

    get invoiceStatus() {
        return this.#status;
    }

    set invoiceStatus(value: string) {
        this.#status = value;
    }

    runDashboardAction = (
        title: string,
        description: string,
        type: 'success' | 'error' = 'success'
    ) => {
        if (this.#alive) {
            toast({ title, description, type, duration: 1800 });
        }
    };

    invoiceBadgeVariant(status: InvoiceStatus): 'success' | 'error' | 'warning' | 'secondary' {
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

    markInvoicePaid = (reference: string) => {
        this.invoices = this.invoices.map((invoice) => {
            return invoice.reference === reference ? { ...invoice, status: 'Paid' } : invoice;
        });
        this.runDashboardAction('Payment recorded', `${reference} is marked paid.`);
    };

    createInvoice = (event: MouseEvent) => {
        const client = this.newInvoiceCustomer.trim();
        if (client === '') {
            event.preventDefault();
            this.runDashboardAction(
                'Customer is required',
                'Add a customer name to draft the invoice.',
                'error'
            );
            return;
        }
        const reference = `INV-${2300 + this.invoices.length}`;
        const words = client.split(/\s+/);
        const initials = words
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
        this.invoices = [
            {
                client,
                initials,
                reference,
                due: 'Sep 30',
                amount: '$0',
                status: 'Draft',
                notes: this.newInvoiceNotes.trim()
            },
            ...this.invoices
        ];
        this.newInvoiceCustomer = '';
        this.newInvoiceNotes = '';
        this.invoiceModalOpen = false;
        this.studioView = 'invoices';
        this.invoiceQuery = '';
        this.invoiceStatus = 'all';
        this.runDashboardAction('Invoice drafted', `${reference} is in the queue.`);
    };

    markNotificationRead = (id: string) => {
        this.notifications = this.notifications.map((notification) => {
            return notification.id === id ? { ...notification, read: true } : notification;
        });
    };

    copyInvoiceNumber = async (reference: string) => {
        try {
            await navigator.clipboard.writeText(reference);
            this.runDashboardAction('Invoice number copied', reference);
        } catch {
            this.runDashboardAction(
                'Copy unavailable',
                'Clipboard access is unavailable.',
                'error'
            );
        }
    };

    showInvoice = (reference: string) => {
        this.studioView = 'invoices';
        this.invoiceStatus = 'all';
        this.invoiceQuery = reference;
    };

    destroy() {
        this.#alive = false;
    }
}
