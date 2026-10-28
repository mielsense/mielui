import { error } from '@sveltejs/kit';
import { componentGuidePages } from '#lib/docs-pages.js';
import { chartGuideMarkdown } from '#lib/llms.js';
import { markdownResponse } from '#lib/markdown-response.js';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;
export const entries: EntryGenerator = () =>
    componentGuidePages.map((guide) => ({
        component: guide.component,
        guide: guide.slug
    }));

export const GET: RequestHandler = ({ params }) => {
    const content = chartGuideMarkdown(params.component, params.guide);
    if (!content) {
        error(404, 'Chart guide not found');
    }
    return markdownResponse(content);
};
