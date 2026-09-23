import { error } from '@sveltejs/kit';
import { previewExamples } from '$lib/preview-examples';
import type { PageLoad } from './$types';

const examples = new Set<string>(previewExamples);

export const load: PageLoad = ({ params }) => {
    const example = `${params.component}/${params.example}`;
    if (!examples.has(example)) {
        error(404, 'Preview not found');
    }
    return { example };
};
