import { componentReference } from '$lib/server/api-reference';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
    const slug = url.pathname.split('/').at(-1) ?? '';
    return { reference: componentReference(slug) };
};
