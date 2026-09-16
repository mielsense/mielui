import type { Manifest } from '@mielui/svelte/_manifest/types';

/**
 * TagInput.
 *
 * 1.0.0 -- initial. Compound field for tokenized string entry: Root owns
 *        tags + draft state, List renders the tokens, Tag renders one token
 *        with its remove control, Input handles entry, delimiters, paste
 *        splitting, and Backspace removal.
 */
export const manifest: Manifest = {
    name: 'tag-input',
    version: '1.0.0',
    visibility: 'public',
    description:
        'Tokenized tag entry field with keyboard, paste, and validation support. Compound: Root / List / Tag / Input.',
    files: [
        'components/tag-input/tag-input.svelte',
        'components/tag-input/tag-input-list.svelte',
        'components/tag-input/tag-input-tag.svelte',
        'components/tag-input/tag-input-input.svelte',
        'components/tag-input/context.svelte.ts',
        'components/tag-input/index.ts',
        'components/tag-input/manifest.ts'
    ],
    components: ['button', 'badge'],
    shared: ['hugeicons-icon', 'utils.cn', 'utils.createContext'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
