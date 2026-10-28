import { fetchStarCount } from '#lib/server/github.js';
import type { LayoutServerLoad } from './$types';

// Serve every page the crawler reaches as static HTML from the CDN; anything else still renders on demand.
export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ fetch, setHeaders, url }) => {
    const starCount = await fetchStarCount(fetch);

    // Cache the layout response edge-side for a minute -- keeps the GitHub call
    // off the hot path without making counts stale. Skipped in dev because Vite
    // HMR re-runs the load within the same request, and SvelteKit's setHeaders
    // throws on a duplicate set of the same header.
    if (!import.meta.env.DEV) {
        setHeaders({ 'cache-control': 'public, max-age=60, stale-while-revalidate=300' });
    }

    return { starCount, origin: url.origin };
};
