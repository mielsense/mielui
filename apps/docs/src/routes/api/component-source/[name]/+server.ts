import { error, json } from '@sveltejs/kit';
import { componentSource } from '$lib/server/component-source';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => {
    const source = componentSource(params.name);
    if (!source) {
        error(404, 'Component not found');
    }
    return json(source);
};
