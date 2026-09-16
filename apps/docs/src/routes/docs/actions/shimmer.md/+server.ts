import { markdownResponse } from '$lib/markdown-response';
import example from '../shimmer/example.svelte?raw';

import textExample from '../shimmer/text-example.svelte?raw';

export const prerender = true;
export function GET() {
    return markdownResponse(
        [
            '# Shimmer',
            'Import shimmer from @mielui/svelte/actions/shimmer. Apply use:shimmer to a container. No options are required.',
            'The decorative highlight respects rounded corners and reduced motion. Unmounting cancels the animation and restores positioning. Add an accessible loading label to the region.',
            'Skeleton supports variant="default" | "shimmer". The default is still.',
            '```svelte',
            example,
            '```',
            '## Text',
            'On a plain-text element, the highlight moves through the letters. Use a status region for loading feedback.',
            '```svelte',
            textExample,
            '```'
        ].join('\n\n')
    );
}
