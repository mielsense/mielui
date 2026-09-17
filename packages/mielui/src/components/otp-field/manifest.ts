import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'otp-field',
    version: '1.0.0',
    visibility: 'public',
    description: 'Accessible one-time code input with customizable visual cells.',
    files: [
        'components/otp-field/index.ts',
        'components/otp-field/otp-field-cell.svelte',
        'components/otp-field/otp-field-group.svelte',
        'components/otp-field/otp-field-separator.svelte',
        'components/otp-field/otp-field.svelte',
        'components/otp-field/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn'],
    peerDependencies: {
        svelte: '^5.33.0',
        cnfast: '^0.0.8',
        'bits-ui': '^2.19.2'
    }
};
