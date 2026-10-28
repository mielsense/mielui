import { searchIndex } from '#lib/server/search-index.js';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => Response.json(searchIndex());
