import { build } from 'esbuild';

await build({
    entryPoints: ['cli/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node22',
    banner: {
        js: '#!/usr/bin/env node\nimport { createRequire } from "node:module"; const require = createRequire(import.meta.url);'
    }
});
