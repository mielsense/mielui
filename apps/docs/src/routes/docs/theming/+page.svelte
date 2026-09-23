<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { resolve } from '$app/paths';
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
</script>

<svelte:head>
    <title>Mielui · Theming</title>
    <meta
        name="description"
        content="Theme and style mielui with CSS variables, classes, and data-ui selectors."
    />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Theming">
        Components read CSS variables. Change tokens for system-wide look, or override a single
        component with classes and selectors.
    </PageIntro>

    <section id="where-tokens-live" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Where tokens live</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Package installs use
            <Typography.InlineCode>@mielui/svelte/ui.css</Typography.InlineCode>
            . CLI installs use
            <Typography.InlineCode>src/lib/mielui/ui.css</Typography.InlineCode>
            . Both define the same color, typography, radius, and motion tokens.
        </Typography.Text>
    </section>

    <section id="theme-studio" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Theme Studio</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            The
            <a class="text-foreground underline underline-offset-2" href={resolve('/studio')}>
                Theme Studio
            </a>
            lets you start from a preset and adjust colors, fonts, spacing, motion, and surface
            effects. Open Advanced colors for individual color tokens.
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            Studio saves your draft locally when browser storage is available. If storage is blocked
            or full, download the theme JSON to preserve your changes.
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            Choose Use theme, download mielui-theme.json into your project root, and run the command
            for a new or existing Mielui setup. The JSON includes both color modes and all Studio
            overrides. New setups get styles.css, which imports ui.css followed by theme.css. Load
            that stylesheet in your root layout. Fonts must also be loaded by your app.
        </Typography.Text>
        <CodeBlock
            lang="bash"
            copy="overlay"
            code="pnpm dlx @mielui/svelte init --preset ./mielui-theme.json"
        />
        <Typography.Text variant="body" class="m-0">
            For an existing setup, run the command below. It replaces theme.css. Built-in preset
            slugs, such as default, can be used in place of the JSON path.
        </Typography.Text>
        <CodeBlock
            lang="bash"
            copy="overlay"
            code="pnpm dlx @mielui/svelte add theme ./mielui-theme.json"
        />
    </section>

    <section id="glass-surfaces" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Global glass surfaces</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Enable Glass surfaces under Appearance in Studio, or set --mielui-surface: glass on
            :root. Components with surface support inherit that choice when the prop is omitted. Set
            surface="solid" or surface="glass" on one component to override the theme. Put the
            variable on :root so portaled menus and dialogs inherit it too.
        </Typography.Text>
        <CodeBlock
            lang="css"
            copy="overlay"
            code={`:root {
  --mielui-surface: glass;
}`}
        />
        <Typography.Text variant="body" class="m-0">
            The global setting uses CSS style queries. Browsers without style-query support retain
            solid surfaces. Explicit surface="glass" still works with backdrop-filter support.
            Reduced transparency keeps an opaque background and removes blur.
        </Typography.Text>
    </section>
    <section id="override-tokens" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Override tokens</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Set values in your app CSS after importing Mielui's sheet. Light defaults go in
            <Typography.InlineCode>@theme</Typography.InlineCode>
            . Dark values go under
            <Typography.InlineCode>.dark</Typography.InlineCode>
            .
        </Typography.Text>
        <CodeBlock code={overrideCss} lang="css" copy="overlay" />
    </section>

    <section id="useful-tokens" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Useful public tokens</Typography.H2>
        <ul
            class="m-0 flex list-disc flex-col gap-2 pl-5 text-[1rem] text-foreground leading-relaxed"
        >
            <li>
                Color:
                <Typography.InlineCode>--color-background</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-card</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-panel</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-secondary</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-foreground</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-foreground-muted</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-primary</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-on-primary</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-button-foreground</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-border</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-input</Typography.InlineCode>
                ,
                <Typography.InlineCode>--color-ring</Typography.InlineCode>
            </li>
            <li>
                Type:
                <Typography.InlineCode>--font-sans</Typography.InlineCode>
                ,
                <Typography.InlineCode>--font-mono</Typography.InlineCode>
                ,
                <Typography.InlineCode>--font-header</Typography.InlineCode>
                ,
                <Typography.InlineCode>--font-size-header</Typography.InlineCode>
                , and role weights like<Typography.InlineCode>
                    --font-weight-body
                </Typography.InlineCode>
                ,
                <Typography.InlineCode>--font-weight-label</Typography.InlineCode>
                ,
                <Typography.InlineCode>--font-weight-button</Typography.InlineCode>
            </li>
            <li>
                Radius and density:
                <Typography.InlineCode>--radius-sm</Typography.InlineCode>
                ,
                <Typography.InlineCode>--radius-md</Typography.InlineCode>
                ,
                <Typography.InlineCode>--radius-lg</Typography.InlineCode>
                ,
                <Typography.InlineCode>--radius-xl</Typography.InlineCode>
                , and the base spacing unit<Typography.InlineCode>
                    --mielui-space-unit
                </Typography.InlineCode>
            </li>
            <li>
                Motion:
                <Typography.InlineCode>--motion-duration-hover</Typography.InlineCode>
                ,
                <Typography.InlineCode>--motion-duration-menu</Typography.InlineCode>
                ,
                <Typography.InlineCode>--motion-duration-panel</Typography.InlineCode>
                ,
                <Typography.InlineCode>--motion-duration-sheet</Typography.InlineCode>
            </li>
            <li>
                Elevation:
                <Typography.InlineCode>--elevation-1</Typography.InlineCode>
                ,
                <Typography.InlineCode>--elevation-float</Typography.InlineCode>
                ,
                <Typography.InlineCode>--elevation-control</Typography.InlineCode>
                ,
                <Typography.InlineCode>--elevation-modal</Typography.InlineCode>
            </li>
        </ul>
    </section>

    <section id="built-in-presets" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Built-in presets</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Five presets ship with Mielui:{' '}
            <Typography.InlineCode>default</Typography.InlineCode>
            ,
            <Typography.InlineCode>magic</Typography.InlineCode>
            ,
            <Typography.InlineCode>bitsy</Typography.InlineCode>
            ,
            <Typography.InlineCode>open</Typography.InlineCode>
            , and
            <Typography.InlineCode>functional</Typography.InlineCode>
            . Preview them live on the
            <a class="text-foreground underline underline-offset-2" href={resolve('/themes')}>
                themes page
            </a>
            , where you can copy each preset's CSS or JSON.
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            With the CLI, install a preset into
            <Typography.InlineCode>theme.css</Typography.InlineCode>
            :
        </Typography.Text>
        <CodeBlock code="pnpm dlx @mielui/svelte add theme open" lang="shell" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            Import it after{' '}
            <Typography.InlineCode>ui.css</Typography.InlineCode> to apply its overrides:
        </Typography.Text>
        <CodeBlock code={themeImport} lang="css" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            <Typography.InlineCode>mielui list</Typography.InlineCode>
            shows available built-in theme slugs.
        </Typography.Text>
    </section>

    <section id="dark-mode" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Dark mode</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Toggle a{' '}
            <Typography.InlineCode>.dark</Typography.InlineCode> class on
            <Typography.InlineCode>&lt;html&gt;</Typography.InlineCode>
            . Components do not manage the class for you.
        </Typography.Text>
    </section>

    <section id="theme-json" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Theme JSON</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Theme JSON version 4 is the format shared by Studio and the CLI. Export it from Studio
            to preserve both color modes and your overrides.
        </Typography.Text>
        <ul class="m-0 flex list-disc flex-col gap-3 pl-5 text-sm leading-relaxed">
            <li>
                <Typography.InlineCode>foundation.light</Typography.InlineCode> and
                <Typography.InlineCode>foundation.dark</Typography.InlineCode> hold each mode's
                base, border, background, secondary, foreground, foregroundMuted, and onPrimary
                colors.
            </li>
            <li>
                <Typography.InlineCode>typography</Typography.InlineCode> contains headerSize,
                headerWeight, and roleWeights for body, label, button, badge, and description text.
            </li>
            <li>
                <Typography.InlineCode>tokens.shared</Typography.InlineCode>
                ,
                <Typography.InlineCode>tokens.light</Typography.InlineCode>
                , and
                <Typography.InlineCode>tokens.dark</Typography.InlineCode> hold raw token overrides,
                including per-mode values for<Typography.InlineCode>
                    --color-primary
                </Typography.InlineCode>
                .
            </li>
            <li>
                <Typography.InlineCode>chrome</Typography.InlineCode> controls edgeHighlight,
                surfaceShadows, controlShadows, dialogShadows, travelingHighlight, primaryStroke,
                and interactiveCursor. Turning off travelingHighlight keeps the selected fill and
                removes its movement.
            </li>
        </ul>
        <Typography.Text variant="body" class="m-0">
            Set<Typography.InlineCode>motion: "none"</Typography.InlineCode> to disable animations,
            including dialogs, menus, and the traveling highlight. Edge highlight strength ranges
            from 0 to 1.
        </Typography.Text>
    </section>

    <section id="class-prop" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Class overrides</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Styled components accept{' '}
            <Typography.InlineCode>class</Typography.InlineCode>
            . Use Tailwind utilities or your own classes for one-off tweaks.
        </Typography.Text>
        <CodeBlock code={classExample} lang="svelte" copy="overlay" />
    </section>

    <section id="data-ui" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Component selectors</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Components render{' '}
            <Typography.InlineCode>data-ui</Typography.InlineCode> (and often
            <Typography.InlineCode>data-variant</Typography.InlineCode>
            /
            <Typography.InlineCode>data-size</Typography.InlineCode>
            ). Scope CSS to a family without forking files.
        </Typography.Text>
        <CodeBlock code={dataUiExample} lang="css" copy="overlay" />
    </section>

    <section id="edit-source" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Edit the source</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            With the CLI path, files live under
            <Typography.InlineCode>src/lib/mielui/components/&lt;name&gt;/</Typography.InlineCode>
            . Edit them when you need behavior changes, not just style.
        </Typography.Text>
        <CodeBlock code={sourceExample} lang="shell" copy="overlay" />
    </section>

    <section class="flex flex-col gap-4">
        <Typography.H2>Edge highlights</Typography.H2>
        <Typography.Text>
            Set chrome.edgeHighlight to adjust the thin light-catching edges on controls, keycaps,
            and raised surfaces. The default is 0.5. Use 0 to remove that light or 1 for full
            strength. Focus rings, borders, and drop shadows keep their existing colors and opacity.
            Shadow switches still take precedence.
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
        <Typography.Text>
            Studio exposes Edge highlight under Appearance. Turn it off to remove the highlight, or
            adjust its strength while enabled. Turning it back on restores the last strength used in
            that session. Preset JSON, copied CSS, saved drafts, and CLI theme imports preserve it.
        </Typography.Text>
    </section>
    <section id="next" class="scroll-mt-20 flex flex-col gap-5">
        <Typography.H2 class="docs-section-heading">Next</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <a
                class="text-foreground underline underline-offset-2"
                href={resolve('/docs/components')}
            >
                Components
            </a>
        </Typography.Text>
    </section>
</div>
