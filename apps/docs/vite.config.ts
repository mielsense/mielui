import { readFileSync } from 'node:fs';
import adapterNode from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const categories: Record<string, string[]> = JSON.parse(
    readFileSync(
        new URL('../../packages/mielui/component-categories.json', import.meta.url),
        'utf8'
    )
);
const deploymentAdapter = process.env.DOCS_ADAPTER === 'node' ? adapterNode() : adapter();

// Prerendered pages link to the public site. Vercel previews keep their own origin so the
// remote form demo passes the CSRF origin check there.
const origin =
    process.env.DOCS_ORIGIN ??
    (process.env.VERCEL_ENV === 'preview' ? undefined : 'https://ui.miel.my');

/** Shared with vitest.config.ts, which builds its own plugin list. */
export const kitOptions: Parameters<typeof sveltekit>[0] = {
    preprocess: vitePreprocess({ script: true }),
    compilerOptions: {
        experimental: {
            async: true
        }
    },
    experimental: {
        remoteFunctions: true
    },
    version: {
        pollInterval: 60_000
    },
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
    },
    paths: {
        origin
    }
};

export default defineConfig({
    plugins: [tailwindcss(), sveltekit(kitOptions)],
    ssr: {
        noExternal: [
            'bits-ui',
            '@tanstack/svelte-table',
            ...(process.env.DOCS_ADAPTER === 'node'
                ? ['@floating-ui/dom', 'clsx', 'tailwind-variants']
                : [])
        ]
    },
    server: {
        host: '0.0.0.0'
    },
    preview: {
        host: '0.0.0.0'
    }
});
