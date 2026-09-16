import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'breadcrumb',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Router-independent navigation trail with explicit current-page items and decorative separators.',
    files: [
        'components/breadcrumb/breadcrumb.svelte',
        'components/breadcrumb/breadcrumb-item.svelte',
        'components/breadcrumb/breadcrumb-separator.svelte',
        'components/breadcrumb/index.ts',
        'components/breadcrumb/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['hugeicons-icon', 'utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
