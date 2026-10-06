<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { resolve } from '$app/paths';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PackageCommand from '$lib/components/docs/package-command.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Rows from '$lib/components/docs/rows.svelte';

    const packageInstall = 'pnpm add @mielui/svelte';

    const packageCss = `@import '@mielui/svelte/ui.css';`;

    const packageUse = `<script>
  import { Button } from '@mielui/svelte';
<${'/'}script>

<Button>Get started</Button>`;

    const cliCss = `/* src/app.css */
@import './lib/mielui/ui.css';`;

    const cliAdd = `pnpm dlx @mielui/svelte add button
pnpm dlx @mielui/svelte list`;

    const cliUse = `<script>
  import { Button } from '$lib/mielui/components/button';
<${'/'}script>

<Button>Get started</Button>`;

    const tailwindSetup = `cd my-app
pnpm dlx sv add tailwindcss`;

    const prerequisites = [
        { label: 'Svelte', value: '5.56 or newer, with or without SvelteKit' },
        { label: 'Tailwind CSS', value: 'v4' }
    ];

    const notes = [
        {
            label: 'Tailwind v3',
            value: 'Not supported. Mielui needs v4 `@theme` and `color-mix`.'
        },
        { label: 'Dark mode', value: 'Uses a `.dark` class on `<html>`.' },
        {
            label: 'Theme presets',
            value: 'Install with `pnpm dlx @mielui/svelte add theme <slug>`. Use `default` for the default preset.'
        }
    ];

    const next = [
        {
            label: 'Theming',
            value: 'Apply your brand with a preset or your own tokens.',
            href: resolve('/docs/theming')
        },
        {
            label: 'Components',
            value: 'Browse live examples and APIs.',
            href: resolve('/docs/components')
        }
    ];
</script>

<svelte:head>
    <title>Mielui · Installation</title>
    <meta name="description" content="Install Mielui with the npm package or the mielui CLI." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Installation">Install Mielui into your project.</PageIntro>

    <section id="prerequisites" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Prerequisites</Typography.H2>
        <Rows items={prerequisites} label="Prerequisites" />
    </section>

    <section id="package-import" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Package import</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText text="Install the library and import components from `@mielui/svelte`." />
        </Typography.Text>
        <PackageCommand command={packageInstall} />
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Import the stylesheet once in `src/app.css`. It already includes Tailwind, so remove any existing `@import 'tailwindcss'` line."
            />
        </Typography.Text>
        <CodeBlock code={packageCss} lang="css" copy="overlay" />
        <Typography.Text variant="body" class="m-0">Use a component:</Typography.Text>
        <CodeBlock code={packageUse} lang="svelte" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Compound components expose named parts. Import `Dialog` and compose `Dialog.Root` with `Dialog.Content` and the other parts you need."
            />
        </Typography.Text>
    </section>

    <section id="cli-source-copy" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">CLI source copy</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="The CLI copies source into your project. The package name is `@mielui/svelte`; the binary is `mielui`."
            />
        </Typography.Text>

        <Typography.H3 class="docs-subsection-heading m-0 mt-2">1. Create a project</Typography.H3>
        <Typography.Text variant="body" class="m-0">
            Skip project creation and Tailwind setup if your app already has both.
        </Typography.Text>
        <PackageCommand command="pnpm dlx sv create my-app" />

        <Typography.H3 class="docs-subsection-heading m-0 mt-2">2. Add Tailwind v4</Typography.H3>
        <PackageCommand command={tailwindSetup} />

        <Typography.H3 class="docs-subsection-heading m-0 mt-2">3. Initialize Mielui</Typography.H3>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="Run this from the project root to create `src/lib/mielui/` for styles and utilities, plus `mielui.json`."
            />
        </Typography.Text>
        <PackageCommand command="pnpm dlx @mielui/svelte init -y" />

        <Typography.H3 class="docs-subsection-heading m-0 mt-2">
            4. Import the stylesheet
        </Typography.H3>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text="The copied stylesheet already includes Tailwind. Replace the `@import 'tailwindcss'` line that the Tailwind setup added."
            />
        </Typography.Text>
        <CodeBlock code={cliCss} lang="css" copy="overlay" />

        <Typography.H3 class="docs-subsection-heading m-0 mt-2">5. Add components</Typography.H3>
        <PackageCommand command={cliAdd} />

        <Typography.H3 class="docs-subsection-heading m-0 mt-2">6. Use them</Typography.H3>
        <CodeBlock code={cliUse} lang="svelte" copy="overlay" />
    </section>

    <section id="notes" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Notes</Typography.H2>
        <Rows items={notes} label="Notes" />
    </section>

    <section id="next" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Next</Typography.H2>
        <Rows items={next} label="Next steps" />
    </section>
</div>
