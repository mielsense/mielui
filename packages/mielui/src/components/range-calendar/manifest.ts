import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'range-calendar',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Composable date-range calendar with shared calendar parts and range highlighting.',
    files: [
        'components/range-calendar/index.ts',
        'components/range-calendar/range-calendar-cell.svelte',
        'components/range-calendar/range-calendar-day.svelte',
        'components/range-calendar/range-calendar-month.svelte',
        'components/range-calendar/range-calendar.svelte',
        'components/range-calendar/manifest.ts'
    ],
    components: ['_internal/utils', 'calendar'],
    shared: ['utils.cn'],
    peerDependencies: {
        'bits-ui': '^2.19.2',
        '@internationalized/date': '^3.12.0',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.33.0'
    }
};
