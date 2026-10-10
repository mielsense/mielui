import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
import { changelogLlmVersions, changelogVersions } from '$lib/changelog';
import { componentGroups, components, sanitizeComponent } from '$lib/components';
import { catalogSections, componentGuidePages } from '$lib/docs-pages';
import { componentReference } from '$lib/server/api-reference';
import { mieluiGuideMarkdown } from '$lib/skill';
import {
    classExample,
    dataUiExample,
    overrideCss,
    sourceExample,
    themeImport,
    themeJsonFields,
    tokenGroups
} from '$lib/theming';

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
const exampleModules = import.meta.glob<string>(
    ['../routes/docs/components/*/examples/*.ts', '!**/*.remote.ts'],
    {
        eager: true,
        query: '?raw',
        import: 'default'
    }
);

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

/** Modules the given example sources import by relative path, such as `./data`. */
function exampleModuleSections(component: string, sources: string[]): string[] {
    return Object.entries(exampleModules)
        .filter(([path]) => path.includes(`/components/${component}/examples/`))
        .sort(([left], [right]) => left.localeCompare(right))
        .flatMap(([path, source]) => {
            const file = path.slice(path.lastIndexOf('/') + 1);
            const specifier = `./${file.replace(/\.ts$/, '')}`;
            const imported = sources.some((example) => example.includes(`'${specifier}'`));
            if (!imported) {
                return [];
            }

            return [
                '',
                `### ${file}`,
                '',
                `The examples import this module as \`${specifier}\`. It sits beside them in the same folder.`,
                '',
                fence('ts', source)
            ];
        });
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
                        `| ${property.name} | ${property.type.replaceAll('|', '\\|')} | ${(property.default ?? '-').replaceAll('|', '\\|')} | ${property.required ? 'Yes' : 'No'} | ${property.bindable ? 'Yes' : 'No'} | ${property.description.replaceAll('|', '\\|')} |`
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
                  ]),
                  ...exampleModuleSections(
                      component,
                      componentExamples.map(([, source]) => source)
                  )
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
    const guideSources = guide.examples.map((example) => {
        return sourceFor(examples, component, `examples/${example.name}.svelte`);
    });

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
        ...exampleModuleSections(component, guideSources),
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

