import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'message',
    version: '1.0.1',
    visibility: 'public',
    description: 'Role-aware conversation messages with readable content and contextual actions.',
    files: [
        'components/message/message.svelte',
        'components/message/message-content.svelte',
        'components/message/message-actions.svelte',
        'components/message/context.svelte.ts',
        'components/message/message-avatar.svelte',
        'components/message/message-body.svelte',
        'components/message/message-metadata.svelte',
        'components/message/message-name.svelte',
        'components/message/message-time.svelte',
        'components/message/message-status.svelte',
        'components/message/index.ts',
        'components/message/manifest.ts'
    ],
    components: ['_internal/utils', 'typography'],
    shared: ['utils.cn', 'utils.createContext'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0',
        'tailwind-merge': '^3.0.0'
    }
};
