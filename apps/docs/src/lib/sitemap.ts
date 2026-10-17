import { changelogLlmVersions, changelogVersions } from '$lib/changelog';
import { catalogPages, components, componentTypeHref } from '$lib/components';
import { componentGuidePages } from '$lib/docs-pages';

export const htmlDocPaths = [
    '/',
    '/docs/introduction',
    '/docs/installation',
    '/docs/theming',
    '/docs/agent-skill',
    '/docs/actions',
    '/docs/actions/morph',
    '/docs/actions/shimmer',
    '/docs/actions/number-shuffle',
    '/docs/changelog',
    '/docs/components',
    '/studio',
    ...catalogPages.map((group) => componentTypeHref(group.id)),
    ...componentGuidePages.map((guide) => guide.href),
    ...components.map((component) => `/docs/components/${component}`)
];

export const llmDocPaths = [
    '/llms.txt',
    '/llms-full.txt',
    ...componentGuidePages.map((guide) => `${guide.href}.md`),
    '/docs/agent-skill.md',
    '/docs/actions.md',
    '/docs/actions/morph.md',
    '/docs/actions/shimmer.md',
    '/docs/actions/number-shuffle.md',
    '/docs/introduction.md',
    '/docs/installation.md',
    '/docs/theming.md',
    '/docs/changelog.md',
    '/docs/components.md',
    ...catalogPages.map((group) => `${componentTypeHref(group.id)}.md`),
    '/docs/brand-mark.md',
    '/docs/skill.md',
    '/docs/design-skill.md',
    '/docs/component-selection.md',
    '/docs/design-language.md',
    ...changelogVersions.map((version) => `/changelog/${version}.md`),
    ...changelogLlmVersions.map((version) => `/changelog/${version}/llm.md`),
    ...components.map((component) => `/docs/components/${component}.md`)
];

export function sitemapPaths(): string[] {
    return [...htmlDocPaths, ...llmDocPaths];
}
