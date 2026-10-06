import type { FileDiffLine } from '@mielui/svelte/components/file-diff';

export type AgentThread = {
    id: string;
    title: string;
    repo: string;
    age: string;
    day: 'Today' | 'Yesterday';
    branch: string;
    prompt: string;
    research: {
        summary: string;
        duration: string;
    };
    approach: string;
    diff: {
        file: string;
        lines: FileDiffLine[];
    };
    work: {
        summary: string;
        duration: string;
    };
    result: string;
    changes: {
        file: string;
        added: number;
        removed: number;
    }[];
    checks: {
        id: string;
        label: string;
        meta?: string;
    }[];
};

export const threads: AgentThread[] = [
    {
        id: 'rate-limit',
        title: 'Rate-limit the public API',
        repo: 'northwind/api',
        age: '2m',
        day: 'Today',
        branch: 'feat/rate-limit',
        prompt: 'Add per-key rate limits to the public API. 100 requests a minute, and return a proper 429 when a client goes over.',
        research: {
            summary: 'Searched twice, read 3 files',
            duration: '1.9s'
        },
        approach:
            'Every request passes through `authenticate`, so the limiter sits right after it and keys on the API key. It uses a sliding window in Redis, so a client cannot burst across a minute boundary.',
        diff: {
            file: 'src/app.ts',
            lines: [
                {
                    type: 'context',
                    oldLineNumber: 9,
                    newLineNumber: 9,
                    content: '  .use(authenticate)'
                },
                {
                    type: 'add',
                    newLineNumber: 10,
                    content: '  .use(rateLimit({ limit: 100, window: "1m" }))'
                },
                {
                    type: 'remove',
                    oldLineNumber: 10,
                    content: '  .route("/v1", routes);'
                },
                {
                    type: 'add',
                    newLineNumber: 11,
                    content: '  .route("/v1", routes)'
                },
                {
                    type: 'add',
                    newLineNumber: 12,
                    content: '  .onError(rateLimitErrors);'
                }
            ]
        },
        work: {
            summary: 'Created 2 files, ran 1 command',
            duration: '3.2s'
        },
        result: 'Each API key now gets **100 requests per minute**. Over the limit, the API returns `429` and tells the client when to retry.\n\n`pnpm test api` passes, including 4 new limiter tests.',
        changes: [
            { file: 'src/middleware/rate-limit.ts', added: 52, removed: 0 },
            { file: 'src/app.ts', added: 3, removed: 1 },
            { file: 'test/rate-limit.test.ts', added: 64, removed: 0 }
        ],
        checks: [
            { id: 'types', label: 'Typecheck', meta: '6.2s' },
            { id: 'tests', label: 'Unit tests', meta: '18 passed' },
            { id: 'preview', label: 'Preview deploy', meta: '41s' }
        ]
    },
    {
        id: 'flaky-invoice',
        title: 'Fix the flaky invoice test',
        repo: 'northwind/api',
        age: '1h',
        day: 'Today',
        branch: 'fix/invoice-test-clock',
        prompt: 'The invoice due-date test fails about once a week on CI. Find out why and make it stable.',
        research: {
            summary: 'Read 2 files, ran the test 40 times',
            duration: '12s'
        },
        approach:
            'The test builds its invoice with `new Date()`, so it fails whenever CI runs it within a second of midnight UTC. Freezing the clock removes the race.',
        diff: {
            file: 'test/invoice.test.ts',
            lines: [
                {
                    type: 'context',
                    oldLineNumber: 21,
                    newLineNumber: 21,
                    content: 'test("is due in 30 days", () => {'
                },
                {
                    type: 'remove',
                    oldLineNumber: 22,
                    content: '  const invoice = createInvoice(new Date());'
                },
                {
                    type: 'add',
                    newLineNumber: 22,
                    content: '  vi.setSystemTime("2026-03-01T12:00:00Z");'
                },
                {
                    type: 'add',
                    newLineNumber: 23,
                    content: '  const invoice = createInvoice(new Date());'
                },
                {
                    type: 'context',
                    oldLineNumber: 23,
                    newLineNumber: 24,
                    content: '  expect(invoice.dueOn).toBe("2026-03-31");'
                }
            ]
        },
        work: {
            summary: 'Edited 1 file, ran 1 command',
            duration: '2.1s'
        },
        result: 'The test now runs against a **fixed clock**. It passed 500 runs in a row, where it used to fail roughly once in 300.',
        changes: [{ file: 'test/invoice.test.ts', added: 2, removed: 1 }],
        checks: [
            { id: 'types', label: 'Typecheck', meta: '5.8s' },
            { id: 'tests', label: 'Unit tests', meta: '14 passed' },
            { id: 'preview', label: 'Preview deploy', meta: '38s' }
        ]
    },
    {
        id: 'audit-csv',
        title: 'Export the audit log as CSV',
        repo: 'northwind/web',
        age: '1d',
        day: 'Yesterday',
        branch: 'feat/audit-csv',
        prompt: 'Admins want to download the audit log as a CSV from the settings page.',
        research: {
            summary: 'Searched once, read 4 files',
            duration: '2.4s'
        },
        approach:
            'The audit table already loads through `listAuditEvents`, so the export streams the same query as CSV instead of building the file in memory.',
        diff: {
            file: 'src/routes/audit/export.ts',
            lines: [
                {
                    type: 'add',
                    newLineNumber: 1,
                    content: 'export async function GET({ locals }) {'
                },
                {
                    type: 'add',
                    newLineNumber: 2,
                    content: '  const events = listAuditEvents(locals.team);'
                },
                {
                    type: 'add',
                    newLineNumber: 3,
                    content: '  return csvResponse(events, "audit-log.csv");'
                },
                {
                    type: 'add',
                    newLineNumber: 4,
                    content: '}'
                }
            ]
        },
        work: {
            summary: 'Created 2 files, edited 1',
            duration: '4.0s'
        },
        result: 'Settings has a **Download CSV** button beside the audit filters. The export respects the active filters and streams, so large logs do not time out.',
        changes: [
            { file: 'src/routes/audit/export.ts', added: 18, removed: 0 },
            { file: 'src/lib/csv.ts', added: 31, removed: 0 },
            { file: 'src/routes/audit/+page.svelte', added: 6, removed: 0 }
        ],
        checks: [
            { id: 'types', label: 'Typecheck', meta: '7.0s' },
            { id: 'tests', label: 'Unit tests', meta: '22 passed' },
            { id: 'preview', label: 'Preview deploy', meta: '44s' }
        ]
    },
    {
        id: 'onboarding-copy',
        title: 'Tighten the onboarding copy',
        repo: 'northwind/web',
        age: '1d',
        day: 'Yesterday',
        branch: 'chore/onboarding-copy',
        prompt: 'The first onboarding step reads like a legal notice. Make it shorter and friendlier.',
        research: {
            summary: 'Read 1 file',
            duration: '0.6s'
        },
        approach:
            'The step repeats the same promise three times. One sentence that says what happens next does the job, and `Continue` already names the action.',
        diff: {
            file: 'src/routes/welcome/+page.svelte',
            lines: [
                {
                    type: 'remove',
                    oldLineNumber: 14,
                    content: '<h1>Welcome to your new Northwind workspace account</h1>'
                },
                {
                    type: 'add',
                    newLineNumber: 14,
                    content: '<h1>Welcome to Northwind</h1>'
                },
                {
                    type: 'remove',
                    oldLineNumber: 15,
                    content: '<p>Before you can begin, please complete the following steps.</p>'
                },
                {
                    type: 'add',
                    newLineNumber: 15,
                    content: '<p>Two quick questions, then you are in.</p>'
                }
            ]
        },
        work: {
            summary: 'Edited 1 file',
            duration: '0.9s'
        },
        result: 'The first step went from **41 words to 9**. Nothing about the flow changed, only the text.',
        changes: [{ file: 'src/routes/welcome/+page.svelte', added: 2, removed: 2 }],
        checks: [
            { id: 'types', label: 'Typecheck', meta: '6.6s' },
            { id: 'tests', label: 'Unit tests', meta: '9 passed' },
            { id: 'preview', label: 'Preview deploy', meta: '36s' }
        ]
    }
];
