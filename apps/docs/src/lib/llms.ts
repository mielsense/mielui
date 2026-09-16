import { changelogLlmVersions, changelogVersions } from '$lib/changelog';
import { componentGroups, components, sanitizeComponent } from '$lib/components';
import { componentReference } from '$lib/server/api-reference';
import { mieluiGuideMarkdown } from '$lib/skill';

type ComponentManifest = {
    name: string;
    version: string;
    visibility: 'public' | 'internal';
    description: string;
    components: string[];
    shared: string[];
};

const removedComponents = [
    {
        name: 'Modal',
        guidance: 'Rename Modal to Dialog and use the dialog package subpath or CLI target.'
    },
    { name: 'Fullscreen Nav', guidance: 'Compose Sheet with navigation links for a mobile menu.' },
    {
        name: 'Approval Request',
        guidance:
            'Compose `AlertDialog` directly with the review details and confirmation actions required by your workflow.'
    },
    {
        name: 'Marquee',
        guidance:
            'Use a restrained Tailwind animation around the content only when continuous motion is essential.'
    },
    {
        name: 'Panel',
        guidance: 'Use `Card.Root variant="panel"` for the former framed panel treatment.'
    },
    {
        name: 'Separator',
        guidance:
            'Use a semantic `<hr>` or a Tailwind border utility. Compound component separator parts remain available where documented.'
    }
] as const;

const manifests = import.meta.glob<{ manifest: ComponentManifest }>(
    '../../../../packages/mielui/src/{components,ai-components,blocks,chart-components}/*/manifest.ts',
    { eager: true }
);
const indexes = import.meta.glob<string>(
    '../../../../packages/mielui/src/{components,ai-components,blocks,chart-components}/*/index.ts',
    {
        eager: true,
        query: '?raw',
        import: 'default'
    }
);
const examples = import.meta.glob<string>('../routes/docs/components/*/examples/*.svelte', {
    eager: true,
    query: '?raw',
    import: 'default'
});

function sourceFor(sources: Record<string, string>, component: string, suffix: string): string {
    const entry = Object.entries(sources).find(([path]) =>
        path.endsWith(`/${component}/${suffix}`)
    );
    if (!entry) {
        throw new Error(`Missing ${suffix} for ${component}`);
    }
    return entry[1];
}

function fence(language: string, content: string): string {
    return `~~~~${language}\n${content.trim()}\n~~~~`;
}

