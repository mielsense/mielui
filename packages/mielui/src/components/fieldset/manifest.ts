import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'fieldset',
    version: '1.0.0',
    visibility: 'public',
    description: 'Native form grouping with legends, descriptions, and disabled semantics.',
    files: [
        'components/fieldset/fieldset-description.svelte',
        'components/fieldset/fieldset.svelte',
        'components/fieldset/index.ts',
        'components/fieldset/fieldset-legend.svelte',
        'components/fieldset/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn'],
    peerDependencies: {
        svelte: '^5.56.0',
        cnfast: '^0.0.8'
    }
};
