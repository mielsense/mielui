import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@src': fileURLToPath(new URL('./src', import.meta.url)),
            '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
            '@root': fileURLToPath(new URL('.', import.meta.url))
        }
    },
    test: {
        environment: 'node',
        include: ['tests/**/*.test.ts']
    }
});
