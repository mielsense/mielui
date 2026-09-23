import { markdownResponse } from '$lib/markdown-response';
import { llmDocPaths } from '$lib/sitemap';
import type { RequestHandler } from './$types';

export const prerender = true;
export const GET: RequestHandler = async ({ fetch, url }) => {
    const paths = llmDocPaths.filter((path) => path.endsWith('.md'));
    const pages = await Promise.all(
        paths.map(async (path) => {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Unable to include documentation: ${path}`);
            }
            return `Source: ${new URL(path, url.origin).href}\n\n${await response.text()}`;
        })
    );
    return markdownResponse(`# Mielui — complete documentation\n\n${pages.join('\n\n---\n\n')}`);
};
