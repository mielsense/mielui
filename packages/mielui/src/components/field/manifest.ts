import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'field',
    version: '1.0.0',
    visibility: 'public',
    description: 'Composable labels, control metadata, descriptions, and validation issues.',
    files: [
        'components/field/field-group.svelte',
        'components/field/field-label.svelte',
        'components/field/field-content.svelte',
        'components/field/field.svelte',
        'components/field/field-error.svelte',
        'components/field/field-description.svelte',
        'components/field/field-control.svelte',
        'components/field/index.ts',
        'components/field/metadata.ts',
        'components/field/context.svelte.ts',
        'components/field/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['utils.cn', 'utils.createContext', 'transition'],
    peerDependencies: {
        svelte: '^5.33.0',
        cnfast: '^0.0.8'
    }
};
