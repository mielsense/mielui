import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import categories from '../../packages/mielui/component-categories.json' with { type: 'json' };

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            preprocess: vitePreprocess(),
            adapter: adapter(),
            alias: {
                ...Object.fromEntries(
                    Object.entries(categories).flatMap(([category, components]) =>
                        components.map((component) => [
                            `@mielui/svelte/components/${component}`,
                            `../../packages/mielui/src/${category}/${component}`
                        ])
                    )
                ),
                '@mielui/svelte/hugeicons-icon': '../../packages/mielui/src/hugeicons-icon.svelte',
                '@mielui/svelte/brand-mark': '../../packages/mielui/src/brand-mark.svelte',
                '@mielui/svelte': '../../packages/mielui/src',
                '@mielui/svelte/*': '../../packages/mielui/src/*'
            }
        })
    ],
    server: { host: '127.0.0.1', port: 5174 },
    preview: { host: '127.0.0.1', port: 5174 },
    test: {
        include: ['src/**/*.test.ts'],
        testTimeout: 15_000
    }
});
