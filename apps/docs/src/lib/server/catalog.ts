type CatalogManifest = {
    name: string;
    description: string;
};

const manifests = import.meta.glob<{ manifest: CatalogManifest }>(
    '../../../../../packages/mielui/src/{components,ai-components,blocks,chart-components}/*/manifest.ts',
    { eager: true }
);

const pageSources = import.meta.glob<string>(
    '../../routes/docs/{components,actions}/*/+page.svelte',
    {
        eager: true,
        query: '?raw',
        import: 'default'
    }
);

export const catalogDescriptions: Record<string, string> = {};

for (const { manifest } of Object.values(manifests)) {
    const firstSentence = manifest.description.match(/^.*?[.!?](?:\s|$)/)?.[0];
    catalogDescriptions[manifest.name] = (firstSentence ?? manifest.description).trim();
}

for (const [path, source] of Object.entries(pageSources)) {
    const slug = path.split('/').at(-2);
    const description =
        source.match(/<meta\s+name="description"\s+content="([^"]+)"/s)?.[1] ??
        source.match(/<PageIntro[^>]*>([^<]+)<\/PageIntro>/s)?.[1]?.trim();
    if (slug && description) {
        catalogDescriptions[slug] = description;
    }
}
