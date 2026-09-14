import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

describe('launcher component usage', () => {
    test('declares Mielui and uses Mielui primitives for its controls and surfaces', async () => {
        const appRoot = path.resolve(import.meta.dirname, '../../..');
        const packageJson = JSON.parse(
            await readFile(path.join(appRoot, 'package.json'), 'utf8')
        ) as {
            dependencies?: Record<string, string>;
        };
        expect(packageJson.dependencies?.['@mielui/svelte']).toBe('workspace:*');

        const page = await readFile(path.join(appRoot, 'src', 'routes', '+page.svelte'), 'utf8');
        expect(page).toContain("from '@mielui/svelte/brand-mark'");
        expect(page).toContain("from '@mielui/svelte/components/card'");
        expect(page).not.toMatch(/<(?:button|input|textarea|select)\b/);
    });
});
