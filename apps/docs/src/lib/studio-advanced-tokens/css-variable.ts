export function parseCssVar(value: string): { name: string; fallback: string } | null {
    const match = value.trim().match(/^var\(\s*(--[a-z0-9-]+)(?:\s*,\s*((?:.|\n)+))?\s*\)$/i);
    if (!match?.[1]) {
        return null;
    }

    return {
        name: match[1],
        fallback: match[2]?.trim() ?? ''
    };
}
