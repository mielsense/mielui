import { error } from '@sveltejs/kit';
import { catalogPages } from '$lib/components';
import { catalogDescriptions } from '$lib/server/catalog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
    const group = catalogPages.find((entry) => entry.id === params.component);
    if (!group) {
        error(404, 'Component group not found');
    }
    return { group, descriptions: catalogDescriptions };
};
