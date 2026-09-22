import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { MieluiConfig } from './types';

export const CONFIG_FILE = 'mielui.json';

export const DEFAULT_CONFIG: MieluiConfig = {
    dir: 'src/lib/mielui',
    alias: '$lib/mielui',
    registry: 'https://registry.ui.miel.my',
    components: {}
};

export function configPath(cwd: string) {
    return path.join(cwd, CONFIG_FILE);
}

/** Reads mielui.json from the project root, or null when not initialized. */
export async function loadConfig(cwd: string): Promise<MieluiConfig | null> {
    const file = configPath(cwd);
    if (!existsSync(file)) {
        return null;
    }
    const parsed = JSON.parse(await readFile(file, 'utf8')) as Partial<MieluiConfig>;
    return { ...DEFAULT_CONFIG, ...parsed, components: parsed.components ?? {} };
}

export async function saveConfig(cwd: string, config: MieluiConfig) {
    await writeFile(configPath(cwd), `${JSON.stringify(config, null, '\t')}\n`);
}
