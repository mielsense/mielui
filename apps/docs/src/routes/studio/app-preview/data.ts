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
    },
    {
        client: 'Cedar Architecture',
        initials: 'CA',
        reference: 'INV-2240',
        due: 'Sep 05',
        amount: '$8,250',
        status: 'Paid'
    },
    {
        client: 'Saffron Kitchen',
        initials: 'SK',
        reference: 'INV-2239',
        due: 'Sep 09',
        amount: '$1,840',
        status: 'Paid'
    },
    {
        client: 'Common Ground',
        initials: 'CG',
        reference: 'INV-2238',
        due: 'Sep 16',
        amount: '$12,600',
        status: 'Sent'
    },
    {
        client: 'Morrow Design',
        initials: 'MD',
        reference: 'INV-2237',
        due: 'Sep 20',
        amount: '$4,350',
        status: 'Due soon'
    },
    {
        client: 'Paper Trail',
        initials: 'PT',
        reference: 'INV-2236',
        due: 'Aug 25',
        amount: '$2,190',
        status: 'Overdue'
    },
    {
        client: 'Atlas Engineering',
        initials: 'AE',
        reference: 'INV-2235',
        due: 'Sep 23',
        amount: '$18,900',
        status: 'Sent'
    },
    {
        client: 'Juniper Coffee',
        initials: 'JC',
        reference: 'INV-2234',
        due: 'Sep 27',
        amount: '$960',
        status: 'Draft'
    },
    {
        client: 'Coastline Supply',
        initials: 'CS',
        reference: 'INV-2233',
        due: 'Sep 08',
        amount: '$7,430',
        status: 'Paid'
    },
    {
        client: 'Brightside Films',
        initials: 'BF',
        reference: 'INV-2232',
        due: 'Sep 29',
        amount: '$11,200',
        status: 'Due soon'
    },
    {
        client: 'Orchard Market',
        initials: 'OM',
        reference: 'INV-2231',
        due: 'Sep 13',
        amount: '$3,670',
        status: 'Paid'
    },
    {
        client: 'Summit Research',
        initials: 'SR',
        reference: 'INV-2230',
        due: 'Aug 30',
        amount: '$15,400',
        status: 'Overdue'
    },
    {
        client: 'Willow Textiles',
        initials: 'WT',
        reference: 'INV-2229',
        due: 'Sep 26',
        amount: '$5,280',
        status: 'Sent'
    },
    {
        client: 'Hearth Ceramics',
        initials: 'HC',
        reference: 'INV-2228',
        due: 'Sep 30',
        amount: '$1,475',
        status: 'Draft'
    },
    {
        client: 'Open Field',
        initials: 'OF',
        reference: 'INV-2227',
        due: 'Sep 19',
        amount: '$6,200',
        status: 'Paid'
    },
    {
        client: 'Saltwater Studio',
        initials: 'SS',
        reference: 'INV-2226',
        due: 'Sep 25',
        amount: '$8,900',
        status: 'Sent'
    },
    {
        client: 'Elm Street Books',
        initials: 'EB',
        reference: 'INV-2225',
        due: 'Sep 28',
        amount: '$2,340',
        status: 'Due soon'
    }
];
