import path from 'node:path';
import categories from '../../../../../packages/mielui/component-categories.json';
import pkg from '../../../../../packages/mielui/package.json';
import type { Manifest } from '../../../../../packages/mielui/src/_manifest/types';
import docsPkg from '../../../package.json';

const prefix = '../../../../../packages/mielui/src/';
const rawModules = import.meta.glob<string>(
    '../../../../../packages/mielui/src/**/*.{svelte,ts,css}',
    { query: '?raw', import: 'default', eager: true }
);
const manifestModules = import.meta.glob<{ manifest: Manifest }>(
    '../../../../../packages/mielui/src/**/manifest.ts',
    { eager: true }
);
const sources = new Map(
    Object.entries(rawModules).map(([key, value]) => [key.slice(prefix.length), value])
);
const manifests = new Map(
    Object.values(manifestModules).map(({ manifest }) => [manifest.name, manifest])
);
const versions: Record<string, string> = {
    ...docsPkg.devDependencies,
    ...docsPkg.dependencies,
    ...pkg.dependencies,
    ...pkg.peerDependencies
};
const componentCategories = new Map(
    Object.entries(categories).flatMap(([category, names]) =>
        names.map((name) => [name, category] as const)
    )
);

function physical(file: string) {
    const [directory, name, ...rest] = file.split('/');
    return directory === 'components' && componentCategories.has(name)
        ? [componentCategories.get(name), name, ...rest].join('/')
        : file;
}

function logical(file: string) {
    return file.replace(/^(blocks|ai-components|chart-components)\//, 'components/');
}

function resolve(file: string) {
    const candidates = [
        file,
        `${file}.ts`,
        `${file}.svelte.ts`,
        `${file}.svelte`,
        `${file}/index.ts`
    ];
    return candidates.find((candidate) => sources.has(candidate));
}

export function componentSource(name: string) {
    if (!componentCategories.has(name)) {
        return null;
    }
    const files = new Map<string, string>();
    const dependencies = new Set<string>();
    const visited = new Set<string>();
    const importPattern = /((?:from\s*|import\s*\(|import\s*|@import\s*)['"])([^'"]+)(['"])/g;

    function visit(file: string) {
        if (files.has(file)) {
            return;
        }
        const source = sources.get(file);
        if (source === undefined) {
            throw new Error(`Missing manual installation source: ${file}`);
        }
        files.set(file, source);
        const rewritten = source.replace(
            importPattern,
            (match, before: string, specifier: string, after: string) => {
                let target: string | undefined;
                if (specifier.startsWith('@mielui/svelte/')) {
                    target = resolve(physical(specifier.slice('@mielui/svelte/'.length)));
                } else if (specifier.startsWith('.')) {
                    target = resolve(
                        path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier))
                    );
                } else {
                    const name = specifier.startsWith('@')
                        ? specifier.split('/').slice(0, 2).join('/')
                        : specifier.split('/')[0];
                    if (versions[name] && !versions[name].startsWith('workspace:')) {
                        dependencies.add(`${name}@${versions[name]}`);
                    }
                    return match;
                }
                if (!target) {
                    throw new Error(`Cannot resolve ${specifier} from ${file}`);
                }
                visit(target);
                return `${before}$lib/mielui/${logical(target)}${after}`;
            }
        );
        files.set(file, rewritten);
    }

    function collect(name: string) {
        if (visited.has(name)) {
            return;
        }
        visited.add(name);
        const manifest = manifests.get(name);
        if (!manifest) {
            throw new Error(`Missing component manifest: ${name}`);
        }
        for (const file of manifest.files) {
            if (!file.endsWith('/manifest.ts')) {
                visit(physical(file));
            }
        }
        for (const dependency of manifest.components) {
            collect(dependency);
        }
        for (const shared of manifest.shared) {
            const file = resolve(shared.startsWith('utils.') ? 'utils' : shared);
            if (!file) {
                throw new Error(`Missing shared source: ${shared}`);
            }
            visit(file);
        }
    }

    collect(name);
    visit('ui.css');
    return {
        dependencies: [...dependencies].sort(),
        files: [...files].map(([file, source]) => ({
            path: `src/lib/mielui/${logical(file)}`,
            source,
            lang: file.endsWith('.svelte') ? 'svelte' : file.endsWith('.css') ? 'css' : 'typescript'
        }))
    };
}
