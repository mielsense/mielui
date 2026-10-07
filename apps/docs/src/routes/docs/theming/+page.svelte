<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Table from '@mielui/svelte/components/table';
    import * as Typography from '@mielui/svelte/components/typography';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
    import { resolve } from '$app/paths';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PackageCommand from '$lib/components/docs/package-command.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    const overrideCss = `@theme {
  --color-primary: #155eef;
  --color-background: #fcfcfd;
  --color-foreground: #101828;
  --radius-lg: 0.55rem;
  --font-sans: 'DM Sans', sans-serif;
}

.dark {
  --color-background: #0d1118;
  --color-foreground: #f5f7fb;
  --color-primary: #7aa2ff;
}`;

    const themeImport = `@import './lib/mielui/ui.css';
@import './lib/mielui/theme.css';`;

    const classExample = '<Button class="w-full rounded-2xl">Continue</Button>';

    const dataUiExample = `[data-ui='button'][data-variant='primary'] {
  border-radius: 999px;
}

[data-ui='badge'][data-variant='secondary'] {
  text-transform: uppercase;
}`;

    const sourceExample = `# after: pnpm dlx @mielui/svelte add button
src/lib/mielui/components/button/
├── button.svelte
└── index.ts`;

    const presetSlugs = builtInThemePresets.map((preset) => `\`${preset.slug}\``);

    const presetList = `${presetSlugs.slice(0, -1).join(', ')}, and ${presetSlugs.at(-1)}`;

    const tokenGroups = [
        {
            group: 'Color',
            tokens: [
                '--color-background',
                '--color-card',
                '--color-panel',
                '--color-secondary',
                '--color-foreground',
                '--color-foreground-muted',
                '--color-primary',
                '--color-on-primary',
                '--color-button-foreground',
                '--color-border',
                '--color-input',
                '--color-ring'
            ]
        },
        {
            group: 'Status text',
            tokens: [
                '--mielui-success-text',
                '--mielui-warning-text',
                '--mielui-error-text',
                '--mielui-info-text'
            ]
        },
        {
            group: 'Controls',
            tokens: [
                '--size-control-sm',
                '--size-control-md',
                '--size-control-lg',
                '--size-icon-md',
                '--mielui-control-border',
                '--focus-ring'
            ]
        },
        {
            group: 'Type',
            tokens: [
                '--font-sans',
                '--font-mono',
                '--font-header',
                '--font-size-header',
                '--font-weight-body',
                '--font-weight-label',
                '--font-weight-button'
            ]
        },
        {
            group: 'Radius and density',
            tokens: [
                '--radius-sm',
                '--radius-md',
                '--radius-lg',
                '--radius-xl',
                '--mielui-space-unit'
            ]
        },
        {
            group: 'Motion',
            tokens: [
                '--motion-duration-hover',
                '--motion-duration-menu',
                '--motion-duration-panel',
                '--motion-duration-sheet'
            ]
        },
        {
            group: 'Elevation',
            tokens: [
                '--elevation-1',
                '--elevation-float',
                '--elevation-control',
                '--elevation-control-edge',
                '--elevation-modal'
            ]
        }
    ];

    const themeJsonFields = [
        "`foundation.light` and `foundation.dark` hold each mode's base, border, background, secondary, foreground, foregroundMuted, and onPrimary colors.",
        '`typography` contains headerSize, headerWeight, and roleWeights for body, label, button, badge, and description text.',
        '`tokens.shared`, `tokens.light`, and `tokens.dark` hold raw token overrides, including per-mode values for `--color-primary`.',
        '`chrome` controls borders, edgeHighlight, surfaceShadows, controlShadows, dialogShadows, travelingHighlight, primaryStroke, and interactiveCursor. Turning off travelingHighlight keeps the selected fill and removes its movement.'
    ];
</script>

