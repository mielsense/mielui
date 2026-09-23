<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { resolve } from '$app/paths';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    const packageInstall = `pnpm add @mielui/svelte
# npm i @mielui/svelte
# yarn add @mielui/svelte`;

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
</script>

<svelte:head>
    <title>Mielui · Installation</title>
    <meta name="description" content="Install mielui with the npm package or the mielui CLI." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Installation">Install mielui into your project.</PageIntro>

    <section id="prerequisites" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Prerequisites</Typography.H2>
        <ul
            class="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[1rem] text-foreground leading-relaxed"
        >
            <li>Svelte 5.56 or newer, with or without SvelteKit</li>
            <li>Tailwind CSS v4</li>
        </ul>
    </section>

    <section id="package-import" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Package import</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Install the library and import components from
            <Typography.InlineCode>@mielui/svelte</Typography.InlineCode>
            .
        </Typography.Text>
        <CodeBlock code={packageInstall} lang="shell" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            Import the stylesheet once in
            <Typography.InlineCode>src/app.css</Typography.InlineCode>
            .
        </Typography.Text>
        <CodeBlock code={packageCss} lang="css" copy="overlay" />
        <Typography.Text variant="body" class="m-0">Use a component:</Typography.Text>
        <CodeBlock code={packageUse} lang="svelte" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            Compound components expose named parts. Import
            <Typography.InlineCode>Dialog</Typography.InlineCode> and compose
            <Typography.InlineCode>Dialog.Root</Typography.InlineCode> with
            <Typography.InlineCode>Dialog.Content</Typography.InlineCode> and the other parts you
            need.
        </Typography.Text>
    </section>

    <section id="cli-source-copy" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">CLI source copy</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            The CLI copies source into your project. The package name is
            <Typography.InlineCode>@mielui/svelte</Typography.InlineCode>
            ; the binary is
            <Typography.InlineCode>mielui</Typography.InlineCode>
            .
        </Typography.Text>

        <Typography.H3 class="m-0 docs-subsection-heading">1. Create a project</Typography.H3>
        <Typography.Text>
            Skip project creation and Tailwind setup if your app already has both.
        </Typography.Text>
        <CodeBlock code="pnpm dlx sv create my-app" lang="shell" copy="overlay" />

        <Typography.H3 class="m-0 docs-subsection-heading">2. Add Tailwind v4</Typography.H3>
        <CodeBlock code="cd my-app && pnpm dlx sv add tailwindcss" lang="shell" copy="overlay" />

        <Typography.H3 class="m-0 docs-subsection-heading">3. Initialize Mielui</Typography.H3>
        <Typography.Text variant="body" class="m-0">
            Run this from the project root to create{' '}
            <Typography.InlineCode>src/lib/mielui/</Typography.InlineCode> for styles and utilities,
            plus{' '}
            <Typography.InlineCode>mielui.json</Typography.InlineCode>
            .
        </Typography.Text>
        <CodeBlock code="pnpm dlx @mielui/svelte init -y" lang="shell" copy="overlay" />

        <Typography.H3 class="m-0 docs-subsection-heading">4. Import the stylesheet</Typography.H3>
        <CodeBlock code={cliCss} lang="css" copy="overlay" />

        <Typography.H3 class="m-0 docs-subsection-heading">5. Add components</Typography.H3>
        <CodeBlock code={cliAdd} lang="shell" copy="overlay" />

        <Typography.H3 class="m-0 docs-subsection-heading">6. Use them</Typography.H3>
        <CodeBlock code={cliUse} lang="svelte" copy="overlay" />
    </section>

    <section id="notes" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Notes</Typography.H2>
        <ul
            class="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[1rem] text-foreground leading-relaxed"
        >
            <li>
                Tailwind v3 is not supported. Mielui needs v4
                <Typography.InlineCode>@theme</Typography.InlineCode>
                and
                <Typography.InlineCode>color-mix</Typography.InlineCode>
                .
            </li>
            <li>
                Dark mode uses a<Typography.InlineCode>.dark</Typography.InlineCode> class on
                <Typography.InlineCode>&lt;html&gt;</Typography.InlineCode>
                .
            </li>
            <li>
                Built-in theme presets install with
                <Typography.InlineCode>
                    pnpm dlx @mielui/svelte add theme &lt;slug&gt;
                </Typography.InlineCode>
                Use<Typography.InlineCode>default</Typography.InlineCode> to start with the default
                preset.
            </li>
        </ul>
    </section>

    <section id="next" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Next</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <a class="text-foreground underline underline-offset-2" href={resolve('/docs/theming')}>
                Theming
            </a>
            ·
            <a
                class="text-foreground underline underline-offset-2"
                href={resolve('/docs/components')}
            >
                Components
            </a>
        </Typography.Text>
    </section>
</div>
