import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'native-select',
    version: '1.0.0',
    visibility: 'public',
    description: 'A styled native select with option groups, forms, and multiple selection.',
    files: [
        'components/native-select/index.ts',
        'components/native-select/native-select-opt-group.svelte',
        'components/native-select/native-select-option.svelte',
        'components/native-select/native-select.svelte',
        'components/native-select/manifest.ts'
    ],
    components: [],
    shared: ['utils.cn'],
    peerDependencies: {
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
