import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        alias: {
            '@mielui/svelte/brand-mark': '../../packages/mielui/src/brand-mark.svelte',
            '@mielui/svelte': '../../packages/mielui/src',
            '@mielui/svelte/*': '../../packages/mielui/src/*'
        }
    }
};
