import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'date-range-picker',
    version: '1.0.0',
    visibility: 'public',
    description: 'Segmented start/end date fields and a range calendar popup.',
    files: [
        'components/date-range-picker/date-range-picker-calendar.svelte',
        'components/date-range-picker/date-range-picker-input.svelte',
        'components/date-range-picker/date-range-picker-label.svelte',
        'components/date-range-picker/date-range-picker-trigger.svelte',
        'components/date-range-picker/date-range-picker.svelte',
        'components/date-range-picker/index.ts',
        'components/date-range-picker/manifest.ts'
    ],
    components: ['_internal/utils', 'date-picker', 'range-calendar'],
    shared: ['utils.cn', 'hugeicons-icon'],
    peerDependencies: {
        'bits-ui': '^2.19.2',
        '@internationalized/date': '^3.12.0',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};
