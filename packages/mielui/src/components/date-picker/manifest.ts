import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'date-picker',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Segmented date field and calendar popup with locale, validation, and form support.',
    files: [
        'components/date-picker/context.svelte.ts',
        'components/date-picker/date-picker-calendar.svelte',
        'components/date-picker/date-picker-content.svelte',
        'components/date-picker/date-picker-input.svelte',
        'components/date-picker/date-picker-form-field.svelte',
        'components/date-picker/date-picker-label.svelte',
        'components/date-picker/date-picker-segment.svelte',
        'components/date-picker/date-picker-trigger.svelte',
        'components/date-picker/date-picker.svelte',
        'components/date-picker/index.ts',
        'components/date-picker/manifest.ts'
    ],
    components: ['_internal/utils', 'calendar', 'button', 'input'],
    shared: [
        'utils.cn',
        'utils.createContext',
        'hugeicons-icon',
        'components/_internal/surface',
        'transition'
    ],
    peerDependencies: {
        'bits-ui': '^2.19.2',
        '@internationalized/date': '^3.12.0',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};
