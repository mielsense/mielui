import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'response-stream',
    version: '2.0.0',
    visibility: 'public',
    description:
        'Streaming AI response text with bounded arrival motion and natural line wrapping.',
    role: 'status',
    files: [
        'components/response-stream/response-stream.svelte',
        'components/response-stream/stream.svelte.ts',
        'components/response-stream/stream-utils.ts',
        'components/response-stream/index.ts',
        'components/response-stream/manifest.ts'
    ],
    components: ['_internal/utils'],
    shared: ['transition', 'utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        '@scritto/core': '^0.1.0',
        '@scritto/svelte': '^0.1.0',
        cnfast: '^0.0.8',
        svelte: '^5.0.0',
        'tailwind-merge': '^3.0.0'
    }
};
