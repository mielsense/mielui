import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';
import { componentGroups, components } from '$lib/components';

it('lists each component once, in its source category, with docs and API coverage', () => {
    expect(new Set(components).size).toBe(components.length);
    for (const group of componentGroups) {
        for (const slug of group.items) {
            const source = path.resolve('../../packages/mielui/src', group.id, slug, 'index.ts');
            expect(existsSync(source), `${slug}: source category`).toBe(true);
            const page = path.resolve('src/routes/docs/components', slug, '+page.svelte');
            expect(existsSync(page), `${slug}: docs page`).toBe(true);
            const text = readFileSync(page, 'utf8');
            expect(
                text.match(/<ComponentPreview[\s>]/g)?.length ?? 0,
                `${slug}: examples`
            ).toBeGreaterThanOrEqual(2);
            const reference = path.resolve('src/lib/generated/api', `${slug}.json`);
            expect(
                JSON.parse(readFileSync(reference, 'utf8')).length,
                `${slug}: API reference`
            ).toBeGreaterThan(0);
        }
    }
});
