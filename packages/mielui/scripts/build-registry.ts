/**
 * Snapshots the mielui component registry into `registry/`.
 *
 * Run with pnpm from packages/mielui (`pnpm run build:registry`). Imports every
 * `manifest.ts` under the component category folders, validates that the
 * files each manifest references exist, then writes:
 *
 *   registry/index.json   -- RegistryIndex consumed by the CLI at runtime
 *   registry/files/**     -- raw component/shared sources, paths preserved
 *   registry/themes.json  -- built-in theme presets pre-rendered to CSS
 */

import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RegistryIndex, RegistryTheme } from '../cli/types';
import categories from '../component-categories.json';
import pkg from '../package.json';
import type { Manifest } from '../src/_manifest/types';
import { builtInThemePresets } from '../src/themes/builtin-presets';
import { themeToCss } from '../src/themes/theme';

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mieluiSrc = path.resolve(pkgRoot, 'src');
const outDir = path.join(pkgRoot, 'registry');

const componentSources = new Map(
    Object.entries(categories).flatMap(([category, components]) =>
        components.map((component) => [component, category] as const)
    )
);

function sourcePath(file: string): string {
    const [directory, component, ...rest] = file.split('/');
    const category = componentSources.get(component);
    if (directory === 'components' && category) {
        return path.join(mieluiSrc, category, component, ...rest);
    }
    return path.join(mieluiSrc, file);
}

/** Keep CLI-installed files under components/ while package sources use category folders. */
function registrySource(source: string, file: string): string {
    return source.replace(
        /((?:from\s*|import\s*\()['"])(\.[^'"]+)(['"])/g,
        (_match, prefix: string, specifier: string, quote: string) => {
            const target = path.resolve(path.dirname(sourcePath(file)), specifier);
            const relative = path.relative(mieluiSrc, target).replaceAll(path.sep, '/');
            const logical = relative.replace(
                /^(ai-components|blocks|chart-components)\//,
                'components/'
            );
            const rewritten = path.posix.relative(path.posix.dirname(file), logical);
            return `${prefix}${rewritten.startsWith('.') ? rewritten : `./${rewritten}`}${quote}`;
        }
    );
}

async function collectManifestPaths() {
    const result: string[] = [];
    async function collect(directory: string) {
        for (const entry of await readdir(directory, { withFileTypes: true })) {
            const target = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                await collect(target);
            } else if (entry.name === 'manifest.ts') {
                result.push(target);
            }
        }
    }
    for (const category of Object.keys(categories)) {
        await collect(path.join(mieluiSrc, category));
    }
    return result.sort();
}

/** Resolves a manifest `shared` entry to source files relative to mielui src. */
function sharedToFiles(entry: string): string[] {
    if (entry.startsWith('utils.')) return ['utils.ts'];
    for (const candidate of [`${entry}.ts`, `${entry}.svelte.ts`]) {
        if (existsSync(path.join(mieluiSrc, candidate))) return [candidate];
    }
    throw new Error(`shared entry "${entry}" resolves to no file under ${mieluiSrc}`);
}

async function buildThemes(): Promise<RegistryTheme[]> {
    return builtInThemePresets.map((theme) => ({
        slug: theme.slug,
        name: theme.name,
        description: theme.description,
        css: themeToCss(theme)
    }));
}

const manifests: Manifest[] = [];
for (const manifestPath of await collectManifestPaths()) {
    const module = (await import(manifestPath)) as { manifest: Manifest };
    if (!module.manifest?.name) throw new Error(`${manifestPath} exports no manifest`);
    manifests.push(module.manifest);
}

const fileSet = new Set<string>(['ui.css']);
const known = new Set(manifests.map((m) => m.name));
for (const manifest of manifests) {
    for (const dep of manifest.components) {
        if (!known.has(dep)) {
            throw new Error(`${manifest.name} depends on unknown component "${dep}"`);
        }
    }
    for (const file of manifest.files) fileSet.add(file);
    for (const entry of manifest.shared) {
        sharedToFiles(entry).forEach((file) => {
            fileSet.add(file);
        });
    }
}

for (const file of fileSet) {
    if (!existsSync(sourcePath(file))) {
        throw new Error(`registry references missing file: ${file}`);
    }
}

await rm(outDir, { recursive: true, force: true });
for (const file of fileSet) {
    const target = path.join(outDir, 'files', file);
    await mkdir(path.dirname(target), { recursive: true });
    const source = await readFile(sourcePath(file), 'utf8');
    await writeFile(target, registrySource(source, file));
}

const index: RegistryIndex = {
    cliVersion: pkg.version,
    builtAt: new Date().toISOString(),
    components: manifests.map(
        ({
            name,
            version,
            visibility,
            description,
            files,
            components,
            shared,
            peerDependencies
        }) => ({
            name,
            version,
            visibility,
            description,
            files,
            components,
            shared,
            sharedFiles: [...new Set(shared.flatMap(sharedToFiles))],
            peerDependencies
        })
    )
};

await writeFile(path.join(outDir, 'index.json'), `${JSON.stringify(index, null, '\t')}\n`);
await writeFile(
    path.join(outDir, 'themes.json'),
    `${JSON.stringify(await buildThemes(), null, '\t')}\n`
);

console.log(`registry: ${index.components.length} components, ${fileSet.size} files, themes built`);
