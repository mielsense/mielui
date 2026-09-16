import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'tool',
    version: '1.2.0',
    visibility: 'public',
    description:
        'Compact, expandable AI tool calls for chat transcripts. Use variant="quiet" for a low-emphasis, no-hover-fill task summary.',
    files: [
        'components/tool/tool.svelte',
        'components/tool/tool-trigger.svelte',
        'components/tool/tool-content.svelte',
        'components/tool/context.svelte.ts',
        'components/tool/tool-item.svelte',
        'components/tool/tool-input.svelte',
        'components/tool/tool-output.svelte',
        'components/tool/index.ts',
        'components/tool/manifest.ts'
    ],
    components: ['_internal/utils', '_internal/disclosure', 'spinner'],
    shared: ['hugeicons-icon', 'utils.cn', 'utils.pressable', 'utils.createContext', 'transition'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.0.0',
        'tailwind-merge': '^3.0.0'
    }
};
