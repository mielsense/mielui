import { readFileSync } from 'node:fs';
import adapterNode from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {Record<string, string[]>} */
const categories = JSON.parse(
    readFileSync(
        new URL('../../packages/mielui/component-categories.json', import.meta.url),
        'utf8'
    )
);

const deploymentAdapter = process.env.DOCS_ADAPTER === 'node' ? adapterNode() : adapter();

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess({ script: true }),

    compilerOptions: { experimental: { async: true } },

    kit: {
        experimental: { remoteFunctions: true },
        adapter: deploymentAdapter,
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
    }
};

export default config;
