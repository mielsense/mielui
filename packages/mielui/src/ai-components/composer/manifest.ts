import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'composer',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Controlled agent-message form with autoresizing input, toolbar, and send/stop action.',
    files: [
        'components/composer/composer.svelte',
        'components/composer/composer-input.svelte',
        'components/composer/composer-toolbar.svelte',
        'components/composer/composer-actions.svelte',
        'components/composer/composer-submit.svelte',
        'components/composer/context.svelte.ts',
        'components/composer/index.ts',
        'components/composer/manifest.ts'
    ],
    components: ['_internal/utils', 'button', 'kbd', 'toolbar'],
    shared: [
        'components/_internal/submission.svelte',
        'components/_internal/surface',
        'hugeicons-icon',
        'utils.cn',
        'utils.createContext'
    ],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.0.0',
        'tailwind-merge': '^3.0.0'
    }
};
