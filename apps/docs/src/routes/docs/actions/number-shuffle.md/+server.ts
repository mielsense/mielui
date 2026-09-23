import { markdownResponse } from '$lib/markdown-response';
import example from '../number-shuffle/example.svelte?raw';
import formatted from '../number-shuffle/formatted.svelte?raw';

export const prerender = true;
export function GET() {
    return markdownResponse(
        [
            '# Number shuffle',
            'Roll digits as a numeric value changes.',
            '## Usage',
            'Import numberShuffle from @mielui/svelte/actions/number-shuffle. Attach it to a text-only element and pass value. Render the final formatted value as normal text for server rendering and accessibility. Keep icons and markup outside the animated element.',
            '```svelte',
            example,
            '```',
            '## Formatted values',
            '```svelte',
            formatted,
            '```',
            '## API reference',
            '| Option | Type | Default |',
            '| --- | --- | --- |',
            '| value | number | Required |',
            '| format | (value: number) => string | String |',
            '| duration | number | Twice the theme panel duration, fallback 480ms |',
            'The action rolls from zero on mount and continues from the current value on interrupted updates. Reduced motion, disabled theme motion, and duration zero show the final value immediately. Visual digits are hidden from assistive technology. Removing the element cleans up animation and restores its styles.'
        ].join('\n\n')
    );
}
