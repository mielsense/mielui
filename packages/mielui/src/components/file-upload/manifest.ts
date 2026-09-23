import type { Manifest } from '@mielui/svelte/_manifest/types';
export const manifest: Manifest = {
    name: 'file-upload',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Upload cards with validation, progress, cancellation, retry, and animated completion.',
    files: [
        'components/file-upload/index.ts',
        'components/file-upload/context.svelte.ts',
        'components/file-upload/controller.svelte.ts',
        'components/file-upload/file-upload.svelte',
        'components/file-upload/file-upload-dropzone.svelte',
        'components/file-upload/file-upload-trigger.svelte',
        'components/file-upload/file-upload-list.svelte',
        'components/file-upload/file-upload-item.svelte',
        'components/file-upload/file-upload-preview.svelte',
        'components/file-upload/file-upload-details.svelte',
        'components/file-upload/file-upload-progress.svelte',
        'components/file-upload/file-upload-status.svelte',
        'components/file-upload/file-upload-remove.svelte',
        'components/file-upload/file-upload-retry.svelte',
        'components/file-upload/manifest.ts'
    ],
    components: ['button', 'tooltip', 'spinner'],
    shared: ['hugeicons-icon', 'utils.cn', 'transition'],
    peerDependencies: {
        '@humanspeak/svelte-motion': '^1.2.1',
        '@hugeicons/core-free-icons': '^4.3.0',
        svelte: '^5.56.0'
    }
};
