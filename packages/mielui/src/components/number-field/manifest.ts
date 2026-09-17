import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'number-field',
    version: '1.0.0',
    visibility: 'public',
    description: 'Native numeric input with composable label and step controls.',
    files: [
        'components/number-field/context.ts',
        'components/number-field/index.ts',
        'components/number-field/number-field-decrement.svelte',
        'components/number-field/number-field-group.svelte',
        'components/number-field/number-field-increment.svelte',
        'components/number-field/number-field-input.svelte',
        'components/number-field/number-field-label.svelte',
        'components/number-field/number-field.svelte',
        'components/number-field/manifest.ts'
    ],
    components: ['_internal/utils', 'button'],
    shared: ['utils.cn', 'utils.createContext'],
    peerDependencies: {
        svelte: '^5.33.0',
        cnfast: '^0.0.8'
    }
};
