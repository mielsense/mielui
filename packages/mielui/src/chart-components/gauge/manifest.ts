import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'gauge',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Circular meter for bounded quantities such as context remaining, usage limits, storage, and seats.',
    role: 'meter',
    files: [
        'components/gauge/gauge.svelte',
        'components/gauge/arc-path.ts',
        'components/gauge/live-motion.ts',
        'components/gauge/index.ts',
        'components/gauge/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
