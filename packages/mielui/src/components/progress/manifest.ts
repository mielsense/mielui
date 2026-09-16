import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'progress',
    version: '1.0.0',
    visibility: 'public',
    description: 'Determinate and indeterminate progress bar.',
    role: 'progressbar',
    files: [
        'components/progress/progress.svelte',
        'components/progress/index.ts',
        'components/progress/manifest.ts'
    ],
    components: [],
    shared: ['utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
