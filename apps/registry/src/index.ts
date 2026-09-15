import { node } from '@elysia/node';
import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';

import { themesController } from './services/themes';

export const app = new Elysia({ adapter: node(), serve: { maxRequestBodySize: 128 * 1024 } })
    .onError(({ code, error, set }) => {
        if (
            code === 'VALIDATION' ||
            code === 'NOT_FOUND' ||
            code === 'PARSE' ||
            code === 'INVALID_COOKIE_SIGNATURE'
        ) {
            return;
        }
        if (
            typeof code === 'number' &&
            typeof error === 'object' &&
            error !== null &&
            'response' in error
        ) {
            set.status = code;
            return error.response;
        }

        console.error('Unhandled registry request error:', error);
        set.status = 500;
        return 'Internal error.';
    })
    .use(
        openapi({
            path: '/openapi'
        })
    )
    .use(themesController)
    .get('/', () => 'Mielui theme registry');

export default app;