<svelte:head>
    <title>Mielui · Theming</title>
    <meta
        name="description"
        content="Theme and style Mielui with CSS variables, classes, and data-ui selectors."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Theming">
        Components read CSS variables. Change tokens for system-wide look, or override a single
        component with classes and selectors.
    </PageIntro>

    <section id="where-tokens-live" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Where tokens live</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Package installs use `@mielui/svelte/ui.css`. CLI installs use `src/lib/mielui/ui.css`. Both define the same color, typography, radius, and motion tokens."
            />
        </Typography.Text>
    </section>

    <section id="theme-studio" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Theme Studio</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text={`[Theme Studio](${resolve('/studio')}) lets you start from a preset and adjust colors, fonts, spacing, motion, and surface effects. Open Advanced colors for individual color tokens.`}
            />
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            Studio saves your draft locally when browser storage is available. If storage is blocked
            or full, download the theme JSON to preserve your changes.
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Choose Export theme, open the CLI tab, download `mielui-theme.json` into your project root, and run the command for a new or existing Mielui setup. The JSON includes both color modes and all Studio overrides. New setups get `styles.css`, which imports `ui.css` followed by `theme.css`. Load that stylesheet in your root layout. Fonts must also be loaded by your app."
            />
        </Typography.Text>
        <PackageCommand command="pnpm dlx @mielui/svelte init --preset ./mielui-theme.json" />
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="For an existing setup, run the command below. It replaces `theme.css`. Built-in preset slugs, such as `default`, can be used in place of the JSON path."
            />
        </Typography.Text>
        <PackageCommand command="pnpm dlx @mielui/svelte add theme ./mielui-theme.json" />
    </section>

    <section id="glass-surfaces" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Global glass surfaces</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text='Surfaces are solid by default. Turn glass on under Surface in Studio, or set `--mielui-surface: glass` on `:root`. Components with surface support inherit that choice when the prop is omitted. Set `surface="solid"` or `surface="glass"` on one component to override the theme. Put the variable on `:root` so portaled menus and dialogs inherit it too.'
            />
        </Typography.Text>
        <CodeBlock
            lang="css"
            copy="overlay"
            code={`:root {
  --mielui-surface: glass;
}`}
        />
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text='The global setting uses CSS style queries. Browsers without style-query support retain solid surfaces. Explicit `surface="glass"` still works with backdrop-filter support. Reduced transparency keeps an opaque background and removes blur.'
            />
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            The glass backdrop in the Studio toolbar adds color behind the preview. It is a viewing
            aid and is not included in your exported theme.
        </Typography.Text>
    </section>

    <section id="override-tokens" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Override tokens</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Set values in your app CSS after importing Mielui's sheet. Light defaults go in `@theme`. Dark values go under `.dark`."
            />
        </Typography.Text>
        <CodeBlock code={overrideCss} lang="css" copy="overlay" />
    </section>

    <section id="useful-tokens" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Useful public tokens</Typography.H2>
        <Table.ScrollArea>
            <Table.Root variant="inset" class="table-fixed">
                <Table.Caption class="sr-only">Public theme tokens by group</Table.Caption>
                <Table.Header>
                    <Table.Row class="hover:bg-transparent">
                        <Table.Head class="w-[36%] sm:w-1/4">Group</Table.Head>
                        <Table.Head>Tokens</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each tokenGroups as group (group.group)}
                        <Table.Row class="align-top hover:bg-transparent">
                            <Table.Head
                                {...{ scope: 'row' as const }}
                                class="border-b-0 align-top font-medium text-foreground"
                            >
                                {group.group}
                            </Table.Head>
                            <Table.Cell class="align-top">
                                <ul class="m-0 flex list-none flex-wrap gap-1.5 p-0">
                                    {#each group.tokens as token (token)}
                                        <li>
                                            <Typography.InlineCode>{token}</Typography.InlineCode>
                                        </li>
                                    {/each}
                                </ul>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Controls use three heights. Icon buttons match the medium height. `--focus-ring` is a 2px ring at 80% of the primary color, and it composes with each control's existing edge. The default radius scale is 8, 10, 14, and 20 pixels from small to extra large."
            />
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Use the status text tokens for success, warning, error, and info copy on tinted backgrounds and cards. They reach 4.5:1 contrast, while the raw status colors remain for fills, icons, and charts."
            />
        </Typography.Text>
    </section>

    <section id="built-in-presets" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Built-in presets</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text={`Mielui ships ${builtInThemePresets.length} built-in presets: ${presetList}. Preview them live on the [themes page](${resolve('/themes')}), where you can copy each preset's CSS or JSON.`}
            />
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            <InlineText text="With the CLI, install a preset into `theme.css`:" />
        </Typography.Text>
        <PackageCommand command="pnpm dlx @mielui/svelte add theme open" />
        <Typography.Text variant="body" class="m-0">
            <InlineText text="Import it after `ui.css` to apply its overrides:" />
        </Typography.Text>
        <CodeBlock code={themeImport} lang="css" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            <InlineText text="`mielui list` shows available built-in theme slugs." />
        </Typography.Text>
    </section>

    <section id="dark-mode" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Dark mode</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Toggle a `.dark` class on `<html>`. Components do not manage the class for you."
            />
        </Typography.Text>
    </section>

    <section id="theme-json" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Theme JSON</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Theme JSON version 4 is the format shared by Studio and the CLI. Export it from Studio
            to preserve both color modes and your overrides.
        </Typography.Text>
        <ul
            class="m-0 flex list-disc flex-col gap-2 ps-5 text-base leading-relaxed text-foreground marker:text-foreground-muted"
        >
            {#each themeJsonFields as field (field)}
                <li>
                    <InlineText text={field} />
                </li>
            {/each}
        </ul>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text='Set `motion: "none"` to disable animations, including dialogs, menus, and the traveling highlight. Edge highlight strength ranges from 0 to 1.'
            />
        </Typography.Text>
    </section>

    <section id="class-prop" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Class overrides</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Styled components accept `class`. Use Tailwind utilities or your own classes for one-off tweaks."
            />
        </Typography.Text>
        <CodeBlock code={classExample} lang="svelte" copy="overlay" />
    </section>

    <section id="data-ui" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Component selectors</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Components render `data-ui`, and often `data-variant` or `data-size`. Scope CSS to a family without forking files."
            />
        </Typography.Text>
        <CodeBlock code={dataUiExample} lang="css" copy="overlay" />
    </section>

    <section id="edit-source" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Edit the source</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="With the CLI path, files live under `src/lib/mielui/components/<name>/`. Edit them when you need behavior changes, not just style."
            />
        </Typography.Text>
        <CodeBlock code={sourceExample} lang="shell" copy="overlay" />
    </section>

    <section id="overlay-borders" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Borders</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text='Set `chrome.borders` to `"single"` for one perimeter border on framed surfaces, or `"double"` for the inset frame. The default is `"single"`. Explicit saved settings remain respected. Studio exposes this choice under Appearance.'
            />
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            lang="typescript"
            code={`const theme = {
    ...DEFAULT_THEME,
    chrome: { borders: 'single' as const }
};

const css = themeToCss(theme);`}
        />
        <Typography.Text variant="body" class="m-0">
            The setting covers inset layouts: dialogs, sheets, drawers, toasts, Notch, code blocks,
            diffs, inset tables, inset and panel cards, alerts, and composers. Inset variants keep
            their content padding and footer composition.
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            Menus, selects, comboboxes, popovers, hover cards, date-picker panels, and chart
            tooltips always use a single border, so a small floating panel never shows stacked
            edges. Glass, shadows, focus, and edge highlights remain independent of the setting.
        </Typography.Text>
    </section>

    <section id="chart-colors" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Chart colors</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Studio's Color → Chart colors controls edit `--chart-1` through `--chart-5` for the active light or dark theme. The defaults are pastel purple, pink, blue, green, and yellow. Cartesian charts, pie charts, gauges, heatmaps, and their demos use these tokens. Explicit series colors and semantic gauge tones still take precedence."
            />
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            lang="css"
            code={`:root {
  --chart-1: #b8a1f2;
  --chart-2: #f49d9d;
  --chart-3: #8bc7f5;
  --chart-4: #8ed8b0;
  --chart-5: #f2d77d;
}`}
        />
    </section>

    <section id="inset-position" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Inset strip position</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="In Theme Studio, Surface, then Inset strip, moves exposed chrome above or below its inset content. Studio exports `--mielui-inset-position` as `top` or `bottom`. Without that token, components keep their authored order."
            />
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text='Override it locally with `class="[--mielui-inset-position:top]"` when a header must stay above its content, as the installation command tabs do. Data tables keep filters above rows and pagination below them.'
            />
        </Typography.Text>
    </section>

    <section id="edge-highlights" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Edge highlights</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Set `chrome.edgeHighlight` to adjust the thin light-catching edges on filled buttons, moving thumbs, keycaps, and raised surfaces. Text fields, selection triggers, checkboxes, and radios stay flat. The default is 0.5. Use 0 to remove that light or 1 for full strength. Focus rings, borders, and drop shadows keep their existing colors and opacity. Shadow switches still take precedence."
            />
        </Typography.Text>
        <CodeBlock
            copy="overlay"
            lang="typescript"
            code={`const theme = {
    ...DEFAULT_THEME,
    chrome: { edgeHighlight: 0.5 }
};

const css = themeToCss(theme);`}
        />
        <Typography.Text variant="body" class="m-0">
            Studio exposes Edge highlight under Edges. Turn it off to remove the highlight, or
            adjust its strength while enabled. Turning it back on restores the last strength used in
            that session. Preset JSON, copied CSS, saved drafts, and CLI theme imports preserve it.
        </Typography.Text>
    </section>

    <section id="next" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Next</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text={`Browse the [Components](${resolve('/docs/components')}) to see these tokens on live examples.`}
            />
        </Typography.Text>
    </section>
</div>
