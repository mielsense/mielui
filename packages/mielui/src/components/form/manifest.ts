import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'form',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Native forms with transparent attachment forwarding and composable pending feedback.',
    files: [
        'components/form/form.svelte',
        'components/form/form-error-summary.svelte',
        'components/form/form-status.svelte',
        'components/form/form-submit.svelte',
        'components/form/index.ts',
        'components/form/form-actions.svelte',
        'components/form/context.svelte.ts',
        'components/form/manifest.ts'
    ],
    components: ['_internal/utils', 'button'],
    shared: ['utils.cn', 'utils.createContext', 'transition'],
    peerDependencies: {
        svelte: '^5.56.0',
        cnfast: '^0.0.8'
    }
};