function titleFromFile(path: string): string {
    return path
        .slice(path.lastIndexOf('/') + 1)
        .replace(/\.svelte$/, '')
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function componentMarkdown(component: string): string | undefined {
    if (!components.includes(component as (typeof components)[number])) {
        return undefined;
    }

    const manifestEntry = Object.entries(manifests).find(([path]) =>
        path.endsWith(`/${component}/manifest.ts`)
    );
    if (!manifestEntry) {
        throw new Error(`Missing manifest for ${component}`);
    }

    const manifest = manifestEntry[1].manifest;
    const componentExamples = Object.entries(examples)
        .filter(([path]) => path.includes(`/components/${component}/examples/`))
        .sort(([left], [right]) => left.localeCompare(right));
    const dependencies = manifest.components.length ? manifest.components.join(', ') : 'None';
    const shared = manifest.shared.length ? manifest.shared.join(', ') : 'None';
    const install =
        manifest.visibility === 'public'
            ? fence('sh', `pnpm dlx @mielui/svelte add ${component}`)
            : [
                  'This component is available from the package API but is not a standalone CLI registry target.',
                  '',
                  fence('sh', 'pnpm add @mielui/svelte')
              ].join('\n');

    return [
        `# ${sanitizeComponent(component)}`,
        '',
        manifest.description,
        '',
        `- Package: \`@mielui/svelte\``,
        `- Component version: \`${manifest.version}\``,
        `- Depends on Mielui components: ${dependencies}`,
        `- Shared utilities: ${shared}`,
        '',
        '## Install',
        '',
        install,
        '',
        '## API',
        '',
        'This reference is generated at build time from the component manifest, public `index.ts`, and documentation examples below. Changes to those source files are reflected here in the published Markdown. Standard Svelte and HTML attributes accepted by the exported prop types are supported.',
        '',
        ...componentReference(component).flatMap((part) => [
            '',
            `### ${part.name}`,
            '',
            '| Prop | Type | Default | Required | Bindable |',
            '| --- | --- | --- | --- | --- |',
            ...part.properties
                .filter((property) => !property.inherited)
                .map(
                    (property) =>
                        `| ${property.name} | ${property.type.replaceAll('|', '\\|')} | ${(property.default ?? '—').replaceAll('|', '\\|')} | ${property.required ? 'Yes' : 'No'} | ${property.bindable ? 'Yes' : 'No'} |`
                ),
            '',
            part.properties.some((property) => property.inherited)
                ? 'Also accepts the native HTML attributes and events listed in the rendered API reference.'
                : ''
        ]),
        '',
        '### Public types',
        '',
        fence('ts', sourceFor(indexes, component, 'index.ts')),
        ...(componentExamples.length
            ? [
                  '',
                  '## Examples',
                  ...componentExamples.flatMap(([path, source]) => [
                      '',
                      `### ${titleFromFile(path)}`,
                      '',
                      fence('svelte', source)
                  ])
              ]
            : []),
        '',
        `For the rendered reference, visit [/docs/components/${component}](/docs/components/${component}).`,
        ''
    ].join('\n');
}

export function brandMarkMarkdown(): string {
    return [
        '# Brand Mark',
        '',
        'The Mielui brand mark is a package-only visual asset. It is exported from the package root and the dedicated `brand-mark` path, but it is not a CLI registry component.',
        '',
        '## Install',
        '',
        fence('sh', 'pnpm add @mielui/svelte'),
        '',
        '## API',
        '',
        '- `size?: number` sets both dimensions in pixels and defaults to `30`.',
        '- `class?: string` adds utility classes to the outer `span`.',
        '- `label?: string` gives the mark an accessible image name. Without a label, the mark is decorative and hidden from assistive technology.',
        '',
        '## Example',
        '',
        fence(
            'svelte',
            `import { BrandMark } from '@mielui/svelte';\n\n<BrandMark size={36} label="Mielui" />`
        ),
        '',
        'For a narrower import, use `@mielui/svelte/brand-mark`.',
        ''
    ].join('\n');
}

const coreDocs = {
    introduction: `# Introduction

mielui is a Svelte 5 and Tailwind CSS v4 component library. Install it as a package or use the CLI to copy component source into your project.

## Requirements

- Svelte 5
- Tailwind CSS v4

## Quick start

~~~~sh
pnpm add @mielui/svelte
# then in your CSS:
# @import '@mielui/svelte/ui.css';
~~~~

~~~~sh
pnpm dlx @mielui/svelte init -y
pnpm dlx @mielui/svelte add button
~~~~
`,
    installation: `# Installation

Install Mielui as a package when you want dependency-managed components, or initialize it with the CLI when you want to own the copied source.

## Package

~~~~sh
pnpm add @mielui/svelte
~~~~

Add the token sheet to your CSS:

~~~~css
@import '@mielui/svelte/ui.css';
~~~~

## CLI

~~~~sh
pnpm dlx @mielui/svelte init
pnpm dlx @mielui/svelte add button
~~~~
`,
    theming: `# Theming

Mielui components use CSS custom properties from \`@mielui/svelte/ui.css\`. Import that stylesheet, then override the tokens in your application CSS to adapt colors, radii, typography, and spacing to your product.

See the rendered guide at [/docs/theming](/docs/theming) for token examples and theme presets.
`
} as const;

export function coreMarkdown(page: keyof typeof coreDocs): string {
    return coreDocs[page];
}

export function llmsTxt(origin: string): string {
    const links = [
        ['Complete documentation', '/llms-full.txt'],
        ['Agent skill', '/docs/agent-skill.md'],
        ['Actions', '/docs/actions.md'],
        ['Morph', '/docs/actions/morph.md'],
        ['Shimmer', '/docs/actions/shimmer.md'],
        ['Introduction', '/docs/introduction.md'],
        ['Installation', '/docs/installation.md'],
        ['Theming', '/docs/theming.md'],
        ['Changelog', '/docs/changelog.md'],
        ['Components index', '/docs/components.md'],
        ['Brand Mark', '/docs/brand-mark.md'],
        ['Mielui skill', '/docs/skill.md'],
        ['Component selection', '/docs/component-selection.md'],
        ['Design language', '/docs/design-language.md'],
        ['XML sitemap', '/sitemap.xml'],
        ...changelogVersions.map((version) => [`Changelog ${version}`, `/changelog/${version}.md`]),
        ...changelogLlmVersions.map((version) => [
            `Changelog ${version} LLM context`,
            `/changelog/${version}/llm.md`
        ]),
        ...components.map((component) => [
            sanitizeComponent(component),
            `/docs/components/${component}.md`
        ])
    ];

    return [
        '# mielui',
        '',
        'Svelte 5 and Tailwind CSS v4 component library. Use these Markdown resources for implementation details, public APIs, runnable examples, and version-specific upgrade notes.',
        '',
        `The current catalog contains ${components.length} components. Brand Mark is a package-only asset. Approval Request, Fullscreen Nav, Marquee, Panel, and Separator were removed as standalone components; migration guidance is in the components index.`,
        '',
        '## Agent skill',
        '',
        'Install the Mielui skill to give supported coding agents live, version-aware component guidance, AI interface composition patterns, and Mielui design language:',
        '',
        fence('sh', 'npx skills add mielsense/mielui --skill mielui'),
        '',
        `The skill fetches ${origin}/llms.txt as the live catalog. If you are reading this file directly, follow the usage guide below, then load only the Markdown pages you need.`,
        '',
        '## How to use Mielui',
        '',
        mieluiGuideMarkdown(origin),
        '',
        '## Documentation',
        '',
        ...links.map(([title, path]) => `- [${title}](${new URL(path, origin).href})`),
        ''
    ].join('\n');
}

export function componentsMarkdown(): string {
    return [
        '# mielui components',
        '',
        'Each component reference is generated at build time from its package manifest, public API source, and Svelte examples. Published Markdown reflects changes to those canonical sources.',
        '',
        ...componentGroups.flatMap((group) => [
            `## ${group.heading}`,
            '',
            ...group.items.map(
                (component) =>
                    `- [${sanitizeComponent(component)}](/docs/components/${component}.md)`
            ),
            ...(group.items.length === 0 ? ['No chart components yet.'] : []),
            ''
        ]),
        '',
        '## Package assets',
        '',
        '- [Brand Mark](/docs/brand-mark.md) - package-only logo component; not available through `mielui add`.',
        '',
        '## Removed components',
        '',
        'These names are no longer standalone package exports or CLI installation targets.',
        '',
        ...removedComponents.map(({ name, guidance }) => `- **${name}:** ${guidance}`),
        ''
    ].join('\n');
}
