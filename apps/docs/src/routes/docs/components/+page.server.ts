import { catalogDescriptions } from '$lib/server/catalog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return { descriptions: catalogDescriptions };
};
