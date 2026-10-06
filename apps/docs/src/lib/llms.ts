import { changelogLlmVersions, changelogVersions } from '$lib/changelog';
import { componentGroups, components, sanitizeComponent } from '$lib/components';
import { catalogSections, componentGuidePages } from '$lib/docs-pages';
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
    const guides = componentGuidePages.filter((guide) => guide.component === component);
    const guideExamples = new Set(
        guides.flatMap((guide) => guide.examples.map((example) => example.name))
    );
    const componentExamples = Object.entries(examples)
        .filter(
            ([path]) =>
                path.includes(`/components/${component}/examples/`) &&
                !guideExamples.has(path.slice(path.lastIndexOf('/') + 1).replace(/\.svelte$/, ''))
        )
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
        ...(guides.length
            ? [
                  '## Chart guides',
                  '',
                  ...guides.map(
                      (guide) => `- [${guide.title}](${guide.href}.md): ${guide.description}`
                  ),
                  ''
              ]
            : []),
        '## API',
        '',
        'This reference is generated at build time from the component manifest, public `index.ts`, and documentation examples below. Changes to those source files are reflected here in the published Markdown. Standard Svelte and HTML attributes accepted by the exported prop types are supported.',
        '',
        ...componentReference(component).flatMap((part) => [
            '',
            `### ${part.name}`,
            '',
            '| Prop | Type | Default | Required | Bindable | Description |',
            '| --- | --- | --- | --- | --- | --- |',
            ...part.properties
                .filter((property) => !property.inherited)
                .map(
                    (property) =>
                        `| ${property.name} | ${property.type.replaceAll('|', '\\|')} | ${(property.default ?? '—').replaceAll('|', '\\|')} | ${property.required ? 'Yes' : 'No'} | ${property.bindable ? 'Yes' : 'No'} | ${property.description.replaceAll('|', '\\|')} |`
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

export function chartGuideMarkdown(component: string, slug: string): string | undefined {
    const guide = componentGuidePages.find(
        (entry) => entry.component === component && entry.slug === slug
    );
    if (!guide) {
        return undefined;
    }
    const referencePath = `/docs/components/${component}`;
    return [
        `# ${guide.title}`,
        '',
        guide.description,
        '',
        '## Install',
        '',
        fence('sh', `pnpm dlx @mielui/svelte add ${component}`),
        '',
        '## Usage',
        '',
        ...guide.usage.flatMap((paragraph) => [paragraph, '']),
        `Use the [${sanitizeComponent(component)} API reference](${referencePath}.md) for all exported parts and their props.`,
        '',
        '## Examples',
        ...guide.examples.flatMap((example) => {
            const source = sourceFor(examples, component, `examples/${example.name}.svelte`);
            return [
                '',
                `### ${example.title}`,
                '',
                example.description,
                '',
                fence('svelte', source)
            ];
        }),
        '',
        `For the rendered guide, visit [${guide.title}](${guide.href}).`,
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

const catalogList = catalogSections
    .map((section) => `- [${section.label}](${section.href}): ${section.value}`)
    .join('\n');

const coreDocs = {
    introduction: `# Introduction

Mielui is a component library for Svelte 5 and Tailwind v4. It includes components, theme tokens, and a CLI for copying source into your project.

## Build with Mielui

Start with everyday controls, compose larger interfaces from named parts, and tune everything through one set of theme tokens. Each component page pairs a live preview with source examples and an API reference.

${catalogList}

## Choose how to use it

Both paths use the same components and theme system. Choose based on whether you want dependency updates or direct ownership of the implementation.

| Decision | Package import | CLI source copy |
| --- | --- | --- |
| Best fit | Use the library through its public API. | Adapt component internals for your product. |
| Source | Imported from \`@mielui/svelte\`. | Copied into your repository. |
| Customization | Compose parts, set props, and apply classes or tokens. | Use the same options, plus edit the source directly. |
| Updates | Upgrade the package dependency. | Review upstream changes alongside your local edits. |

Trying Mielui for the first time? Start with package imports. Choose source copy when you already know you need to change component behavior.

## Requirements

- Svelte 5.56 or newer, with or without SvelteKit
- Tailwind CSS v4
- pnpm, npm, Yarn, or Bun

Start with an existing Svelte app and import the Mielui stylesheet once at the application level.

## Quick start

Install the package:

~~~~sh
pnpm add @mielui/svelte
~~~~

Import the shared styles in your application stylesheet:

~~~~css
@import '@mielui/svelte/ui.css';
~~~~

Then use your first component:

~~~~svelte
<script>
  import { Button } from '@mielui/svelte';
</script>

<Button>Get started</Button>
~~~~

Prefer local source? Initialize the CLI and add a component instead:

~~~~sh
pnpm dlx @mielui/svelte init -y
pnpm dlx @mielui/svelte add button
~~~~

Follow [Installation](/docs/installation.md) for the local stylesheet import, component paths, and full setup for either approach.

## Make it your own

Set colors, typography, corners, spacing, and motion together in [Theme Studio](/studio). Preview the result on working components, then export CSS or JSON.

Compound components expose named parts such as Root, Trigger, and Content. Compose the parts shown on each component page, and use classes to adjust individual regions without replacing the whole component.

## Where to go next

- [Installation](/docs/installation.md): Set up package imports or the source-copy workflow.
- [Components](/docs/components.md): Explore live examples, supported props, and composition patterns.
- [Theming](/docs/theming.md): Apply a preset or connect theme tokens to your own design.
- [Agent skill](/docs/agent-skill.md): Give your coding agent Mielui-specific guidance for implementation.
`,
    installation: `# Installation

Install Mielui into your project.

## Prerequisites

- Svelte 5.56 or newer, with or without SvelteKit
- Tailwind CSS v4

## Package import

Install the library and import components from \`@mielui/svelte\`.

~~~~sh
pnpm add @mielui/svelte
~~~~

Import the stylesheet once in \`src/app.css\`. It already includes Tailwind, so remove any existing \`@import 'tailwindcss'\` line.

~~~~css
@import '@mielui/svelte/ui.css';
~~~~

Use a component:

~~~~svelte
<script>
  import { Button } from '@mielui/svelte';
</script>

<Button>Get started</Button>
~~~~

Compound components expose named parts. Import \`Dialog\` and compose \`Dialog.Root\` with \`Dialog.Content\` and the other parts you need.

## CLI source copy

The CLI copies source into your project. The package name is \`@mielui/svelte\`; the binary is \`mielui\`.

1. Create a project. Skip this and the next step if your app already has Svelte and Tailwind.

~~~~sh
pnpm dlx sv create my-app
~~~~

2. Add Tailwind v4.

~~~~sh
cd my-app
pnpm dlx sv add tailwindcss
~~~~

3. Initialize Mielui from the project root. This creates \`src/lib/mielui/\` for styles and utilities, plus \`mielui.json\`.

~~~~sh
pnpm dlx @mielui/svelte init -y
~~~~

4. Import the stylesheet. The copied stylesheet already includes Tailwind, so replace the \`@import 'tailwindcss'\` line that the Tailwind setup added.

~~~~css
/* src/app.css */
@import './lib/mielui/ui.css';
~~~~

5. Add components.

~~~~sh
pnpm dlx @mielui/svelte add button
pnpm dlx @mielui/svelte list
~~~~

6. Use them.

~~~~svelte
<script>
  import { Button } from '$lib/mielui/components/button';
</script>

<Button>Get started</Button>
~~~~

## Notes

- Tailwind v3 is not supported. Mielui needs v4 \`@theme\` and \`color-mix\`.
- Dark mode uses a \`.dark\` class on \`<html>\`.
- Built-in theme presets install with \`pnpm dlx @mielui/svelte add theme <slug>\`. Use \`default\` to start with the default preset.

## Next

- [Theming](/docs/theming.md): Apply your brand with a preset or your own tokens.
- [Components](/docs/components.md): Browse live examples and APIs.
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
        ['Number shuffle', '/docs/actions/number-shuffle.md'],
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
        ...componentGuidePages.map((guide) => [guide.title, `${guide.href}.md`]),
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
        `The current catalog contains ${components.length} components. Brand Mark is a package-only asset. Approval Request, Fullscreen Nav, Marquee, and Panel were removed as standalone components; migration guidance is in the components index.`,
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
