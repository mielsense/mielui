import { components, sanitizeComponent } from '$lib/components';
import type { SearchEntry, SearchIndex } from '$lib/components/search/types';
import { componentReference } from '$lib/server/api-reference';

const pages = import.meta.glob<string>('/src/routes/docs/**/+page.svelte', {
    eager: true,
    query: '?raw',
    import: 'default'
});

const generic = new Set(['children', 'class', 'style', 'id', 'ref', 'element', 'child']);
const heading =
    /id="([a-z0-9-]+)"[^>]*>\s*(?:<div>\s*)?<Typography\.H[23][^>]*>\s*([^<{]+?)\s*<\/Typography/g;
const skipped = new Set(['Installation', 'Usage', 'Examples']);

function pageName(path: string) {
    const segments = path.replace('/src/routes', '').replace('/+page.svelte', '').split('/');
    const slug = segments.at(-1) ?? '';

    return {
        href: segments.join('/'),
        title: sanitizeComponent(slug)
    };
}

function sectionEntries(): SearchEntry[] {
    return Object.entries(pages).flatMap(([path, source]) => {
        const page = pageName(path);

        return [...source.matchAll(heading)]
            .filter((match) => !skipped.has(match[2]))
            .map((match) => ({
                label: match[2],
                hint: page.title,
                href: `${page.href}#${match[1]}`
            }));
    });
}

function propEntries(): SearchEntry[] {
    return components.flatMap((component) => {
        const seen = new Set<string>();
        const title = sanitizeComponent(component).replaceAll(' ', '');

        return componentReference(component).flatMap((part) =>
            part.properties
                .filter((property) => !property.inherited && !generic.has(property.name))
                .filter((property) => {
                    const key = `${part.name}.${property.name}`;
                    if (seen.has(key)) {
                        return false;
                    }
                    seen.add(key);

                    return true;
                })
                .map((property) => ({
                    label: property.name,
                    hint: part.name === title ? title : `${title}.${part.name}`,
                    href: `/docs/components/${component}#api-reference`
                }))
        );
    });
}

export function searchIndex(): SearchIndex {
    return {
        sections: sectionEntries(),
        props: propEntries()
    };
}
