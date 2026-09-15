import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

import type { RegistryIndex, RegistryTheme } from '../cli/types';

const registryRoot = path.resolve(import.meta.dirname, '../registry');

describe('built registry output schema', () => {
    test('references only emitted files and known component dependencies', async () => {
        const index = JSON.parse(
            await readFile(path.join(registryRoot, 'index.json'), 'utf8')
        ) as RegistryIndex;
        const names = new Set(index.components.map((component) => component.name));

        expect(index.cliVersion).toMatch(/^\d+\.\d+\.\d+/);
        expect(Date.parse(index.builtAt)).not.toBeNaN();
        for (const component of index.components) {
            for (const file of [...component.files, ...component.sharedFiles]) {
                expect(existsSync(path.join(registryRoot, 'files', file))).toBe(true);
            }
            for (const dependency of component.components) {
                expect(names.has(dependency)).toBe(true);
            }
        }
    });

    test('emits every Command search module', async () => {
        const index = JSON.parse(
            await readFile(path.join(registryRoot, 'index.json'), 'utf8')
        ) as RegistryIndex;
        const command = index.components.find((component) => component.name === 'command');

        expect(command?.files).toContain('components/command/search.ts');
        expect(existsSync(path.join(registryRoot, 'files/components/command/search.ts'))).toBe(
            true
        );
    });

    test('preserves installed AI paths and relative dependencies', async () => {
        const message = await readFile(
            path.join(registryRoot, 'files/components/message/message.svelte'),
            'utf8'
        );
        expect(message).toContain("from '../typography/variants'");
        expect(message).not.toContain('../../components/');
        expect(existsSync(path.join(registryRoot, 'files/ai-components'))).toBe(false);
    });

    test('emits usable built-in theme records', async () => {
        const themes = JSON.parse(
            await readFile(path.join(registryRoot, 'themes.json'), 'utf8')
        ) as RegistryTheme[];

        expect(themes.length).toBeGreaterThan(0);
        for (const theme of themes) {
            expect(theme.slug.length).toBeGreaterThan(0);
            expect(theme.css).toContain(':root');
        }
    });
});
