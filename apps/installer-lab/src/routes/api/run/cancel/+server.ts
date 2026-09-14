import { json } from '@sveltejs/kit';
import { assertLocalRequest } from '$lib/server/local-only';
import { runManager } from '$lib/server/run-manager';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
    assertLocalRequest(event);
    return json({ snapshot: await runManager.cancel() });
};
