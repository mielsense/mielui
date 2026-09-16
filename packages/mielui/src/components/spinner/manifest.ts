import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'spinner',
    version: '1.0.0',
    visibility: 'public',
    description: 'An animated loading indicator that can resolve to a checkmark.',
    files: [
        'components/spinner/spinner.svelte',
        'components/spinner/index.ts',
        'components/spinner/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['hugeicons-icon', 'utils.cn', 'transition'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
