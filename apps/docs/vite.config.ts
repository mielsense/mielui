import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    ssr: {
        noExternal: [
            'bits-ui',
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
