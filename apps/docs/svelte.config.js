import adapterNode from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const deploymentAdapter = process.env.DOCS_ADAPTER === 'node' ? adapterNode() : adapter();

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        adapter: deploymentAdapter,
        alias: {
            '@mielui/svelte/brand-mark': '../../packages/mielui/src/brand-mark.svelte',
            '@mielui/svelte': '../../packages/mielui/src',
            '@mielui/svelte/*': '../../packages/mielui/src/*'
        }
    }
};

export default config;
