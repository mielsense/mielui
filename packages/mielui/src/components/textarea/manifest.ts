import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'textarea',
    version: '1.0.0',
    visibility: 'public',
    description: 'Multi-line text input wrapping native <textarea>. Shares variants with input.',
    files: [
        'components/textarea/textarea.svelte',
        'components/textarea/index.ts',
        'components/textarea/manifest.ts'
    ],
    components: ['_internal/utils', 'input'],
    shared: ['components/_internal/field-metadata', 'utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
