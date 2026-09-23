export type InvoiceStatus = 'Paid' | 'Due soon' | 'Overdue' | 'Sent' | 'Draft';
export type Invoice = {
    client: string;
    initials: string;
    reference: string;
    due: string;
    amount: string;
    status: InvoiceStatus;
    notes?: string;
};
export const initialInvoices: Invoice[] = [
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
