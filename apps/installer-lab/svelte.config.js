import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import categories from '../../packages/mielui/component-categories.json' with { type: 'json' };

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: vitePreprocess(),
    kit: {
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
    }
};
