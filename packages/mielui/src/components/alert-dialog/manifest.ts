import type { Manifest } from '@mielui/svelte/_manifest/types';

export const manifest: Manifest = {
    name: 'alert-dialog',
    version: '1.2.0',
    visibility: 'public',
    description:
        'Confirmation dialog with role="alertdialog". Outside clicks never dismiss it, focus starts on Exit, and Exit and Confirm replace the close button.',
    role: 'alertdialog',
    files: [
        'components/alert-dialog/alert-dialog.svelte',
        'components/alert-dialog/alert-dialog-trigger.svelte',
        'components/alert-dialog/alert-dialog-content.svelte',
        'components/alert-dialog/alert-dialog-header.svelte',
        'components/alert-dialog/alert-dialog-title.svelte',
        'components/alert-dialog/alert-dialog-description.svelte',
        'components/alert-dialog/alert-dialog-footer.svelte',
        'components/alert-dialog/alert-dialog-exit.svelte',
        'components/alert-dialog/alert-dialog-confirm.svelte',
        'components/alert-dialog/index.ts',
        'components/alert-dialog/manifest.ts'
    ],
    components: ['_internal/utils', 'dialog', 'button', 'typography'],
    shared: ['utils.cn'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
