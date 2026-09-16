import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'task-steps',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Ordered task progress with pending, active, completed, and failed states plus settled screen-reader announcements.',
    files: [
        'components/task-steps/task-steps.svelte',
        'components/task-steps/state.ts',
        'components/task-steps/task-steps-indicator.svelte',
        'components/task-steps/task-steps-meta.svelte',
        'components/task-steps/task-steps-label.svelte',
        'components/task-steps/task-steps-list.svelte',
        'components/task-steps/task-steps-summary.svelte',
        'components/task-steps/index.ts',
        'components/task-steps/task-steps-item.svelte',
        'components/task-steps/context.svelte.ts',
        'components/task-steps/manifest.ts'
    ],
    components: ['_internal/utils', 'spinner'],
    shared: ['utils.cn', 'utils.createContext'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
