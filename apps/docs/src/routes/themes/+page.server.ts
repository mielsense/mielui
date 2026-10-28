import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
import { listRegistryThemes } from '#lib/server/theme-registry.js';
import type { PageServerLoad } from './$types';

// The registry changes without a deploy, so this page stays server-rendered.
export const prerender = false;

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        return { themes: await listRegistryThemes(fetch) };
    } catch {
        return { themes: builtInThemePresets };
    }
};
