import { error } from '@sveltejs/kit';
import { components } from '$lib/components';
import { componentMarkdown } from '$lib/llms';
import { markdownResponse } from '$lib/markdown-response';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => components.map((component) => ({ component }));

export const GET: RequestHandler = ({ params }) => {
    const content = componentMarkdown(params.component);
    if (!content) error(404, 'Component not found');
    return markdownResponse(content);
};
