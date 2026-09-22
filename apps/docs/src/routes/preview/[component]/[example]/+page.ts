import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const examples = new Set([
    'notch/hero',
    'notch/peek',
    'notch/activity',
    'notch/glass',
    'toast/notch'
]);

export const load: PageLoad = ({ params }) => {
    const example = `${params.component}/${params.example}`;
    if (!examples.has(example)) {
        error(404, 'Preview not found');
    }
    return { example };
};
