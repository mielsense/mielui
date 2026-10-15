import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'markdown',
    version: '1.1.2',
    visibility: 'public',
    description:
        'Safe GFM markdown renderer for dense agent output, with token-based rendering and Mielui code blocks.',
    files: [
        'components/markdown/markdown.svelte',
        'components/markdown/markdown-token.svelte',
        'components/markdown/_types.ts',
        'components/markdown/token.ts',
        'components/markdown/context.svelte.ts',
        'components/markdown/index.ts',
        'components/markdown/manifest.ts'
    ],
    components: ['_internal/utils', 'code-block', 'typography'],
    shared: ['utils.cn', 'utils.createContext'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        marked: '^18.0.7',
        svelte: '^5.56.0',
        'tailwind-merge': '^3.0.0'
    }
};
