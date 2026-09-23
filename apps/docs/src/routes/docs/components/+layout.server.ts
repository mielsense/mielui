import { componentGuide, componentOwner } from '$lib/docs-pages';
import { componentReference } from '$lib/server/api-reference';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
    const owner = componentOwner(url.pathname);
    const guide = componentGuide(url.pathname);
    return { owner, reference: owner && !guide ? componentReference(owner) : [] };
};
