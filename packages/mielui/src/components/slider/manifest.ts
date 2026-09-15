import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'slider',
    version: '1.1.0',
    visibility: 'public',
    description:
        'Single-value and two-handle range slider with pill handles, keyboard controls, and RTL support.',
    role: 'slider',
    files: [
        'components/slider/slider.svelte',
        'components/slider/range.ts',
        'components/slider/index.ts',
        'components/slider/manifest.ts'
    ],
    components: [],
    shared: ['utils.cn'],
    peerDependencies: {
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
