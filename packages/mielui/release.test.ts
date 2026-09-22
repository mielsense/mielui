import { readdir, readFile } from 'node:fs/promises';
import { describe, expect, test } from 'vitest';

import packageJson from './package.json';

describe('publishable package contract', () => {
    test('declares the public package metadata used by npm', () => {
        expect(packageJson.name).toBe('@mielui/svelte');
        expect(packageJson.license).toBe('MIT');
        expect(packageJson.sideEffects).toEqual(['**/*.css']);
        expect(packageJson.files).toEqual(expect.arrayContaining(['dist', 'registry']));
        expect(packageJson.bin).toEqual({ mielui: 'dist/index.js' });
        expect(packageJson.peerDependencies).toMatchObject({
            '@sveltejs/kit': '^2.0.0',
            svelte: '^5.33.0',
            tailwindcss: '^4.0.0'
        });
        expect(packageJson.exports['.']).toBeTruthy();
        expect(packageJson.exports['./ui.css']).toBe('./dist/svelte/ui.css');
        expect(packageJson.exports['./components/*']).toMatchObject({
            types: './dist/svelte/components/*/index.d.ts',
            svelte: './dist/svelte/components/*/index.js',
            default: './dist/svelte/components/*/index.js'
        });
        expect(packageJson.scripts['verify:artifact']).toBeTruthy();
        expect(packageJson.scripts['verify:cli-artifact']).toBeTruthy();
        expect(packageJson.scripts.check).toContain('check:cli');
        expect(packageJson.scripts.check).toContain('check:components');
        expect(packageJson.repository).toEqual({
            type: 'git',
            url: 'git+https://github.com/mielsense/mielui.git',
            directory: 'packages/mielui'
        });
        expect(packageJson.homepage).toBe('https://ui.miel.my');
        expect(packageJson.bugs).toBe('https://github.com/mielsense/mielui/issues');
        expect(packageJson.keywords).toEqual(
            expect.arrayContaining(['svelte', 'components', 'ui', 'tailwind'])
        );
    });

    /**
     * The budget covers tokens plus the multi-component surface contracts
     * (`.mielui-menu-item`, `.mielui-card-*`, `.mielui-tooltip*`). Those moved here
     * out of shared TypeScript class strings. The collection highlight adds one
     * more shared contract instead of repeating geometry CSS in five families.
     * Independent menu/dialog movement controls and the code/file-diff syntax
     * theme are token contracts too. Treat further growth as a signal that
     * private styling is leaking here. Count payload bytes without comments or
     * formatting whitespace; line counts change when readable formatting expands.
     */
    test('keeps distributable CSS within the public-token budget', async () => {
        const css = await readFile(new URL('./src/ui.css', import.meta.url), 'utf8');
        const normalizedCss = css
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\s+/g, ' ')
            .trim();
        const privatePrefix =
            /^\s*--(?:button|badge|field|panel|card|menu|command|tooltip|switch|checkbox|toast|tabs|progress|dialog|sheet|textarea|breadcrumb|toggle|shortcut|slider)-/m;

        expect(Buffer.byteLength(normalizedCss)).toBeLessThanOrEqual(18 * 1024);
        expect(css).not.toMatch(privatePrefix);
        expect(css).not.toMatch(/(^|})\s*\*\s*\{/);
        expect(css).not.toContain('@layer base');
        expect(css).not.toContain('@keyframes');
    });

    test('scans compiled component modules in published consumer installations', async () => {
        const css = await readFile(new URL('./src/ui.css', import.meta.url), 'utf8');

        expect(css).toContain("@source './**/*.{svelte,ts,js}';");
    });

    test('keeps component animations colocated and reduced-motion safe', async () => {
        const animationOwners = [
            ['./src/components/button/button.svelte', 'mielui-button-spin'],
            ['./src/components/progress/progress.svelte', 'mielui-progress-slide'],
            ['./src/components/spinner/spinner.svelte', 'mielui-spinner-spin'],
            ['./src/blocks/task-steps/task-steps-indicator.svelte', 'mielui-task-mark-in']
        ] as const;
        for (const [file, name] of animationOwners) {
            const component = await readFile(new URL(file, import.meta.url), 'utf8');
            expect(component.match(new RegExp(`@keyframes\\s+${name}\\b`, 'g'))).toHaveLength(1);
            expect(component.split(name).length).toBeGreaterThanOrEqual(3);
            expect(component).toMatch(/motion-reduce:animate-none|prefers-reduced-motion/);
        }

        const skeleton = await readFile(
            new URL('./src/components/skeleton/skeleton.svelte', import.meta.url),
            'utf8'
        );
        expect(skeleton).not.toContain('animation:');
        expect(skeleton).not.toContain('@keyframes');
    });

    test('ships only the styling runtimes required by public components', async () => {
        const tooltip = await readFile(
            new URL('./src/components/tooltip/shared-tooltip.ts', import.meta.url),
            'utf8'
        );

        expect(tooltip).not.toContain('slot-text/style.css');
        expect(packageJson.dependencies).not.toHaveProperty('slot-text');
        expect(packageJson.dependencies).toMatchObject({
            'tailwind-merge': '3.6.0',
            'tailwind-variants': '3.2.2'
        });
    });

    test('keeps compound component state instance-scoped', async () => {
        const files = (
            await readdir(new URL('./src', import.meta.url), { recursive: true })
        ).filter((file) => /\.(?:svelte|ts)$/.test(file));
        const source = (
            await Promise.all(
                files.map((file) => readFile(new URL(`./src/${file}`, import.meta.url), 'utf8'))
            )
        ).join('\n');

        expect(files).not.toContain('internals/state.svelte.ts');
        expect(source).not.toMatch(/\buseState\b|\bstates\s*\[/);
        expect(source).not.toMatch(/(?:set|get)Context(?:<[^>]+>)?\(['"]key['"]\)/);
    });

    test('uses only exported package paths for source self-references', async () => {
        const files = (
            await readdir(new URL('./src', import.meta.url), { recursive: true })
        ).filter((file) => /\.(?:svelte|ts)$/.test(file));
        const source = (
            await Promise.all(
                files.map((file) => readFile(new URL(`./src/${file}`, import.meta.url), 'utf8'))
            )
        ).join('\n');
        const selfReferences = [...source.matchAll(/['"](@mielui\/svelte(?:\/[^'"]+)?)['"]/g)].map(
            ([, specifier]) => specifier
        );
        const exportedPaths = Object.keys(packageJson.exports);

        expect(selfReferences.length).toBeGreaterThan(0);
        for (const specifier of selfReferences) {
            const subpath = specifier.replace('@mielui/svelte', '.') || '.';
            const exported = exportedPaths.some((path) => {
                if (!path.includes('*')) {
                    return path === subpath;
                }
                const [prefix, suffix] = path.split('*');
                return subpath.startsWith(prefix) && subpath.endsWith(suffix);
            });
            expect(exported, `${specifier} must have a package export`).toBe(true);
        }
    });

    test('ships the repository license byte-for-byte', async () => {
        const [rootLicense, packageLicense] = await Promise.all([
            readFile(new URL('../../LICENSE', import.meta.url), 'utf8'),
            readFile(new URL('./LICENSE', import.meta.url), 'utf8')
        ]);

        expect(packageLicense).toBe(rootLicense);
        expect(packageLicense).not.toContain('Copyright (c) 2025 Name');
    });

    // Full barrel/catalog lock lives in public-api.test.ts (Phase 2 §1).
});
