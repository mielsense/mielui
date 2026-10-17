import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'radio-group',
    version: '1.0.1',
    visibility: 'public',
    description: 'Single-select radio group with bindable value and per-item label/description.',
    role: 'radiogroup',
    files: [
        'components/radio-group/radio-group.svelte',
        'components/radio-group/radio-group-item.svelte',
        'components/radio-group/context.ts',
        'components/radio-group/index.ts',
        'components/radio-group/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn', 'utils.createContext', 'utils.pressable'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.56.0'
    }
};
