import { error } from '@sveltejs/kit';
import { catalogPages, components } from '#lib/components.js';
import { componentMarkdown } from '#lib/llms.js';
import { markdownResponse } from '#lib/markdown-response.js';
import { componentTypeMarkdown } from '#lib/server/catalog.js';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () =>
    [...components, ...catalogPages.map((group) => group.id)].map((component) => ({ component }));

export const GET: RequestHandler = ({ params }) => {
    const content = componentTypeMarkdown(params.component) ?? componentMarkdown(params.component);
    if (!content) {
        error(404, 'Component not found');
    }
    return markdownResponse(content);
};
