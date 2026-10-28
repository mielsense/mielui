import { catalogDescriptions } from '#lib/server/catalog.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return { descriptions: catalogDescriptions };
};