function themingMarkdown(): string {
    const presetSlugs = builtInThemePresets.map((preset) => `\`${preset.slug}\``);
    const presetList = `${presetSlugs.slice(0, -1).join(', ')}, and ${presetSlugs.at(-1)}`;

    return [
        '# Theming',
        '',
        'Components read CSS variables. Change tokens for a system-wide look, or override a single component with classes and selectors.',
        '',
        '## Where tokens live',
        '',
        'Package installs use `@mielui/svelte/ui.css`. CLI installs use `src/lib/mielui/ui.css`. Both define the same color, typography, radius, and motion tokens.',
        '',
        '## Override tokens',
        '',
        "Set values in your app CSS after importing Mielui's sheet. Light defaults go in `@theme`. Dark values go under `.dark`.",
        '',
        fence('css', overrideCss),
        '',
        'The focus ring, the info status color, and the accent tint are mixed from `--color-primary`, so one value rebrands all of them. Set `--color-on-primary` when the text on filled buttons needs a different color.',
        '',
        '## Useful public tokens',
        '',
        '| Group | Tokens |',
        '| --- | --- |',
        ...tokenGroups.map((group) => {
            return `| ${group.group} | ${group.tokens.map((token) => `\`${token}\``).join(', ')} |`;
        }),
        '',
        "Controls use three heights. Icon buttons match the medium height. `--focus-ring` is a 3px ring at half the primary color, and it composes with each control's existing edge. The default radius scale is 8, 10, 14, and 18 pixels from small to extra large. Plates use `--radius-2xl`, 26 pixels, and everything pressable uses `--radius-control`: 4 pixels in the sharp scale, 12 in the default scale, and a pill in the rounded scale.",
        '',
        'Use the status text tokens for success, warning, error, and info copy on tinted backgrounds and cards. They reach 4.5:1 contrast, while the raw status colors remain for fills, icons, and charts.',
        '',
        '## Dark mode',
        '',
        'Toggle a `.dark` class on `<html>`. Components do not manage the class for you.',
        '',
        '## Built-in presets',
        '',
        `Mielui ships ${builtInThemePresets.length} built-in presets: ${presetList}. Preview them on the [themes page](/themes), where you can copy each preset's CSS or JSON.`,
        '',
        'With the CLI, install a preset into `theme.css`:',
        '',
        fence('sh', 'pnpm dlx @mielui/svelte add theme open'),
        '',
        'Import it after `ui.css` to apply its overrides:',
        '',
        fence('css', themeImport),
        '',
        '`mielui list` shows available built-in theme slugs.',
        '',
        '## Theme Studio',
        '',
        '[Theme Studio](/studio) lets you start from a preset and adjust colors, fonts, spacing, motion, and surface effects. Open Advanced colors for individual color tokens.',
        '',
        'Choose Export theme, open the CLI tab, download `mielui-theme.json` into your project root, and run the command for a new or existing Mielui setup. The JSON includes both color modes and all Studio overrides. New setups get `styles.css`, which imports `ui.css` followed by `theme.css`. Load that stylesheet in your root layout. Fonts must also be loaded by your app.',
        '',
        fence('sh', 'pnpm dlx @mielui/svelte init --preset ./mielui-theme.json'),
        '',
        'For an existing setup, run the command below. It replaces `theme.css`. Built-in preset slugs, such as `default`, can be used in place of the JSON path.',
        '',
        fence('sh', 'pnpm dlx @mielui/svelte add theme ./mielui-theme.json'),
        '',
        '## Theme JSON',
        '',
        'Theme JSON version 4 is the format shared by Studio and the CLI. Export it from Studio to preserve both color modes and your overrides.',
        '',
        ...themeJsonFields.map((field) => `- ${field}`),
        '',
        'Set `motion: "none"` to disable animations, including dialogs, menus, and the traveling highlight. Edge highlight strength ranges from 0 to 1.',
        '',
        '## Global glass surfaces',
        '',
        'Surfaces are solid by default. Set `--mielui-surface: glass` on `:root` and components with surface support inherit that choice when the prop is omitted. Set `surface="solid"` or `surface="glass"` on one component to override the theme. Put the variable on `:root` so portaled menus and dialogs inherit it too.',
        '',
        fence('css', ':root {\n  --mielui-surface: glass;\n}'),
        '',
        'The global setting uses CSS style queries. Browsers without style-query support retain solid surfaces. Explicit `surface="glass"` still works with backdrop-filter support. Reduced transparency keeps an opaque background and removes blur.',
        '',
        '## Class overrides',
        '',
        'Styled components accept `class`. Use Tailwind utilities or your own classes for one-off tweaks. Your classes win over the component defaults.',
        '',
        fence('svelte', classExample),
        '',
        '## Component selectors',
        '',
        'Components render `data-ui`, and often `data-variant` or `data-size`. Scope CSS to a family without forking files.',
        '',
        fence('css', dataUiExample),
        '',
        '## Edit the source',
        '',
        'With the CLI path, files live under `src/lib/mielui/components/<name>/`. Edit them when you need behavior changes, not just style.',
        '',
        fence('console', sourceExample),
        '',
        '## Borders',
        '',
        'Framed surfaces are a white frame holding a recessed inset in the page background. Set `chrome.borders` to `"single"` so the inset meets the border of the frame, or `"double"` for a gutter between the two. The default is `"single"`.',
        '',
        fence(
            'ts',
            "const theme = {\n    ...DEFAULT_THEME,\n    chrome: { borders: 'single' as const }\n};\n\nconst css = themeToCss(theme);"
        ),
        '',
        'The setting covers inset layouts: dialogs, sheets, drawers, toasts, Notch, code blocks, diffs, inset tables, inset and panel cards, alerts, and composers. Menus, selects, comboboxes, popovers, hover cards, date-picker panels, and chart tooltips always use a single border.',
        '',
        '## Chart colors',
        '',
        '`--chart-1` through `--chart-5` color data series in order. Cartesian charts, pie charts, gauges, and heatmaps read them. Explicit series colors and semantic gauge tones still take precedence.',
        '',
        fence(
            'css',
            ':root {\n  --chart-1: #b8a1f2;\n  --chart-2: #f49d9d;\n  --chart-3: #8bc7f5;\n  --chart-4: #8ed8b0;\n  --chart-5: #f2d77d;\n}'
        ),
        '',
        '## Inset strip position',
        '',
        '`--mielui-inset-position` moves exposed chrome above or below its inset content. It takes `top` or `bottom`. Without that token, components keep their authored order. Override it locally with `class="[--mielui-inset-position:top]"` when a header must stay above its content. Data tables keep filters above rows and pagination below them.',
        '',
        '## Edge highlights',
        '',
        'Set `chrome.edgeHighlight` to adjust the light on lit pills: filled buttons, moving thumbs, and selected segments. It also scales the light edge on keycaps. Text fields, selection triggers, and outline buttons stay flat. The default is 0.33. Use 0 to remove that light or 1 for full strength.',
        '',
        fence(
            'ts',
            'const theme = {\n    ...DEFAULT_THEME,\n    chrome: { edgeHighlight: 0.5 }\n};\n\nconst css = themeToCss(theme);'
        ),
        '',
        'For the rendered guide, visit [/docs/theming](/docs/theming).',
        ''
    ].join('\n');
}

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
    theming: themingMarkdown()
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
        ['Mielui design skill', '/docs/design-skill.md'],
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
        'Install the design skill as well when the task is a whole page, app, or website. It covers app shells, dashboards, settings, chat workspaces, and marketing pages, with the spacing and type scales and layout skeletons:',
        '',
        fence('sh', 'npx skills add mielsense/mielui --skill mielui-design'),
        '',
        `Its instructions are at ${origin}/docs/design-skill.md.`,
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
