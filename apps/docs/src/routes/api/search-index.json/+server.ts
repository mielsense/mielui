import { json } from '@sveltejs/kit';
import { searchIndex } from '$lib/server/search-index';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => json(searchIndex());
