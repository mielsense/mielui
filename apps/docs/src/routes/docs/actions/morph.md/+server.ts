import { markdownResponse } from '$lib/markdown-response';
import example from '../morph/example.svelte?raw';

export const prerender = true;
export function GET() {
    return markdownResponse(
        [
            '# Morph',
            '',
            'Animate SVG geometry and text changes with the morph Svelte action.',
            '',
            '## API',
            '',
            '| Option | Type | Default |',
            '| --- | --- | --- |',
            '| key | unknown | Required |',
            '| duration | number | 220 milliseconds |',
            '',
            'Import from @mielui/svelte/actions/morph. Attach to a visual wrapper inside a button, keeping the accessible name on the button. Change key when its visual content changes. Use a stable wrapper size.',
            '',
            'Closed shapes with matching viewBox values interpolate. Open strokes and incompatible geometry crossfade. Reduced motion skips animation. Interrupted or unmounted animations remove temporary visual copies.',
            '',
            '## Example',
            '',
            '```svelte',
            example,
            '```'
        ].join('\n')
    );
}
