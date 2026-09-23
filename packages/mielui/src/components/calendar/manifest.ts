import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'calendar',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Composable single-date calendar with localized keyboard navigation and month/year controls.',
    files: [
        'components/calendar/calendar-cell.svelte',
        'components/calendar/calendar-day.svelte',
        'components/calendar/calendar-grid-body.svelte',
        'components/calendar/calendar-grid-head.svelte',
        'components/calendar/calendar-grid-row.svelte',
        'components/calendar/calendar-grid.svelte',
        'components/calendar/calendar-head-cell.svelte',
        'components/calendar/calendar-header.svelte',
        'components/calendar/calendar-heading.svelte',
        'components/calendar/calendar-month-select.svelte',
        'components/calendar/calendar-month.svelte',
        'components/calendar/calendar-next-button.svelte',
        'components/calendar/calendar-prev-button.svelte',
        'components/calendar/calendar-year-select.svelte',
        'components/calendar/calendar.svelte',
        'components/calendar/index.ts',
        'components/calendar/manifest.ts'
    ],
    components: ['_internal/utils', 'button'],
    shared: ['utils.cn', 'hugeicons-icon'],
    peerDependencies: {
        'bits-ui': '^2.19.2',
        '@internationalized/date': '^3.12.0',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};
