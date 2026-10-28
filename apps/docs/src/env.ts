import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
    // Optional: without it, dev falls back to a local registry and production shows built-in themes only.
    THEME_REGISTRY_URL: {
        schema: (input) => input ?? ''
    }
});
